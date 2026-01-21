"""
Zoho Billing API Integration Module
Handles OAuth2 authentication and API calls to Zoho Billing
"""

import os
import time
import requests
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ZohoBillingAPI:
    """Zoho Billing API client with OAuth2 token management"""

    def __init__(self):
        self.client_id = os.getenv('ZOHO_CLIENT_ID')
        self.client_secret = os.getenv('ZOHO_CLIENT_SECRET')
        self.refresh_token = os.getenv('ZOHO_REFRESH_TOKEN')
        self.org_id = os.getenv('ZOHO_ORG_ID')
        self.base_url = 'https://www.zohoapis.com/billing/v1'

        # Token cache
        self._access_token = None
        self._token_expires_at = None

        if not all([self.client_id, self.client_secret, self.refresh_token, self.org_id]):
            logger.warning("Zoho credentials not fully configured in environment variables")

    def _get_access_token(self) -> str:
        """Get valid access token, refreshing if necessary"""

        # Return cached token if still valid
        if self._access_token and self._token_expires_at:
            if datetime.now() < self._token_expires_at - timedelta(minutes=5):
                return self._access_token

        # Refresh token
        logger.info("Refreshing Zoho access token")

        token_url = 'https://accounts.zoho.com/oauth/v2/token'
        params = {
            'refresh_token': self.refresh_token,
            'client_id': self.client_id,
            'client_secret': self.client_secret,
            'grant_type': 'refresh_token'
        }

        try:
            response = requests.post(token_url, params=params, timeout=10)
            response.raise_for_status()

            data = response.json()
            self._access_token = data['access_token']
            # Zoho tokens typically expire in 1 hour
            self._token_expires_at = datetime.now() + timedelta(seconds=data.get('expires_in', 3600))

            logger.info("Access token refreshed successfully")
            return self._access_token

        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to refresh access token: {e}")
            raise Exception(f"Zoho authentication failed: {e}")

    def _make_request(self, method: str, endpoint: str, params: Dict = None, json: Dict = None) -> Dict:
        """Make authenticated request to Zoho API"""

        access_token = self._get_access_token()
        url = f"{self.base_url}{endpoint}"

        headers = {
            'Authorization': f'Zoho-oauthtoken {access_token}',
            'X-com-zoho-subscriptions-organizationid': self.org_id,
            'Content-Type': 'application/json'
        }

        try:
            response = requests.request(
                method=method,
                url=url,
                headers=headers,
                params=params,
                json=json,
                timeout=30
            )

            response.raise_for_status()
            return response.json()

        except requests.exceptions.HTTPError as e:
            logger.error(f"Zoho API error: {e.response.status_code} - {e.response.text}")
            raise Exception(f"Zoho API error: {e.response.text}")
        except requests.exceptions.RequestException as e:
            logger.error(f"Request failed: {e}")
            raise Exception(f"Request to Zoho failed: {e}")

    # Core API Functions

    def get_pending_orders(self) -> List[Dict]:
        """
        Fetch invoices where Shipping Status = "Pending"
        Returns list of invoice objects
        """
        try:
            # Use custom field filter for Shipping Status
            params = {
                'filter_by': 'Status.All',
                'per_page': 100
            }

            response = self._make_request('GET', '/invoices', params=params)
            invoices = response.get('invoices', [])

            # Filter for pending shipping status
            pending = []
            for invoice in invoices:
                custom_fields = {cf['label']: cf.get('value', '')
                               for cf in invoice.get('custom_fields', [])}

                if custom_fields.get('Shipping Status') == 'Pending':
                    pending.append(invoice)

            logger.info(f"Found {len(pending)} pending orders")
            return pending

        except Exception as e:
            logger.error(f"Error fetching pending orders: {e}")
            raise

    def get_order_details(self, invoice_id: str) -> Dict:
        """
        Get full invoice details with customer data

        Args:
            invoice_id: Zoho invoice ID

        Returns:
            Complete invoice object with custom fields
        """
        try:
            response = self._make_request('GET', f'/invoices/{invoice_id}')
            invoice = response.get('invoice', {})

            logger.info(f"Fetched details for invoice {invoice_id}")
            return invoice

        except Exception as e:
            logger.error(f"Error fetching order {invoice_id}: {e}")
            raise

    def update_invoice_fields(self, invoice_id: str, fields: Dict) -> Dict:
        """
        Update custom fields on an invoice

        Args:
            invoice_id: Zoho invoice ID
            fields: Dict of field names to values, e.g.:
                    {
                        'SIM Card Number': '89011234567890123456',
                        'Tracking Number': '794644790327',
                        'Shipping Status': 'Shipped'
                    }

        Returns:
            Updated invoice object
        """
        try:
            # First get current invoice to preserve other fields
            current = self.get_order_details(invoice_id)

            # Build custom fields array
            custom_fields = current.get('custom_fields', [])
            custom_fields_dict = {cf['label']: cf for cf in custom_fields}

            # Update specified fields
            for field_name, field_value in fields.items():
                if field_name in custom_fields_dict:
                    custom_fields_dict[field_name]['value'] = field_value

            # Convert back to list
            updated_custom_fields = list(custom_fields_dict.values())

            # Update invoice
            payload = {
                'custom_fields': updated_custom_fields
            }

            response = self._make_request('PUT', f'/invoices/{invoice_id}', json=payload)

            logger.info(f"Updated invoice {invoice_id} fields: {list(fields.keys())}")
            return response.get('invoice', {})

        except Exception as e:
            logger.error(f"Error updating invoice {invoice_id}: {e}")
            raise

    def get_customer(self, customer_id: str) -> Dict:
        """
        Get customer details including shipping address

        Args:
            customer_id: Zoho customer ID

        Returns:
            Customer object with addresses
        """
        try:
            response = self._make_request('GET', f'/customers/{customer_id}')
            customer = response.get('customer', {})

            logger.info(f"Fetched customer {customer_id}")
            return customer

        except Exception as e:
            logger.error(f"Error fetching customer {customer_id}: {e}")
            raise

    def list_invoices_by_status(self, status: str = 'all') -> List[Dict]:
        """
        List invoices filtered by status

        Args:
            status: 'all', 'sent', 'draft', 'overdue', 'paid', 'void', 'unpaid'

        Returns:
            List of invoice objects
        """
        try:
            status_map = {
                'all': 'Status.All',
                'sent': 'Status.Sent',
                'draft': 'Status.Draft',
                'overdue': 'Status.Overdue',
                'paid': 'Status.Paid',
                'void': 'Status.Void',
                'unpaid': 'Status.Unpaid'
            }

            params = {
                'filter_by': status_map.get(status, 'Status.All'),
                'per_page': 100
            }

            response = self._make_request('GET', '/invoices', params=params)
            invoices = response.get('invoices', [])

            logger.info(f"Fetched {len(invoices)} invoices with status '{status}'")
            return invoices

        except Exception as e:
            logger.error(f"Error listing invoices: {e}")
            raise

    def get_custom_field_value(self, invoice: Dict, field_name: str) -> Optional[str]:
        """
        Helper to extract custom field value from invoice

        Args:
            invoice: Invoice object
            field_name: Name of custom field

        Returns:
            Field value or None if not found
        """
        custom_fields = invoice.get('custom_fields', [])
        for field in custom_fields:
            if field.get('label') == field_name:
                return field.get('value')
        return None


# Singleton instance
_zoho_api = None

def get_zoho_api() -> ZohoBillingAPI:
    """Get or create Zoho API singleton instance"""
    global _zoho_api
    if _zoho_api is None:
        _zoho_api = ZohoBillingAPI()
    return _zoho_api
