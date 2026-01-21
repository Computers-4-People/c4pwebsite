# Shield Fulfillment Portal - Deployment Guide

## Overview
The Shield Fulfillment Portal has been converted from Python Flask to Node.js serverless functions for Vercel deployment.

## Environment Variables Required

You need to add the following environment variable to your Vercel project:

### New Variable to Add:
- **ZOHO_ORG_ID**: `730897892`

### Existing Variables (should already be configured):
- **ZOHO_CLIENT_ID**: Your Zoho OAuth client ID
- **ZOHO_CLIENT_SECRET**: Your Zoho OAuth client secret
- **ZOHO_REFRESH_TOKEN**: Your Zoho OAuth refresh token
- **REACT_APP_PORTAL_PASSWORD**: Password for portal access (currently: `shieldrocks321`)

## How to Add Environment Variables to Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: `c4pwebsite`
3. Go to **Settings** → **Environment Variables**
4. Add the new variable:
   - **Name**: `ZOHO_ORG_ID`
   - **Value**: `730897892`
   - **Environments**: Select all (Production, Preview, Development)
5. Click **Save**

## Deployment Steps

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Add Node.js fulfillment API and portal"
   git push
   ```

2. **Vercel will automatically deploy**
   - Your deployment should complete in 1-2 minutes
   - Check the Vercel dashboard for deployment status

3. **Access the portal:**
   - URL: `https://yourdomain.com/ops-portal-shield-fulfillment`
   - Password: `shieldrocks321` (or your configured password)

## API Endpoints

All API endpoints are now Node.js serverless functions:

- **GET** `/api/fulfillment/queue` - Fetch pending orders
- **GET** `/api/fulfillment/stats` - Get dashboard statistics
- **GET** `/api/fulfillment/sims-unassigned` - List unassigned SIM cards
- **POST** `/api/fulfillment/assign-sim` - Assign SIM to order
- **POST** `/api/fulfillment/mark-shipped` - Mark order as shipped
- **POST** `/api/fulfillment/sims-batch` - Add batch of SIM cards

## File Storage Consideration

**IMPORTANT**: The current implementation uses a JSON file (`api/fulfillment/data/sim_inventory.json`) for SIM inventory storage. This works locally but **may have limitations in Vercel's serverless environment** because:

- Serverless functions are stateless
- File system writes may not persist between function invocations
- The `/tmp` directory is the only writable location in serverless functions

### Recommended Solution for Production:
Consider migrating to a database solution such as:
- **Vercel KV** (Redis-based key-value store)
- **Vercel Postgres** (PostgreSQL database)
- **MongoDB Atlas** (NoSQL database)
- **Supabase** (PostgreSQL with real-time capabilities)

For now, the JSON file approach will work for testing and light usage.

## Testing the Portal

After deployment:

1. **Access the portal** at `/ops-portal-shield-fulfillment`
2. **Login** with the password
3. **Verify the dashboard** loads and shows statistics
4. **Test the order queue** loads pending orders from Zoho
5. **Test SIM assignment** by entering a SIM card number
6. **Test shipping** by selecting orders and clicking "Ship"
7. **Test PDF generation** for shipping and return labels

## Features

### Order Queue
- View all orders needing SIM cards
- Enter SIM card ICCID for each order
- Enter tracking numbers for orders with devices
- Select multiple orders and ship in batch
- Search and filter orders

### PDF Label Generation
- **Shipping Labels**: Generates Avery 5136 (3×10) labels with customer addresses
- **Return Labels**: Generates Avery 5136 labels with Shield logo and return address

### Dashboard Statistics
- Orders needing SIM cards
- Shipped today count
- Auto-refresh every 60 seconds

## Troubleshooting

### Issue: "Failed to fetch orders"
- **Check**: Zoho API credentials are correct in Vercel environment variables
- **Check**: ZOHO_ORG_ID is set to `730897892`
- **Check**: Refresh token hasn't expired

### Issue: "Error marking order as shipped"
- **Check**: Invoice ID exists in Zoho
- **Check**: Custom fields are properly configured in Zoho (Shipping Status, SIM Card Number, Tracking Number)

### Issue: SIM inventory not persisting
- **Expected**: This is a known limitation with JSON file storage in serverless
- **Solution**: Migrate to a database solution (see "File Storage Consideration" above)

### Issue: PDF labels not generating
- **Check**: Shield logo exists at `/Hotspot/shieldlogo.png`
- **Check**: Browser console for errors
- **Fallback**: Return labels will use text-only version if logo fails to load

## Portal Password

The default password is `shieldrocks321`. To change it:

1. Update `REACT_APP_PORTAL_PASSWORD` in Vercel environment variables
2. Redeploy the application

## Support

If you encounter any issues:
1. Check Vercel deployment logs
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Test API endpoints directly using curl or Postman
