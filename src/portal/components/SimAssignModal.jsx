import { useState, useEffect, useRef } from 'react';

export default function SimAssignModal({ order, apiBase, onClose, onAssigned }) {
  const [iccid, setIccid] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableSims, setAvailableSims] = useState([]);
  const [loadingSims, setLoadingSims] = useState(true);
  const [mode, setMode] = useState('scan'); // 'scan' or 'select'
  const inputRef = useRef(null);

  // Auto-focus input when modal opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fetch available SIMs for selection mode
  useEffect(() => {
    if (mode === 'select') {
      fetchAvailableSims();
    }
  }, [mode]);

  const fetchAvailableSims = async () => {
    try {
      const response = await fetch(`${apiBase}/api/sims/unassigned`);
      const data = await response.json();
      if (data.success) {
        setAvailableSims(data.sims);
      }
    } catch (error) {
      console.error('Error fetching SIMs:', error);
    } finally {
      setLoadingSims(false);
    }
  };

  const handleAssign = async (selectedIccid) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiBase}/api/fulfillment/assign-sim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoice_id: order.invoice_id,
          iccid: selectedIccid || iccid
        })
      });

      const data = await response.json();

      if (data.success) {
        // Success! Show brief success message and close
        onAssigned();
      } else {
        setError(data.error || 'Failed to assign SIM');
        setLoading(false);
      }
    } catch (error) {
      setError('Network error: ' + error.message);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!iccid.trim()) {
      setError('Please enter an ICCID');
      return;
    }
    handleAssign(iccid.trim());
  };

  const handleSelectSim = (selectedIccid) => {
    handleAssign(selectedIccid);
  };

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Assign SIM Card</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Invoice:</span>{' '}
              <span className="font-medium">{order.invoice_number}</span>
            </div>
            <div>
              <span className="text-gray-600">Customer:</span>{' '}
              <span className="font-medium">{order.customer_name}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Address:</span>{' '}
              <span className="font-medium">
                {order.shipping_address.address}, {order.shipping_address.city}, {order.shipping_address.state}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Device:</span>{' '}
              <span className="font-medium">{order.device_type}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Mode Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode('scan')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                mode === 'scan'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Scan/Type ICCID
            </button>
            <button
              onClick={() => setMode('select')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                mode === 'select'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pick from Inventory
            </button>
          </div>

          {/* Scan Mode */}
          {mode === 'scan' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SIM Card ICCID
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={iccid}
                  onChange={(e) => {
                    setIccid(e.target.value);
                    setError('');
                  }}
                  placeholder="Scan or type ICCID number"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                  disabled={loading}
                  autoComplete="off"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Scan barcode or manually enter the 19-20 digit ICCID
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !iccid.trim()}
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Assigning...' : 'Assign SIM'}
              </button>
            </form>
          )}

          {/* Select Mode */}
          {mode === 'select' && (
            <div>
              {loadingSims ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : availableSims.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No unassigned SIMs available
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {availableSims.map((sim) => (
                    <button
                      key={sim.iccid}
                      onClick={() => handleSelectSim(sim.iccid)}
                      disabled={loading}
                      className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-mono text-sm font-medium">{sim.iccid}</div>
                          <div className="text-xs text-gray-500">
                            Batch: {sim.batch_id} • Received: {new Date(sim.received_date).toLocaleDateString()}
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
