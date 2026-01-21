"""
SIM Card Inventory Management
Tracks unassigned SIM cards and assignments to orders
"""

import json
import os
from datetime import datetime
from typing import List, Dict, Optional
import logging

logger = logging.getLogger(__name__)

# Path to JSON inventory file
INVENTORY_FILE = os.path.join(os.path.dirname(__file__), 'data', 'sim_inventory.json')


class SIMInventory:
    """Manages SIM card inventory using JSON file storage"""

    def __init__(self):
        self._ensure_data_file()

    def _ensure_data_file(self):
        """Create data directory and file if they don't exist"""
        os.makedirs(os.path.dirname(INVENTORY_FILE), exist_ok=True)

        if not os.path.exists(INVENTORY_FILE):
            initial_data = {
                'sims': [],
                'batches': []
            }
            self._save_data(initial_data)

    def _load_data(self) -> Dict:
        """Load inventory data from JSON file"""
        try:
            with open(INVENTORY_FILE, 'r') as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error loading inventory data: {e}")
            return {'sims': [], 'batches': []}

    def _save_data(self, data: Dict):
        """Save inventory data to JSON file"""
        try:
            with open(INVENTORY_FILE, 'w') as f:
                json.dump(data, f, indent=2)
        except Exception as e:
            logger.error(f"Error saving inventory data: {e}")
            raise

    def add_batch(self, iccids: List[str], batch_id: str = None) -> Dict:
        """
        Add a batch of SIM cards to inventory

        Args:
            iccids: List of ICCID numbers (one per line acceptable)
            batch_id: Optional batch identifier, auto-generated if not provided

        Returns:
            Dict with batch info and count added
        """
        data = self._load_data()

        # Generate batch ID if not provided
        if not batch_id:
            batch_id = f"BATCH-{datetime.now().strftime('%Y-%m-%d-%H%M%S')}"

        # Clean and deduplicate ICCIDs
        clean_iccids = [iccid.strip() for iccid in iccids if iccid.strip()]
        clean_iccids = list(set(clean_iccids))  # Remove duplicates

        # Check for already existing ICCIDs
        existing_iccids = {sim['iccid'] for sim in data['sims']}
        new_iccids = [iccid for iccid in clean_iccids if iccid not in existing_iccids]
        duplicate_count = len(clean_iccids) - len(new_iccids)

        # Add new SIMs
        received_date = datetime.now().isoformat()
        for iccid in new_iccids:
            sim = {
                'iccid': iccid,
                'batch_id': batch_id,
                'received_date': received_date,
                'assigned_to_invoice': None,
                'assigned_date': None,
                'status': 'available'
            }
            data['sims'].append(sim)

        # Add batch record
        batch = {
            'batch_id': batch_id,
            'received_date': received_date,
            'count': len(new_iccids),
            'iccids': new_iccids
        }
        data['batches'].append(batch)

        self._save_data(data)

        logger.info(f"Added batch {batch_id} with {len(new_iccids)} SIMs ({duplicate_count} duplicates skipped)")

        return {
            'batch_id': batch_id,
            'added': len(new_iccids),
            'duplicates': duplicate_count,
            'total_inventory': len([s for s in data['sims'] if s['status'] == 'available'])
        }

    def get_unassigned_sims(self) -> List[Dict]:
        """
        Get all unassigned SIM cards

        Returns:
            List of SIM objects with status='available'
        """
        data = self._load_data()
        unassigned = [sim for sim in data['sims'] if sim['status'] == 'available']

        logger.info(f"Found {len(unassigned)} unassigned SIMs")
        return unassigned

    def assign_sim(self, iccid: str, invoice_id: str) -> Dict:
        """
        Assign a SIM card to an invoice

        Args:
            iccid: SIM card ICCID number
            invoice_id: Zoho invoice ID

        Returns:
            Updated SIM object
        """
        data = self._load_data()

        # Find the SIM
        sim = None
        for s in data['sims']:
            if s['iccid'] == iccid:
                sim = s
                break

        if not sim:
            raise ValueError(f"SIM card {iccid} not found in inventory")

        if sim['status'] != 'available':
            raise ValueError(f"SIM card {iccid} is already assigned to {sim['assigned_to_invoice']}")

        # Assign it
        sim['assigned_to_invoice'] = invoice_id
        sim['assigned_date'] = datetime.now().isoformat()
        sim['status'] = 'assigned'

        self._save_data(data)

        logger.info(f"Assigned SIM {iccid} to invoice {invoice_id}")
        return sim

    def auto_assign_sims(self, pending_invoice_ids: List[str]) -> Dict:
        """
        Auto-assign available SIMs to pending orders (FIFO)

        Args:
            pending_invoice_ids: List of invoice IDs that need SIMs, sorted by date (oldest first)

        Returns:
            Dict with assignment results
        """
        data = self._load_data()

        # Get available SIMs (oldest first based on received_date)
        available_sims = [sim for sim in data['sims'] if sim['status'] == 'available']
        available_sims.sort(key=lambda x: x['received_date'])

        assignments = []
        for i, invoice_id in enumerate(pending_invoice_ids):
            if i >= len(available_sims):
                break  # No more SIMs available

            sim = available_sims[i]
            sim['assigned_to_invoice'] = invoice_id
            sim['assigned_date'] = datetime.now().isoformat()
            sim['status'] = 'assigned'

            assignments.append({
                'invoice_id': invoice_id,
                'iccid': sim['iccid']
            })

        self._save_data(data)

        logger.info(f"Auto-assigned {len(assignments)} SIMs")

        return {
            'assigned_count': len(assignments),
            'assignments': assignments,
            'remaining_pending': len(pending_invoice_ids) - len(assignments)
        }

    def get_sim_by_iccid(self, iccid: str) -> Optional[Dict]:
        """Get SIM details by ICCID"""
        data = self._load_data()

        for sim in data['sims']:
            if sim['iccid'] == iccid:
                return sim

        return None

    def get_stats(self) -> Dict:
        """
        Get inventory statistics

        Returns:
            Dict with counts of unassigned, assigned today, total
        """
        data = self._load_data()

        unassigned = len([s for s in data['sims'] if s['status'] == 'available'])
        total = len(data['sims'])

        # Count assigned today
        today = datetime.now().date().isoformat()
        assigned_today = len([
            s for s in data['sims']
            if s['assigned_date'] and s['assigned_date'].startswith(today)
        ])

        return {
            'unassigned': unassigned,
            'assigned_today': assigned_today,
            'total': total,
            'assigned_total': total - unassigned
        }

    def get_all_batches(self) -> List[Dict]:
        """Get all SIM batches with summary info"""
        data = self._load_data()

        # Enhance batch info with current status
        for batch in data['batches']:
            batch_sims = [s for s in data['sims'] if s['batch_id'] == batch['batch_id']]
            batch['remaining'] = len([s for s in batch_sims if s['status'] == 'available'])

        return data['batches']


# Singleton instance
_sim_inventory = None

def get_sim_inventory() -> SIMInventory:
    """Get or create SIM inventory singleton instance"""
    global _sim_inventory
    if _sim_inventory is None:
        _sim_inventory = SIMInventory()
    return _sim_inventory
