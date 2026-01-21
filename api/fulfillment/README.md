# Shield Fulfillment Portal - Backend API

Flask backend for managing Shield Internet order fulfillment, SIM inventory, and shipping.

## Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your Zoho API credentials
   ```

3. **Run the server:**
   ```bash
   python app.py
   ```

   Server will start on `http://localhost:5000`

## API Endpoints

### Fulfillment Queue

- `GET /api/fulfillment/queue` - Get all orders
  - Query params: `?status=pending_sim|ready_to_ship|all`
- `GET /api/fulfillment/order/<invoice_id>` - Get order details
- `POST /api/fulfillment/assign-sim` - Assign SIM to order
  - Body: `{invoice_id, iccid}`
- `POST /api/fulfillment/auto-assign` - Auto-assign SIMs (FIFO)
- `POST /api/fulfillment/mark-shipped` - Mark order as shipped
  - Body: `{invoice_id, tracking_number}`
- `POST /api/fulfillment/bulk-ship` - Bulk ship orders
  - Body: `{orders: [{invoice_id, tracking_number}, ...]}`
- `GET /api/fulfillment/stats` - Get fulfillment statistics

### SIM Inventory

- `POST /api/sims/batch` - Add batch of SIM cards
  - Body: `{iccids: "iccid1\\niccid2\\niccid3", batch_id: "optional"}`
- `GET /api/sims/unassigned` - List unassigned SIMs
- `GET /api/sims/stats` - SIM inventory stats
- `GET /api/sims/batches` - List all batches

### Health Check

- `GET /api/fulfillment/health` - Health check

## Data Storage

- SIM inventory stored in `data/sim_inventory.json`
- Order data fetched from Zoho Billing API in real-time

## Zoho Custom Fields

The API expects these custom fields on Zoho invoices:

- **Shipping Status** (dropdown)
- **SIM Card Number** (text)
- **Tracking Number** (text)
- **Device Type** (dropdown)
- **Line Status** (dropdown)
- **Device Status** (dropdown)
- **Ordered By** (dropdown)
- **Active on TMobile** (dropdown)
- **TMobile Line Number** (text)
- **Device S/N** (text)

## Testing

Test the API:
```bash
# Health check
curl http://localhost:5000/api/fulfillment/health

# Get queue
curl http://localhost:5000/api/fulfillment/queue

# Get stats
curl http://localhost:5000/api/fulfillment/stats
```

## Development

- Flask runs in debug mode by default
- CORS enabled for frontend development
- Logs output to console

## Production Deployment

For production:
1. Set `FLASK_ENV=production` in `.env`
2. Use a production WSGI server (gunicorn, uwsgi)
3. Set up proper logging
4. Configure CORS for specific origins
5. Use a proper database instead of JSON (PostgreSQL recommended)

Example with gunicorn:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```
