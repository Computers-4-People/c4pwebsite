import { useState, useEffect } from 'react';

export default function RecentShipments({ apiBase }) {
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('2days'); // 'today', '2days', 'week', 'month', 'all'
  const [selectedShipment, setSelectedShipment] = useState(null);

  // Fetch shipped orders
  const fetchShipments = async () => {
    try {
      const response = await fetch(`${apiBase}/api/fulfillment/queue?status=shipped`);
      const data = await response.json();
      if (data.success) {
        // Sort by shipped date (most recent first)
        const sorted = data.orders.sort((a, b) =>
          new Date(b.shipped_date || b.updated_date) - new Date(a.shipped_date || a.updated_date)
        );
        setShipments(sorted);
        setFilteredShipments(sorted);
      }
    } catch (error) {
      console.error('Error fetching shipments:', error);
      // Use mock data if API is unavailable
      const mockShipments = [
        {
          invoice_id: 'SUB-004',
          invoice_number: 'SUB-2024-004',
          customer_name: 'Emily Martinez',
          email: 'emily@example.com',
          shipping_address: { address: '321 Elm Dr', address2: 'Suite 200', city: 'Lakewood', state: 'CO', zip: '80226' },
          device_type: 'Shield Hotspot',
          assigned_sim: '89148000000234567890',
          tracking_number: '1Z999AA10123456784',
          shipped_date: '2024-01-21T10:30:00Z',
          updated_date: '2024-01-21T10:30:00Z'
        },
        {
          invoice_id: 'SUB-005',
          invoice_number: 'SUB-2024-005',
          customer_name: 'David Wilson',
          email: 'david@example.com',
          shipping_address: { address: '555 Maple Ave', city: 'Denver', state: 'CO', zip: '80210' },
          device_type: '',
          assigned_sim: '89148000000345678901',
          tracking_number: '1Z999AA10123456785',
          shipped_date: '2024-01-21T09:15:00Z',
          updated_date: '2024-01-21T09:15:00Z'
        },
        {
          invoice_id: 'SUB-006',
          invoice_number: 'SUB-2024-006',
          customer_name: 'Lisa Brown',
          email: 'lisa@example.com',
          shipping_address: { address: '777 Cedar Ln', address2: 'Apt 3C', city: 'Boulder', state: 'CO', zip: '80305' },
          device_type: 'Shield Hotspot',
          assigned_sim: '89148000000456789012',
          tracking_number: '1Z999AA10123456786',
          shipped_date: '2024-01-20T16:45:00Z',
          updated_date: '2024-01-20T16:45:00Z'
        }
      ];

      setShipments(mockShipments);
      setFilteredShipments(mockShipments);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  // Filter by search term and date
  useEffect(() => {
    let filtered = shipments;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(shipment =>
        shipment.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.tracking_number?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const twoDaysAgo = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (dateFilter === 'today') {
      filtered = filtered.filter(s => {
        const shipDate = new Date(s.shipped_date || s.updated_date);
        return shipDate >= today;
      });
    } else if (dateFilter === '2days') {
      filtered = filtered.filter(s => {
        const shipDate = new Date(s.shipped_date || s.updated_date);
        return shipDate >= twoDaysAgo;
      });
    } else if (dateFilter === 'week') {
      filtered = filtered.filter(s => {
        const shipDate = new Date(s.shipped_date || s.updated_date);
        return shipDate >= weekAgo;
      });
    } else if (dateFilter === 'month') {
      filtered = filtered.filter(s => {
        const shipDate = new Date(s.shipped_date || s.updated_date);
        return shipDate >= monthAgo;
      });
    }

    setFilteredShipments(filtered);
  }, [searchTerm, dateFilter, shipments]);

  // Export to CSV
  const handleExport = () => {
    const headers = ['Sub ID', 'Customer', 'Address', 'Address 2', 'City', 'State', 'Zip', 'Device', 'SIM', 'Tracking', 'Shipped Date'];
    const rows = filteredShipments.map(s => [
      s.invoice_number,
      s.customer_name,
      s.shipping_address.address,
      s.shipping_address.address2 || '',
      s.shipping_address.city,
      s.shipping_address.state,
      s.shipping_address.zip,
      s.device_type || '',
      s.assigned_sim || '',
      s.tracking_number || '',
      new Date(s.shipped_date || s.updated_date).toLocaleDateString()
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shipments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by customer, sub ID, or tracking number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="today">Today</option>
          <option value="2days">Last 2 Days</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="all">All Time</option>
        </select>

        <button
          onClick={fetchShipments}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Refresh
        </button>

        <button
          onClick={handleExport}
          disabled={filteredShipments.length === 0}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Export CSV
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm font-medium text-blue-600">Total Shipped</p>
          <p className="text-2xl font-bold text-blue-900 mt-1">{filteredShipments.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm font-medium text-green-600">With Tracking</p>
          <p className="text-2xl font-bold text-green-900 mt-1">
            {filteredShipments.filter(s => s.tracking_number).length}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <p className="text-sm font-medium text-purple-600">Today</p>
          <p className="text-2xl font-bold text-purple-900 mt-1">
            {shipments.filter(s => {
              const shipDate = new Date(s.shipped_date || s.updated_date);
              const today = new Date();
              return shipDate.toDateString() === today.toDateString();
            }).length}
          </p>
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sub ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SIM
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tracking
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shipped
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredShipments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No shipments found
                  </td>
                </tr>
              ) : (
                filteredShipments.map((shipment) => (
                  <tr
                    key={shipment.invoice_id}
                    onClick={() => setSelectedShipment(shipment)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {shipment.invoice_number}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {shipment.customer_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      <div className="max-w-xs">
                        <div>{shipment.shipping_address.address}</div>
                        {shipment.shipping_address.address2 && (
                          <div>{shipment.shipping_address.address2}</div>
                        )}
                        <div>
                          {shipment.shipping_address.city}, {shipment.shipping_address.state} {shipment.shipping_address.zip}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {shipment.device_type ? (
                        <span>{shipment.device_type}</span>
                      ) : (
                        <span className="text-gray-400 italic">No device</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">
                      {shipment.assigned_sim ? `...${shipment.assigned_sim.slice(-4)}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {shipment.tracking_number ? (
                        <a
                          href={`https://www.fedex.com/fedextrack/?trknbr=${shipment.tracking_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 hover:text-blue-800 font-mono hover:underline"
                        >
                          {shipment.tracking_number}
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(shipment.shipped_date || shipment.updated_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipment Detail Modal */}
      {selectedShipment && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedShipment(null);
          }}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-green-500 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Shipment Details</h2>
                <p className="text-sm text-green-100">{selectedShipment.invoice_number}</p>
              </div>
              <button
                onClick={() => setSelectedShipment(null)}
                className="text-white hover:text-gray-200 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800 border border-green-300">
                  Shipped
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(selectedShipment.shipped_date || selectedShipment.updated_date).toLocaleString()}
                </span>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Customer
                </h3>
                <p className="text-base font-medium text-gray-900">{selectedShipment.customer_name}</p>
                {selectedShipment.email && (
                  <p className="text-sm text-gray-600">{selectedShipment.email}</p>
                )}
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Shipping Address
                </h3>
                <div className="text-sm text-gray-900">
                  <p>{selectedShipment.shipping_address.address}</p>
                  {selectedShipment.shipping_address.address2 && (
                    <p>{selectedShipment.shipping_address.address2}</p>
                  )}
                  <p>
                    {selectedShipment.shipping_address.city}, {selectedShipment.shipping_address.state}{' '}
                    {selectedShipment.shipping_address.zip}
                  </p>
                </div>
              </div>

              {/* Device & SIM Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Device
                  </h3>
                  <p className="text-sm text-gray-900">{selectedShipment.device_type || '—'}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    SIM Card
                  </h3>
                  <p className="text-sm text-gray-900 font-mono">
                    {selectedShipment.assigned_sim || '—'}
                  </p>
                </div>
              </div>

              {/* Tracking Info */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Tracking Number
                </h3>
                {selectedShipment.tracking_number ? (
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-900 font-mono">{selectedShipment.tracking_number}</p>
                    <a
                      href={`https://www.fedex.com/fedextrack/?trknbr=${selectedShipment.tracking_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Track →
                    </a>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No tracking number</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedShipment.tracking_number && (
                  <a
                    href={`https://www.fedex.com/fedextrack/?trknbr=${selectedShipment.tracking_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center font-medium"
                  >
                    Track Package
                  </a>
                )}
                <button
                  onClick={() => setSelectedShipment(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
