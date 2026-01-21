import { useState, useEffect } from 'react';

export default function OrderDetailPanel({ order, apiBase, onClose, onUpdate }) {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [fullOrder, setFullOrder] = useState(order);

  // Fetch full order details
  useEffect(() => {
    fetchOrderDetails();
  }, [order.invoice_id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${apiBase}/api/fulfillment/order/${order.invoice_id}`);
      const data = await response.json();
      if (data.success) {
        setFullOrder(data.order);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleMarkShipped = async () => {
    const trackingNumber = window.prompt('Enter tracking number:');
    if (!trackingNumber) return;

    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/api/fulfillment/mark-shipped`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoice_id: fullOrder.invoice_id,
          tracking_number: trackingNumber
        })
      });

      const data = await response.json();
      if (data.success) {
        window.alert('Order marked as shipped!');
        onUpdate();
        onClose();
      } else {
        window.alert('Error: ' + data.error);
      }
    } catch (error) {
      window.alert('Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const StatusBadge = ({ status }) => {
    const colors = {
      pending_sim: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      ready_to_ship: 'bg-blue-100 text-blue-800 border-blue-300',
      label_created: 'bg-purple-100 text-purple-800 border-purple-300',
      shipped: 'bg-green-100 text-green-800 border-green-300'
    };

    const labels = {
      pending_sim: 'Needs SIM',
      ready_to_ship: 'Ready to Ship',
      label_created: 'Label Created',
      shipped: 'Shipped'
    };

    return (
      <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${colors[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-blue-500 text-white px-6 py-4 flex items-center justify-between shadow-md z-10">
          <div>
            <h2 className="text-xl font-bold">Order Details</h2>
            <p className="text-sm text-blue-100">{fullOrder.invoice_number}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Status
            </h3>
            <StatusBadge status={fullOrder.status} />
          </div>

          {/* Customer Section */}
          <div className="border-t pt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Customer Information
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-700">Name:</span>
                <p className="text-sm text-gray-900">{fullOrder.customer_name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Email:</span>
                <p className="text-sm text-gray-900">{fullOrder.email || '—'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Phone:</span>
                <p className="text-sm text-gray-900">{fullOrder.phone || '—'}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border-t pt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Shipping Address
            </h3>
            <div className="text-sm text-gray-900">
              <p>{fullOrder.shipping_address.address}</p>
              {fullOrder.shipping_address.address2 && (
                <p>{fullOrder.shipping_address.address2}</p>
              )}
              <p>{fullOrder.shipping_address.city}, {fullOrder.shipping_address.state} {fullOrder.shipping_address.zip}</p>
              <p>{fullOrder.shipping_address.country || 'USA'}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="border-t pt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Order Information
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-700">Device Type:</span>
                <p className="text-sm text-gray-900">{fullOrder.device_type || '—'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Line Status:</span>
                <p className="text-sm text-gray-900">{fullOrder.line_status || '—'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Device Status:</span>
                <p className="text-sm text-gray-900">{fullOrder.device_status || '—'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Ordered By:</span>
                <p className="text-sm text-gray-900">{fullOrder.ordered_by || '—'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Order Date:</span>
                <p className="text-sm text-gray-900">
                  {new Date(fullOrder.created_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Fulfillment Details */}
          <div className="border-t pt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Fulfillment Information
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-700">Assigned SIM:</span>
                <p className="text-sm text-gray-900 font-mono">
                  {fullOrder.assigned_sim || '—'}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Tracking Number:</span>
                <p className="text-sm text-gray-900 font-mono">
                  {fullOrder.tracking_number || '—'}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Device S/N:</span>
                <p className="text-sm text-gray-900 font-mono">
                  {fullOrder.device_sn || '—'}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">TMobile Status:</span>
                <p className="text-sm text-gray-900">
                  {fullOrder.active_on_tmobile || '—'}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">TMobile Line:</span>
                <p className="text-sm text-gray-900 font-mono">
                  {fullOrder.tmobile_line_number || '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="border-t pt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Internal Notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this order..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              rows={4}
            />
            <button className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
              Save Notes
            </button>
          </div>

          {/* Action Buttons */}
          <div className="border-t pt-4 space-y-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Actions
            </h3>

            {fullOrder.status === 'ready_to_ship' && (
              <>
                <button className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium">
                  Create Shipping Label
                </button>
                <button
                  onClick={handleMarkShipped}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium disabled:bg-gray-300"
                >
                  {loading ? 'Processing...' : 'Mark as Shipped'}
                </button>
              </>
            )}

            {fullOrder.status === 'shipped' && fullOrder.tracking_number && (
              <a
                href={`https://www.fedex.com/fedextrack/?trknbr=${fullOrder.tracking_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-center"
              >
                Track Package
              </a>
            )}

            <button
              onClick={fetchOrderDetails}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Refresh Details
            </button>
          </div>

          {/* Timeline/Activity Log */}
          <div className="border-t pt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Activity Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Order Created</p>
                  <p className="text-xs text-gray-500">
                    {new Date(fullOrder.created_date).toLocaleString()}
                  </p>
                </div>
              </div>

              {fullOrder.assigned_sim && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">SIM Assigned</p>
                    <p className="text-xs text-gray-500 font-mono">{fullOrder.assigned_sim}</p>
                  </div>
                </div>
              )}

              {fullOrder.tracking_number && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Shipped</p>
                    <p className="text-xs text-gray-500 font-mono">{fullOrder.tracking_number}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
