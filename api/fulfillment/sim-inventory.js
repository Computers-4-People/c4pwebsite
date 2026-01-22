const fs = require('fs').promises;
const path = require('path');

// Use /tmp for Vercel serverless environment (writable)
const DATA_FILE = path.join('/tmp', 'sim_inventory.json');

// Initialize data file if it doesn't exist
async function initDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        const initialData = { sims: [], batches: [] };
        await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
        await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
    }
}

// Read SIM inventory
async function readInventory() {
    await initDataFile();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
}

// Write SIM inventory
async function writeInventory(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Add batch of SIMs
async function addSimBatch(iccids, batchId = null) {
    const inventory = await readInventory();

    if (!batchId) {
        batchId = `BATCH-${new Date().toISOString().split('T')[0]}-${Date.now()}`;
    }

    const receivedDate = new Date().toISOString();
    const newSims = [];

    for (const iccid of iccids) {
        const trimmedIccid = iccid.trim();
        if (trimmedIccid) {
            // Check if SIM already exists
            const exists = inventory.sims.find(s => s.iccid === trimmedIccid);
            if (!exists) {
                newSims.push({
                    iccid: trimmedIccid,
                    batch_id: batchId,
                    received_date: receivedDate,
                    status: 'unassigned',
                    assigned_to_invoice: null,
                    assigned_date: null
                });
            }
        }
    }

    inventory.sims.push(...newSims);

    // Add or update batch info
    const existingBatch = inventory.batches.find(b => b.batch_id === batchId);
    if (existingBatch) {
        existingBatch.count += newSims.length;
        existingBatch.unassigned_count += newSims.length;
    } else {
        inventory.batches.push({
            batch_id: batchId,
            received_date: receivedDate,
            count: newSims.length,
            unassigned_count: newSims.length
        });
    }

    await writeInventory(inventory);
    return { success: true, count: newSims.length, batch_id: batchId };
}

// Get unassigned SIMs
async function getUnassignedSims() {
    const inventory = await readInventory();
    return inventory.sims.filter(sim => sim.status === 'unassigned');
}

// Get all SIMs
async function getAllSims() {
    const inventory = await readInventory();
    return inventory.sims;
}

// Get all batches
async function getAllBatches() {
    const inventory = await readInventory();
    return inventory.batches;
}

// Assign SIM to invoice
async function assignSim(iccid, invoiceId) {
    const inventory = await readInventory();

    const sim = inventory.sims.find(s => s.iccid === iccid);
    if (!sim) {
        throw new Error('SIM card not found in inventory');
    }

    if (sim.status === 'assigned') {
        throw new Error('SIM card is already assigned');
    }

    sim.status = 'assigned';
    sim.assigned_to_invoice = invoiceId;
    sim.assigned_date = new Date().toISOString();

    // Update batch unassigned count
    const batch = inventory.batches.find(b => b.batch_id === sim.batch_id);
    if (batch) {
        batch.unassigned_count = Math.max(0, batch.unassigned_count - 1);
    }

    await writeInventory(inventory);
    return { success: true, sim };
}

// Auto-assign SIMs (FIFO)
async function autoAssignSims(invoiceIds) {
    const inventory = await readInventory();
    const unassignedSims = inventory.sims
        .filter(sim => sim.status === 'unassigned')
        .sort((a, b) => new Date(a.received_date) - new Date(b.received_date));

    const assignments = [];

    for (let i = 0; i < Math.min(invoiceIds.length, unassignedSims.length); i++) {
        const sim = unassignedSims[i];
        const invoiceId = invoiceIds[i];

        sim.status = 'assigned';
        sim.assigned_to_invoice = invoiceId;
        sim.assigned_date = new Date().toISOString();

        // Update batch unassigned count
        const batch = inventory.batches.find(b => b.batch_id === sim.batch_id);
        if (batch) {
            batch.unassigned_count = Math.max(0, batch.unassigned_count - 1);
        }

        assignments.push({ invoice_id: invoiceId, iccid: sim.iccid });
    }

    await writeInventory(inventory);
    return { success: true, assignments, count: assignments.length };
}

// Get inventory stats
async function getInventoryStats() {
    const inventory = await readInventory();
    const totalSims = inventory.sims.length;
    const unassignedSims = inventory.sims.filter(s => s.status === 'unassigned').length;
    const assignedSims = inventory.sims.filter(s => s.status === 'assigned').length;

    return {
        total_sims: totalSims,
        unassigned_sims: unassignedSims,
        assigned_sims: assignedSims,
        total_batches: inventory.batches.length
    };
}

module.exports = {
    addSimBatch,
    getUnassignedSims,
    getAllSims,
    getAllBatches,
    assignSim,
    autoAssignSims,
    getInventoryStats
};
