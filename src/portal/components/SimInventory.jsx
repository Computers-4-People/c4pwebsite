import { useState, useEffect } from 'react';

export default function SimInventory({ apiBase, onStatsUpdate }) {
  const [sims, setSims] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [iccidInput, setIccidInput] = useState('');
  const [batchIdInput, setBatchIdInput] = useState('');
  const [addingBatch, setAddingBatch] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'unassigned', 'assigned'

  // Fetch SIM inventory
  const fetchInventory = async () => {
    try {
      const response = await fetch(`${apiBase}/api/sims/unassigned`);
      const data = await response.json();
      if (data.success) {
        setSims(data.sims);
      }

      // Fetch batches
      const batchResponse = await fetch(`${apiBase}/api/sims/batches`);
      const batchData = await batchResponse.json();
      if (batchData.success) {
        setBatches(batchData.batches);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
      // Use mock data if API is unavailable
      const mockSims = [
        { iccid: '89148000000123456789', batch_id: 'BATCH-2024-001', status: 'unassigned', received_date: '2024-01-15T10:00:00Z' },
        { iccid: '89148000000234567890', batch_id: 'BATCH-2024-001', status: 'assigned', received_date: '2024-01-15T10:00:00Z', assigned_to_invoice: 'INV-2024-002', assigned_date: '2024-01-20T09:30:00Z' },
        { iccid: '89148000000345678901', batch_id: 'BATCH-2024-001', status: 'unassigned', received_date: '2024-01-15T10:00:00Z' },
        { iccid: '89148000000456789012', batch_id: 'BATCH-2024-002', status: 'unassigned', received_date: '2024-01-18T14:00:00Z' },
        { iccid: '89148000000567890123', batch_id: 'BATCH-2024-002', status: 'unassigned', received_date: '2024-01-18T14:00:00Z' },
      ];

      const mockBatches = [
        { batch_id: 'BATCH-2024-001', received_date: '2024-01-15T10:00:00Z', count: 3, unassigned_count: 2 },
        { batch_id: 'BATCH-2024-002', received_date: '2024-01-18T14:00:00Z', count: 2, unassigned_count: 2 }
      ];

      setSims(mockSims);
      setBatches(mockBatches);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Add batch of SIMs
  const handleAddBatch = async (e) => {
    e.preventDefault();

    if (!iccidInput.trim()) {
      window.alert('Please enter at least one ICCID');
      return;
    }

    setAddingBatch(true);
    try {
      const response = await fetch(`${apiBase}/api/sims/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          iccids: iccidInput,
          batch_id: batchIdInput.trim() || undefined
        })
      });

      const data = await response.json();
      if (data.success) {
        window.alert(`Successfully added ${data.count} SIM cards!`);
        setIccidInput('');
        setBatchIdInput('');
        fetchInventory();
        onStatsUpdate();
      } else {
        window.alert('Error: ' + data.error);
      }
    } catch (error) {
      window.alert('Network error: ' + error.message);
    } finally {
      setAddingBatch(false);
    }
  };

  // Filter SIMs
  const filteredSims = sims.filter(sim => {
    if (filter === 'unassigned') return sim.status === 'unassigned';
    if (filter === 'assigned') return sim.status === 'assigned';
    return true;
  });

  // Calculate stats
  const stats = {
    total: sims.length,
    unassigned: sims.filter(s => s.status === 'unassigned').length,
    assigned: sims.filter(s => s.status === 'assigned').length
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total SIMs</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm font-medium text-green-600">Available</p>
          <p className="text-2xl font-bold text-green-900 mt-1">{stats.unassigned}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm font-medium text-blue-600">Assigned</p>
          <p className="text-2xl font-bold text-blue-900 mt-1">{stats.assigned}</p>
        </div>
      </div>

      {/* Add SIMs Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add SIM Cards</h3>
        <form onSubmit={handleAddBatch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch ID (Optional)
            </label>
            <input
              type="text"
              value={batchIdInput}
              onChange={(e) => setBatchIdInput(e.target.value)}
              placeholder="e.g. BATCH-2024-001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={addingBatch}
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave blank to auto-generate
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ICCID Numbers (one per line)
            </label>
            <textarea
              value={iccidInput}
              onChange={(e) => setIccidInput(e.target.value)}
              placeholder="89148000000123456789&#10;89148000000234567890&#10;89148000000345678901"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              rows={6}
              disabled={addingBatch}
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste multiple ICCIDs, one per line
            </p>
          </div>

          <button
            type="submit"
            disabled={addingBatch || !iccidInput.trim()}
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {addingBatch ? 'Adding SIMs...' : 'Add SIM Batch'}
          </button>
        </form>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All SIMs</option>
          <option value="unassigned">Available Only</option>
          <option value="assigned">Assigned Only</option>
        </select>

        <button
          onClick={fetchInventory}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* SIM Inventory Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ICCID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Received Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSims.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No SIM cards found
                  </td>
                </tr>
              ) : (
                filteredSims.map((sim) => (
                  <tr key={sim.iccid} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">
                      {sim.iccid}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {sim.batch_id}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {sim.status === 'unassigned' ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Available
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          Assigned
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(sim.received_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">
                      {sim.assigned_to_invoice || '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {sim.assigned_date
                        ? new Date(sim.assigned_date).toLocaleDateString()
                        : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Batch Summary */}
      {batches.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch Summary</h3>
          <div className="space-y-3">
            {batches.map((batch) => (
              <div
                key={batch.batch_id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{batch.batch_id}</p>
                  <p className="text-sm text-gray-500">
                    Received: {new Date(batch.received_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {batch.count} SIM{batch.count !== 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-gray-500">
                    {batch.unassigned_count} available
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
