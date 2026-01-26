import { useEffect, useMemo, useState } from 'react';

export default function TmobileActivationQueue({ apiBase }) {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [statusInputs, setStatusInputs] = useState({});
  const [updatingIds, setUpdatingIds] = useState(new Set());
  const [bulkUpdating, setBulkUpdating] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${apiBase}/api/fulfillment/queue?status=pending_tmobile`);
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
        setFilteredOrders(data.orders);
        const nextInputs = {};
        data.orders.forEach((order) => {
          const id = order.subscription_id;
          if (id) {
            nextInputs[id] = order.active_on_tmobile || 'No';
          }
        });
        setStatusInputs(nextInputs);
      }
    } catch (error) {
      console.error('Error fetching T-Mobile activation queue:', error);
      setOrders([]);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((order) =>
        order.customer_name?.toLowerCase().includes(term) ||
        order.email?.toLowerCase().includes(term) ||
        order.subscription_number?.toLowerCase().includes(term) ||
        order.assigned_sim?.toLowerCase().includes(term)
      );
    }
    setFilteredOrders(filtered);
  }, [orders, searchTerm]);

  const allSelected = useMemo(() => {
    if (filteredOrders.length === 0) return false;
    return filteredOrders.every((order) => order.subscription_id && selectedOrders.includes(order.subscription_id));
  }, [filteredOrders, selectedOrders]);

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedOrders([]);
      return;
    }
    const ids = filteredOrders.map((order) => order.subscription_id).filter(Boolean);
    setSelectedOrders(ids);
  };

  const toggleSelectOne = (orderId) => {
    setSelectedOrders((prev) => (
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    ));
  };

  const updateTmobileStatus = async (subscriptionIds, value) => {
    const response = await fetch(`${apiBase}/api/fulfillment/update-tmobile-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscription_ids: subscriptionIds,
        value
      })
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to update T-Mobile status');
    }
  };

  const handleSingleUpdate = async (orderId, value) => {
    if (!orderId || !value) return;
    setUpdatingIds((prev) => new Set([...prev, orderId]));
    try {
      await updateTmobileStatus([orderId], value);
      setStatusInputs((prev) => ({ ...prev, [orderId]: value }));
      if (value === 'Yes') {
        await fetchOrders();
      }
    } catch (error) {
      window.alert(`Failed to update: ${error.message}`);
    } finally {
      setUpdatingIds((prev) => {
        const next = new Set(prev);
        next.delete(orderId);
        return next;
      });
    }
  };

  const handleBulkActivate = async () => {
    if (selectedOrders.length === 0) {
      window.alert('Select at least one record to update.');
      return;
    }
    if (!window.confirm(`Mark ${selectedOrders.length} record(s) as Active on T-Mobile?`)) return;

    setBulkUpdating(true);
    try {
      await updateTmobileStatus(selectedOrders, 'Yes');
      setSelectedOrders([]);
      await fetchOrders();
      window.alert('Selected records updated.');
    } catch (error) {
      window.alert(`Failed to update selected records: ${error.message}`);
    } finally {
      setBulkUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-c4p-darker">Pending T-Mobile Activation</h3>
          <p className="text-sm text-gray-500">SIM assigned • Active on T-Mobile = No • Subscription status Live</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, email, subscription, SIM"
            className="w-full sm:w-72 px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-c4p focus:border-c4p"
          />
          <button
            onClick={handleBulkActivate}
            disabled={bulkUpdating || selectedOrders.length === 0}
            className="px-4 py-2 bg-c4p text-white rounded-lg text-sm font-semibold hover:bg-c4p-hover disabled:opacity-50"
          >
            {bulkUpdating ? 'Updating...' : 'Mark Selected Active'}
          </button>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-gray-500">Loading...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No records pending activation.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-c4p-dark uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      className="h-4 w-4"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-c4p-dark uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-c4p-dark uppercase tracking-wider">Subscription</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-c4p-dark uppercase tracking-wider">SIM Card</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-c4p-dark uppercase tracking-wider">Active on T-Mobile</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-c4p-dark uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-c4p-dark uppercase tracking-wider">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredOrders.map((order) => {
                  const orderId = order.subscription_id;
                  const isUpdating = orderId ? updatingIds.has(orderId) : false;
                  return (
                    <tr key={orderId || order.invoice_id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={orderId ? selectedOrders.includes(orderId) : false}
                          onChange={() => orderId && toggleSelectOne(orderId)}
                          disabled={!orderId}
                          className="h-4 w-4"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {order.customer_name || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {order.subscription_number || order.subscription_id || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                        {order.assigned_sim || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <select
                            value={orderId ? (statusInputs[orderId] || 'No') : 'No'}
                            onChange={(e) => orderId && handleSingleUpdate(orderId, e.target.value)}
                            disabled={isUpdating || !orderId}
                            className="px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-c4p focus:border-c4p"
                          >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                          {isUpdating && (
                            <span className="text-xs text-gray-400">Updating…</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {(() => {
                          const status = (order.subscription_status || '').toLowerCase();
                          const isLive = status === 'live';
                          const badgeClass = isLive
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200';
                          const label = order.subscription_status || '—';
                          return (
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${badgeClass}`}>
                              {label}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {order.email || '—'}
                      </td>
                    </tr>
                );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
