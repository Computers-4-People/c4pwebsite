"""
Shield Fulfillment Portal - Flask Backend
Main application with fulfillment queue API endpoints
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import logging

from zoho_billing import get_zoho_api
from sim_inventory import get_sim_inventory

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Initialize services
zoho = get_zoho_api()
sim_inv = get_sim_inventory()


# Helper Functions

def format_order_for_queue(invoice: dict, sim_status: str = None) -> dict:
    """Format Zoho invoice for fulfillment queue display"""

    custom_fields = {cf['label']: cf.get('value', '')
                    for cf in invoice.get('custom_fields', [])}

    # Determine status
    shipping_status = custom_fields.get('Shipping Status', '').lower()
    sim_number = custom_fields.get('SIM Card Number', '')
    tracking = custom_fields.get('Tracking Number', '')

    if tracking:
        status = 'shipped'
    elif sim_number:
        status = 'ready_to_ship'
    else:
        status = 'pending_sim'

    return {
        'invoice_id': invoice.get('invoice_id'),
        'invoice_number': invoice.get('invoice_number'),
        'customer_id': invoice.get('customer_id'),
        'customer_name': invoice.get('customer_name'),
        'email': invoice.get('email'),
        'shipping_address': {
            'attention': invoice.get('shipping_address', {}).get('attention', ''),
            'address': invoice.get('shipping_address', {}).get('address', ''),
            'street2': invoice.get('shipping_address', {}).get('street2', ''),
            'city': invoice.get('shipping_address', {}).get('city', ''),
            'state': invoice.get('shipping_address', {}).get('state', ''),
            'zip': invoice.get('shipping_address', {}).get('zip', ''),
            'country': invoice.get('shipping_address', {}).get('country', 'USA')
        },
        'plan': invoice.get('line_items', [{}])[0].get('name', '') if invoice.get('line_items') else '',
        'device_type': custom_fields.get('Device Type', ''),
        'created_date': invoice.get('created_time', ''),
        'status': status,
        'assigned_sim': sim_number if sim_number else None,
        'tracking_number': tracking if tracking else None,
        'custom_fields': custom_fields
    }


# API Endpoints

@app.route('/api/fulfillment/queue', methods=['GET'])
def get_fulfillment_queue():
    """Get orders that need processing"""
    try:
        status_filter = request.args.get('status', 'all')

        # Get all invoices from Zoho
        invoices = zoho.list_invoices_by_status('all')

        # Filter for Shield orders (ones with custom fields we care about)
        shield_orders = []
        for invoice in invoices:
            custom_fields = {cf['label']: cf.get('value', '')
                           for cf in invoice.get('custom_fields', [])}

            # Only include orders with Device Type (Shield orders)
            if custom_fields.get('Device Type'):
                order = format_order_for_queue(invoice)

                # Apply status filter
                if status_filter == 'all' or order['status'] == status_filter:
                    shield_orders.append(order)

        # Sort by created_date (oldest first)
        shield_orders.sort(key=lambda x: x['created_date'])

        return jsonify({
            'success': True,
            'count': len(shield_orders),
            'orders': shield_orders
        })

    except Exception as e:
        logger.error(f"Error fetching fulfillment queue: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/fulfillment/order/<invoice_id>', methods=['GET'])
def get_order_details(invoice_id):
    """Get full order details"""
    try:
        invoice = zoho.get_order_details(invoice_id)
        order = format_order_for_queue(invoice)

        # Add customer details if available
        if invoice.get('customer_id'):
            try:
                customer = zoho.get_customer(invoice['customer_id'])
                order['customer_details'] = customer
            except Exception as e:
                logger.warning(f"Could not fetch customer details: {e}")

        return jsonify({
            'success': True,
            'order': order
        })

    except Exception as e:
        logger.error(f"Error fetching order {invoice_id}: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/fulfillment/assign-sim', methods=['POST'])
def assign_sim():
    """Assign a SIM card to an order"""
    try:
        data = request.get_json()
        invoice_id = data.get('invoice_id')
        iccid = data.get('iccid')

        if not invoice_id or not iccid:
            return jsonify({'success': False, 'error': 'invoice_id and iccid required'}), 400

        # Assign in our inventory
        sim = sim_inv.assign_sim(iccid, invoice_id)

        # Update Zoho invoice
        zoho.update_invoice_fields(invoice_id, {
            'SIM Card Number': iccid
        })

        # Get updated order
        invoice = zoho.get_order_details(invoice_id)
        order = format_order_for_queue(invoice)

        return jsonify({
            'success': True,
            'message': f'SIM {iccid} assigned to {invoice_id}',
            'order': order
        })

    except Exception as e:
        logger.error(f"Error assigning SIM: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/fulfillment/auto-assign', methods=['POST'])
def auto_assign_sims():
    """Auto-assign available SIMs to pending orders (FIFO)"""
    try:
        # Get pending orders
        invoices = zoho.get_pending_orders()
        pending_invoice_ids = [inv['invoice_id'] for inv in invoices]

        # Auto-assign
        result = sim_inv.auto_assign_sims(pending_invoice_ids)

        # Update Zoho for each assignment
        for assignment in result['assignments']:
            try:
                zoho.update_invoice_fields(assignment['invoice_id'], {
                    'SIM Card Number': assignment['iccid']
                })
            except Exception as e:
                logger.error(f"Error updating Zoho for {assignment['invoice_id']}: {e}")

        return jsonify({
            'success': True,
            'assigned_count': result['assigned_count'],
            'remaining_pending': result['remaining_pending'],
            'assignments': result['assignments']
        })

    except Exception as e:
        logger.error(f"Error auto-assigning SIMs: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/fulfillment/mark-shipped', methods=['POST'])
def mark_shipped():
    """Mark an order as shipped with tracking number"""
    try:
        data = request.get_json()
        invoice_id = data.get('invoice_id')
        tracking_number = data.get('tracking_number')

        if not invoice_id or not tracking_number:
            return jsonify({'success': False, 'error': 'invoice_id and tracking_number required'}), 400

        # Update Zoho
        zoho.update_invoice_fields(invoice_id, {
            'Shipping Status': 'Shipped',
            'Tracking Number': tracking_number
        })

        # Get updated order
        invoice = zoho.get_order_details(invoice_id)
        order = format_order_for_queue(invoice)

        return jsonify({
            'success': True,
            'message': f'Order {invoice_id} marked as shipped',
            'order': order
        })

    except Exception as e:
        logger.error(f"Error marking order shipped: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/fulfillment/bulk-ship', methods=['POST'])
def bulk_ship():
    """Bulk update multiple orders as shipped"""
    try:
        data = request.get_json()
        orders = data.get('orders', [])

        results = {
            'success': [],
            'failed': []
        }

        for order in orders:
            invoice_id = order.get('invoice_id')
            tracking_number = order.get('tracking_number')

            try:
                zoho.update_invoice_fields(invoice_id, {
                    'Shipping Status': 'Shipped',
                    'Tracking Number': tracking_number
                })
                results['success'].append(invoice_id)
            except Exception as e:
                logger.error(f"Failed to update {invoice_id}: {e}")
                results['failed'].append({'invoice_id': invoice_id, 'error': str(e)})

        return jsonify({
            'success': True,
            'shipped_count': len(results['success']),
            'failed_count': len(results['failed']),
            'results': results
        })

    except Exception as e:
        logger.error(f"Error bulk shipping: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/fulfillment/stats', methods=['GET'])
def get_stats():
    """Get fulfillment statistics"""
    try:
        # Get order stats from Zoho
        invoices = zoho.list_invoices_by_status('all')

        shield_orders = []
        for invoice in invoices:
            custom_fields = {cf['label']: cf.get('value', '')
                           for cf in invoice.get('custom_fields', [])}
            if custom_fields.get('Device Type'):
                shield_orders.append(format_order_for_queue(invoice))

        pending_sim_count = len([o for o in shield_orders if o['status'] == 'pending_sim'])
        ready_to_ship_count = len([o for o in shield_orders if o['status'] == 'ready_to_ship'])

        # Count shipped today
        today = datetime.now().date().isoformat()
        shipped_today_count = 0
        for invoice in invoices:
            custom_fields = {cf['label']: cf.get('value', '')
                           for cf in invoice.get('custom_fields', [])}
            if custom_fields.get('Shipping Status') == 'Shipped':
                # Check if updated today (rough check via invoice date)
                if invoice.get('last_modified_time', '').startswith(today):
                    shipped_today_count += 1

        # Get SIM stats
        sim_stats = sim_inv.get_stats()

        return jsonify({
            'success': True,
            'stats': {
                'pending_sim_count': pending_sim_count,
                'ready_to_ship_count': ready_to_ship_count,
                'shipped_today_count': shipped_today_count,
                'unassigned_sims_count': sim_stats['unassigned']
            }
        })

    except Exception as e:
        logger.error(f"Error fetching stats: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


# SIM Inventory Endpoints

@app.route('/api/sims/batch', methods=['POST'])
def add_sim_batch():
    """Add a batch of SIM ICCIDs"""
    try:
        data = request.get_json()
        iccids_text = data.get('iccids', '')
        batch_id = data.get('batch_id')

        # Split by newlines
        iccids = [line.strip() for line in iccids_text.split('\n') if line.strip()]

        result = sim_inv.add_batch(iccids, batch_id)

        return jsonify({
            'success': True,
            'result': result
        })

    except Exception as e:
        logger.error(f"Error adding SIM batch: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/sims/unassigned', methods=['GET'])
def get_unassigned_sims():
    """List all unassigned SIMs"""
    try:
        sims = sim_inv.get_unassigned_sims()

        return jsonify({
            'success': True,
            'count': len(sims),
            'sims': sims
        })

    except Exception as e:
        logger.error(f"Error fetching unassigned SIMs: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/sims/stats', methods=['GET'])
def get_sim_stats():
    """Get SIM inventory statistics"""
    try:
        stats = sim_inv.get_stats()

        return jsonify({
            'success': True,
            'stats': stats
        })

    except Exception as e:
        logger.error(f"Error fetching SIM stats: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/sims/batches', methods=['GET'])
def get_batches():
    """Get all SIM batches"""
    try:
        batches = sim_inv.get_all_batches()

        return jsonify({
            'success': True,
            'batches': batches
        })

    except Exception as e:
        logger.error(f"Error fetching batches: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


# Health check
@app.route('/api/fulfillment/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'shield-fulfillment'})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
