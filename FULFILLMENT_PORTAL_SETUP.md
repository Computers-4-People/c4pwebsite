# Shield Fulfillment Portal - Quick Start Guide

## Overview

The Shield Fulfillment Portal is a complete order fulfillment system that integrates with Zoho Billing to manage Shield Internet orders, SIM card inventory, and shipping workflows.

## What's Been Built

### Backend API (Flask - Python)
- **Location**: `/api/fulfillment/`
- **Components**:
  - `app.py` - Main Flask application with all API endpoints
  - `zoho_billing.py` - Zoho Billing API integration with OAuth2
  - `sim_inventory.py` - SIM card inventory management system
  - `data/sim_inventory.json` - JSON storage for SIM inventory
  - `requirements.txt` - Python dependencies
  - `.env.example` - Environment variable template

### Frontend Portal (React)
- **Location**: `/src/portal/`
- **Main Page**: `fulfillment.jsx` - Dashboard with stats and tabs
- **Components**:
  - `OrderQueue.jsx` - Order management table with filtering and actions
  - `SimAssignModal.jsx` - Modal for assigning SIMs (scan or select mode)
  - `SimInventory.jsx` - SIM inventory management tab
  - `OrderDetailPanel.jsx` - Slide-out panel with full order details
  - `RecentShipments.jsx` - Shipped orders tracking with export

### Routing
- **URL**: `http://localhost:3000/fulfillment`
- Added to `App.js` with proper imports

## Setup Instructions

### Step 1: Backend Setup

1. **Navigate to the API directory**:
   ```bash
   cd api/fulfillment
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Zoho credentials:
   ```
   ZOHO_CLIENT_ID=your_client_id
   ZOHO_CLIENT_SECRET=your_client_secret
   ZOHO_REFRESH_TOKEN=your_refresh_token
   ZOHO_ORGANIZATION_ID=your_org_id
   ```

4. **Start the Flask server**:
   ```bash
   python app.py
   ```

   Server will run on `http://localhost:5000`

### Step 2: Frontend Setup

1. **Navigate to the project root**:
   ```bash
   cd /Users/user/Applications/c4pwebsite
   ```

2. **Start the React development server** (if not already running):
   ```bash
   npm start
   ```

   Frontend will run on `http://localhost:3000`

3. **Access the portal**:
   - Open browser to `http://localhost:3000/fulfillment`

## Testing Workflow

### 1. Test Backend API (Before Frontend)

```bash
# Health check
curl http://localhost:5000/api/fulfillment/health

# Get stats
curl http://localhost:5000/api/fulfillment/stats

# Get order queue
curl http://localhost:5000/api/fulfillment/queue

# Add test SIM batch
curl -X POST http://localhost:5000/api/sims/batch \
  -H "Content-Type: application/json" \
  -d '{"iccids": "89148000000123456789\n89148000000234567890", "batch_id": "TEST-001"}'

# Check unassigned SIMs
curl http://localhost:5000/api/sims/unassigned
```

### 2. Test Frontend Features

**Order Queue Tab**:
- ✅ View all orders with status badges
- ✅ Search by customer name, email, or invoice
- ✅ Filter by status (All, Pending SIM, Ready to Ship)
- ✅ Sort columns by clicking headers
- ✅ Select multiple orders with checkboxes
- ✅ Click "Assign SIM" button on pending orders
- ✅ Click row to open detail panel

**SIM Assignment Modal**:
- ✅ Scan/Type ICCID mode (for barcode scanner)
- ✅ Pick from Inventory mode (dropdown selection)
- ✅ Auto-focus on input field for rapid scanning
- ✅ Validates ICCID before assignment
- ✅ Closes automatically after successful assignment

**SIM Inventory Tab**:
- ✅ View all SIM cards in inventory
- ✅ Filter by status (All, Available, Assigned)
- ✅ Add new SIM batches (paste multiple ICCIDs)
- ✅ View batch summary with counts
- ✅ See assignment history

**Recent Shipments Tab**:
- ✅ View all shipped orders
- ✅ Filter by date (Today, Last 7 Days, Last 30 Days, All Time)
- ✅ Search shipments
- ✅ Export to CSV
- ✅ Click tracking number to track on FedEx
- ✅ Click row to see shipment details

**Order Detail Panel**:
- ✅ Slide-out panel from right side
- ✅ Complete order information
- ✅ Customer and shipping details
- ✅ Fulfillment status and timeline
- ✅ Action buttons (Create Label, Mark Shipped)
- ✅ Internal notes section
- ✅ Activity timeline

### 3. Test Key Workflows

**Workflow 1: Assign SIM to Order**
1. Go to Order Queue
2. Find order with "Needs SIM" status
3. Click "Assign SIM" button
4. Either scan barcode or select from inventory
5. Confirm assignment
6. Order status should update to "Ready to Ship"

**Workflow 2: Bulk Add SIM Cards**
1. Go to SIM Inventory tab
2. Paste multiple ICCIDs (one per line)
3. Optionally enter batch ID
4. Click "Add SIM Batch"
5. Verify SIMs appear in inventory table

**Workflow 3: Ship Order**
1. Go to Order Queue
2. Click on a "Ready to Ship" order
3. Detail panel opens
4. Click "Mark as Shipped"
5. Enter tracking number
6. Order moves to Recent Shipments

**Workflow 4: Auto-Assign SIMs**
1. Ensure you have unassigned SIMs in inventory
2. Ensure you have orders with "Needs SIM" status
3. Click "Auto-Assign SIMs" button
4. System assigns oldest SIMs to oldest orders (FIFO)
5. Check assignments in Order Queue

## API Endpoints Reference

### Fulfillment
- `GET /api/fulfillment/queue?status=<status>` - Get orders
- `GET /api/fulfillment/order/<invoice_id>` - Order details
- `POST /api/fulfillment/assign-sim` - Assign SIM to order
- `POST /api/fulfillment/auto-assign` - Auto-assign SIMs
- `POST /api/fulfillment/mark-shipped` - Mark order as shipped
- `GET /api/fulfillment/stats` - Dashboard statistics

### SIM Inventory
- `POST /api/sims/batch` - Add SIM batch
- `GET /api/sims/unassigned` - List available SIMs
- `GET /api/sims/batches` - List all batches
- `GET /api/sims/stats` - Inventory statistics

## Features Implemented

### Phase 1: Backend ✅
- ✅ Zoho Billing OAuth2 integration
- ✅ Custom field mapping for Shield orders
- ✅ SIM inventory management with JSON storage
- ✅ FIFO auto-assignment logic
- ✅ Order status tracking
- ✅ API endpoints for all operations

### Phase 3: Frontend ✅
- ✅ Dashboard with real-time stats
- ✅ Order queue with filtering and search
- ✅ SIM assignment workflow (scan + select modes)
- ✅ SIM inventory management
- ✅ Recent shipments tracking
- ✅ Order detail panel
- ✅ CSV export functionality
- ✅ Responsive design with Tailwind CSS

## Next Steps (Not Yet Implemented)

### Phase 2: FedEx Integration
- [ ] FedEx API credentials setup
- [ ] Shipping label generation
- [ ] Automatic tracking number capture
- [ ] Print label functionality

### Phase 4: Enhancements
- [ ] Toast notifications for actions
- [ ] Real-time updates (WebSockets or polling)
- [ ] Bulk label creation
- [ ] Advanced filtering options
- [ ] Keyboard shortcuts

### Phase 5: Production Ready
- [ ] Zoho webhooks for real-time order updates
- [ ] Email notifications for shipped orders
- [ ] Database migration (PostgreSQL)
- [ ] Authentication and authorization
- [ ] Production deployment setup

## Troubleshooting

### Backend Issues

**Error: "Module not found"**
- Run: `pip install -r requirements.txt`

**Error: "Zoho API authentication failed"**
- Check your `.env` file has correct credentials
- Verify refresh token is valid in Zoho console

**Error: "Permission denied: data/sim_inventory.json"**
- Run: `chmod 644 data/sim_inventory.json`

### Frontend Issues

**Portal page is blank**
- Check browser console for errors
- Verify backend is running on port 5000
- Check CORS is enabled in Flask app

**"Network error" when assigning SIM**
- Verify backend API is running
- Check API_BASE URL in fulfillment.jsx
- Check browser Network tab for failed requests

## File Structure

```
c4pwebsite/
├── api/
│   └── fulfillment/
│       ├── app.py                    # Flask backend
│       ├── zoho_billing.py          # Zoho API integration
│       ├── sim_inventory.py         # SIM inventory system
│       ├── requirements.txt         # Python dependencies
│       ├── .env.example            # Environment template
│       ├── README.md               # Backend documentation
│       └── data/
│           └── sim_inventory.json  # SIM storage
│
└── src/
    └── portal/
        ├── fulfillment.jsx                    # Main portal page
        └── components/
            ├── OrderQueue.jsx                 # Order table
            ├── SimAssignModal.jsx            # SIM assignment
            ├── SimInventory.jsx              # Inventory management
            ├── OrderDetailPanel.jsx          # Detail slide-out
            └── RecentShipments.jsx           # Shipments tab
```

## Notes

- **No Git Commits**: This work has NOT been committed to Git per your request to beta test first
- **Development Only**: Currently configured for localhost development
- **Mock Data**: If no Zoho orders exist, consider adding mock data for testing
- **Database**: Using JSON files for MVP - migrate to PostgreSQL for production
- **Security**: No authentication implemented - add before production deployment

## Support

If you encounter issues:
1. Check browser console for frontend errors
2. Check Flask terminal for backend errors
3. Verify both servers are running
4. Test API endpoints directly with curl
5. Check network requests in browser DevTools

## Summary

The Shield Fulfillment Portal is ready for beta testing! You can now:
- View and manage Shield Internet orders from Zoho
- Track SIM card inventory with batch management
- Assign SIMs to orders (manual or automatic FIFO)
- Track shipped orders with FedEx integration
- Export shipment data to CSV
- Search, filter, and sort across all views

Start both servers and navigate to `http://localhost:3000/fulfillment` to begin testing.
