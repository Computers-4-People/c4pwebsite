import { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';

export default function OrderQueue({ apiBase, onStatsUpdate }) {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceTypeFilter, setDeviceTypeFilter] = useState('Sim Card Only');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'created_date', direction: 'asc' });
  const [simInputs, setSimInputs] = useState({}); // Track SIM input for each order
  const [trackingInputs, setTrackingInputs] = useState({}); // Track tracking number for each order
  const [shipping, setShipping] = useState(false);
  const simInputRefs = useRef({}); // Store refs for SIM input fields

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${apiBase}/api/fulfillment/queue?status=pending_sim`);
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
        setFilteredOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Use mock data if API is unavailable - only pending_sim orders
      const mockOrders = [
        {
          invoice_id: 'SUB-001',
          invoice_number: 'SUB-2024-001',
          customer_name: 'John Smith',
          email: 'john@example.com',
          phone: '555-0101',
          shipping_address: { address: '123 Main St', address2: 'Apt 4B', city: 'Denver', state: 'CO', zip: '80202' },
          device_type: 'Shield Hotspot',
          status: 'pending_sim',
          created_date: '2024-01-20T10:00:00Z',
          line_status: 'New',
          device_status: 'Pending'
        },
        {
          invoice_id: 'SUB-002',
          invoice_number: 'SUB-2024-002',
          customer_name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '555-0102',
          shipping_address: { address: '456 Oak Ave', city: 'Boulder', state: 'CO', zip: '80301' },
          device_type: '',
          status: 'pending_sim',
          created_date: '2024-01-20T09:30:00Z',
          line_status: 'Active',
          device_status: 'Ready'
        },
        {
          invoice_id: 'SUB-003',
          invoice_number: 'SUB-2024-003',
          customer_name: 'Mike Davis',
          email: 'mike@example.com',
          shipping_address: { address: '789 Pine St', address2: 'Unit 12', city: 'Aurora', state: 'CO', zip: '80012' },
          device_type: 'Shield Hotspot',
          status: 'pending_sim',
          created_date: '2024-01-19T15:20:00Z',
          line_status: 'New',
          device_status: 'Pending'
        },
        {
          invoice_id: 'SUB-005',
          invoice_number: 'SUB-2024-005',
          customer_name: 'Robert Chen',
          email: 'robert@example.com',
          shipping_address: { address: '999 Valley Rd', city: 'Westminster', state: 'CO', zip: '80031' },
          device_type: '',
          status: 'pending_sim',
          created_date: '2024-01-21T08:15:00Z',
          line_status: 'New',
          device_status: 'Pending'
        }
      ];

      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders by search term and device type
  useEffect(() => {
    let filtered = orders;

    // Filter by device type (case-insensitive)
    if (deviceTypeFilter && deviceTypeFilter !== 'All') {
      filtered = filtered.filter(order =>
        order.device_type?.toLowerCase() === deviceTypeFilter.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [searchTerm, deviceTypeFilter, orders]);

  // Sort orders
  const sortOrders = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...filteredOrders].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredOrders(sorted);
    setSortConfig({ key, direction });
  };

  // Ship selected orders with SIM cards
  const handleShipSelected = async () => {
    // Check that all selected orders have SIM cards entered
    const ordersNeedingSim = selectedOrders.filter(orderId => !simInputs[orderId]?.trim());

    if (ordersNeedingSim.length > 0) {
      window.alert(`Please enter SIM card numbers for all selected orders (${ordersNeedingSim.length} remaining)`);
      return;
    }

    // Check that all orders with devices (except Sim Card Only) have tracking numbers
    const ordersNeedingTracking = selectedOrders.filter(orderId => {
      const order = orders.find(o => o.invoice_id === orderId);
      return order?.device_type && order.device_type.toLowerCase() !== 'sim card only' && !trackingInputs[orderId]?.trim();
    });

    if (ordersNeedingTracking.length > 0) {
      window.alert(`Please enter tracking numbers for all orders with devices (${ordersNeedingTracking.length} remaining)`);
      return;
    }

    if (!window.confirm(`Ship ${selectedOrders.length} order(s)?`)) return;

    setShipping(true);
    try {
      // Call API to mark each order as shipped
      const promises = selectedOrders.map(async (orderId) => {
        const order = orders.find(o => o.invoice_id === orderId);
        const response = await fetch(`${apiBase}/api/fulfillment/mark-shipped`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            invoice_id: orderId,
            sim_card: simInputs[orderId],
            tracking_number: (order?.device_type && order.device_type.toLowerCase() !== 'sim card only') ? trackingInputs[orderId] : undefined
          })
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || `Failed to ship order ${orderId}`);
        }
        return data;
      });

      await Promise.all(promises);

      window.alert(`Successfully shipped ${selectedOrders.length} order(s)!`);
      setSimInputs({});
      setTrackingInputs({});
      setSelectedOrders([]);
      fetchOrders();
      onStatsUpdate();
    } catch (error) {
      console.error('Error shipping orders:', error);
      window.alert(`Error shipping orders: ${error.message}`);
    } finally {
      setShipping(false);
    }
  };

  // Update SIM input for an order
  const handleSimInput = (orderId, value) => {
    setSimInputs(prev => ({
      ...prev,
      [orderId]: value
    }));
  };

  // Update tracking input for an order
  const handleTrackingInput = (orderId, value) => {
    setTrackingInputs(prev => ({
      ...prev,
      [orderId]: value
    }));
  };

  // Handle Enter key press on SIM input to jump to next field
  const handleSimKeyDown = (e, currentOrderId) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // Find the current order index
      const currentIndex = filteredOrders.findIndex(order => order.invoice_id === currentOrderId);

      // Find the next order that doesn't have a SIM assigned
      let nextIndex = currentIndex + 1;
      while (nextIndex < filteredOrders.length) {
        const nextOrder = filteredOrders[nextIndex];
        if (!nextOrder.assigned_sim) {
          // Focus the next SIM input field
          const nextInput = simInputRefs.current[nextOrder.invoice_id];
          if (nextInput) {
            nextInput.focus();
            return;
          }
        }
        nextIndex++;
      }
    }
  };

  // Generate shipping labels PDF (Avery 5136 - 3x10)
  const generateShippingLabels = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter'
    });

    // Avery 5136 specifications (precise measurements)
    const labelWidth = 66.675;
    const labelHeight = 25.4;
    const leftMargin = 4.76;
    const topMargin = 12.7;
    const horizontalPitch = 69.85; // Distance from start of one label to start of next
    const verticalPitch = 25.4;
    const cols = 3;
    const rows = 10;

    let labelIndex = 0;

    filteredOrders.forEach((order) => {
      if (labelIndex > 0 && labelIndex % 30 === 0) {
        doc.addPage();
      }

      const currentLabel = labelIndex % 30;
      const col = currentLabel % cols;
      const row = Math.floor(currentLabel / cols);

      const x = leftMargin + col * horizontalPitch;
      const y = topMargin + row * verticalPitch;

      // Prepare address lines
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9); // Slightly smaller to fit long addresses

      const maxWidth = labelWidth - 10; // Leave 5mm margin on each side
      const lines = [];

      // Add customer name (wrapped if needed)
      const nameLines = doc.splitTextToSize(order.customer_name, maxWidth);
      lines.push(...nameLines);

      // Combine address and address2 on same line (wrapped if needed)
      const fullAddress = order.shipping_address.address2
        ? `${order.shipping_address.address} ${order.shipping_address.address2}`
        : order.shipping_address.address;
      const addressLines = doc.splitTextToSize(fullAddress, maxWidth);
      lines.push(...addressLines);

      // City, state, zip (wrapped if needed)
      const cityStateZip = `${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.zip}`;
      const cityLines = doc.splitTextToSize(cityStateZip, maxWidth);
      lines.push(...cityLines);

      // Calculate total height and center vertically
      const lineHeight = 4;
      const totalTextHeight = lines.length * lineHeight;
      const startY = y + (labelHeight - totalTextHeight) / 2 + 2; // Center vertically

      // Draw label content
      lines.forEach((line, index) => {
        doc.text(line, x + 5, startY + (index * lineHeight), { maxWidth: maxWidth });
      });

      labelIndex++;
    });

    doc.save('shipping-labels.pdf');
  };

  // Generate return address labels PDF (Avery 5136 - 3x10)
  const generateReturnLabels = () => {
    // Load Shield logo
    const img = new Image();
    img.src = '/Hotspot/shield.png';

    img.onload = () => {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter'
      });

      // Avery 5136 specifications (precise measurements)
      const labelWidth = 66.675;
      const labelHeight = 25.4;
      const leftMargin = 4.76;
      const topMargin = 12.7;
      const horizontalPitch = 69.85;
      const verticalPitch = 25.4;
      const cols = 3;
      const rows = 10;

      // Always generate 30 labels (full page)
      const totalLabels = 30;

      // Calculate logo dimensions to fit in 15mm square area, but keep small and preserve aspect ratio
      const logoSquareSize = 15; // 15mm square area
      const actualLogoSize = 10; // Logo itself is smaller than the square
      const aspectRatio = img.width / img.height;
      let logoWidth, logoHeight;

      if (aspectRatio > 1) {
        // Wider than tall
        logoWidth = actualLogoSize;
        logoHeight = actualLogoSize / aspectRatio;
      } else {
        // Taller than wide
        logoHeight = actualLogoSize;
        logoWidth = actualLogoSize * aspectRatio;
      }

      for (let labelIndex = 0; labelIndex < totalLabels; labelIndex++) {
        if (labelIndex > 0 && labelIndex % 30 === 0) {
          doc.addPage();
        }

        const currentLabel = labelIndex % 30;
        const col = currentLabel % cols;
        const row = Math.floor(currentLabel / cols);

        const x = leftMargin + col * horizontalPitch;
        const y = topMargin + row * verticalPitch;

        // Center text vertically
        const textStartY = y + labelHeight / 2 - 3;

        // Add small Shield logo in 15mm square, centered
        const logoX = x + 3 + (logoSquareSize - logoWidth) / 2; // Center horizontally in square
        const logoY = textStartY - logoHeight / 2; // Center logo vertically with text
        doc.addImage(img, 'PNG', logoX, logoY, logoWidth, logoHeight);

        // Text starts after logo square
        const textX = x + 3 + logoSquareSize + 2;

        // Draw "Computers 4 People" text
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text('Computers 4 People', textX, textStartY);

        // Draw address
        doc.setFontSize(10);
        doc.text('321 Newark St #32', textX, textStartY + 4.5);
        doc.text('Hoboken, NJ 07030', textX, textStartY + 9);
      }

      doc.save('return-labels.pdf');
    };

    img.onerror = () => {
      window.alert('Error loading Shield logo. Using text instead.');
      // Fallback to text-only version
      generateReturnLabelsTextOnly();
    };
  };

  // Fallback function for return labels without image
  const generateReturnLabelsTextOnly = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter'
    });

    const labelWidth = 66.675;
    const labelHeight = 25.4;
    const leftMargin = 4.76;
    const topMargin = 12.7;
    const horizontalPitch = 69.85;
    const verticalPitch = 25.4;
    const cols = 3;
    const rows = 10;
    const totalLabels = 30;

    for (let labelIndex = 0; labelIndex < totalLabels; labelIndex++) {
      if (labelIndex > 0 && labelIndex % 30 === 0) {
        doc.addPage();
      }

      const currentLabel = labelIndex % 30;
      const col = currentLabel % cols;
      const row = Math.floor(currentLabel / cols);

      const x = leftMargin + col * horizontalPitch;
      const y = topMargin + row * verticalPitch;

      const textStartY = y + labelHeight / 2 - 3;

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Shield', x + 3, textStartY);

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('Computers 4 People', x + 22, textStartY);

      doc.setFontSize(10);
      doc.text('321 Newark St #32', x + 22, textStartY + 4.5);
      doc.text('Hoboken, NJ 07030', x + 22, textStartY + 9);
    }

    doc.save('return-labels.pdf');
  };

  // Selection handling
  const toggleSelection = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(o => o.invoice_id));
    }
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
            placeholder="Search by customer, email, or sub ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={deviceTypeFilter}
          onChange={(e) => setDeviceTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="All">All Devices</option>
          <option value="Sim Card Only">SIM Card Only</option>
          <option value="Shield 5G">Shield 5G</option>
          <option value="T10">T10</option>
        </select>

        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Instructions and Label Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Instructions */}
        <div className="lg:col-span-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">
                How to ship orders:
              </p>
              <ol className="text-xs text-blue-700 mt-1 list-decimal list-inside space-y-1">
                <li>Select orders using the checkboxes</li>
                <li>Enter SIM card ICCID numbers for <strong>ALL</strong> selected orders</li>
                <li>Enter tracking numbers <strong>only for orders with devices</strong></li>
                <li>Click "Ship Selected Orders" button below</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Label Generation Buttons */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-purple-900 mb-3">
              📄 Print Labels (Avery 5136)
            </p>
            <button
              onClick={generateShippingLabels}
              disabled={filteredOrders.length === 0}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Shipping Labels
            </button>
            <button
              onClick={generateReturnLabels}
              disabled={filteredOrders.length === 0}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Return Labels
            </button>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      {selectedOrders.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6 bg-green-50 border-2 border-green-500 rounded-lg p-4 shadow-lg">
          <div className="flex-1">
            <p className="text-base font-bold text-green-900">
              {selectedOrders.length} order{selectedOrders.length !== 1 ? 's' : ''} selected
            </p>
            <p className="text-sm text-green-700 mt-1">
              {(() => {
                const ordersWithSim = selectedOrders.filter(orderId => simInputs[orderId]?.trim()).length;
                const ordersWithDevices = selectedOrders.filter(orderId => {
                  const order = orders.find(o => o.invoice_id === orderId);
                  return order?.device_type && order.device_type.toLowerCase() !== 'sim card only';
                }).length;
                const ordersWithTracking = selectedOrders.filter(orderId => trackingInputs[orderId]?.trim()).length;

                const simsMissing = selectedOrders.length - ordersWithSim;
                const trackingMissing = ordersWithDevices - ordersWithTracking;

                if (simsMissing > 0 && trackingMissing > 0) {
                  return `Enter ${simsMissing} SIM number(s) and ${trackingMissing} tracking number(s)`;
                } else if (simsMissing > 0) {
                  return `Enter ${simsMissing} more SIM number(s)`;
                } else if (trackingMissing > 0) {
                  return `Enter ${trackingMissing} more tracking number(s) for devices`;
                } else {
                  return 'All information entered - ready to ship!';
                }
              })()}
            </p>
          </div>
          <button
            onClick={handleShipSelected}
            disabled={shipping}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
          >
            {shipping ? 'Shipping...' : '📦 Ship Selected Orders'}
          </button>
          <button
            onClick={() => {
              setSelectedOrders([]);
              setSimInputs({});
              setTrackingInputs({});
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded"
                />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => sortOrders('invoice_number')}
              >
                Sub ID
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => sortOrders('customer_name')}
              >
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Address
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Device
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SIM Qty
              </th>
              {deviceTypeFilter.toLowerCase() !== 'sim card only' && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device Qty
                </th>
              )}
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => sortOrders('created_date')}
              >
                Created
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enter SIM Card #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enter Tracking # (if device)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr
                key={order.invoice_id}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.invoice_id)}
                    onChange={() => toggleSelection(order.invoice_id)}
                    className="rounded"
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {order.invoice_number}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{order.customer_name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <div className="max-w-xs">
                    <div>{order.shipping_address.address}</div>
                    {order.shipping_address.address2 && (
                      <div>{order.shipping_address.address2}</div>
                    )}
                    <div>
                      {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {order.device_type ? (
                    <span>{order.device_type}</span>
                  ) : (
                    <span className="text-gray-400 italic">No device</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {order.sim_card_quantity || '—'}
                </td>
                {deviceTypeFilter.toLowerCase() !== 'sim card only' && (
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {order.device_type?.toLowerCase() === 'sim card only' ? (
                      <span className="text-gray-400 text-xs italic">N/A</span>
                    ) : (
                      order.device_quantity || '—'
                    )}
                  </td>
                )}
                <td className="px-4 py-3 text-sm text-gray-500">
                  {order.created_date ? new Date(order.created_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  {order.assigned_sim ? (
                    <div className="text-sm text-gray-900 font-mono">
                      {order.assigned_sim}
                    </div>
                  ) : (
                    <input
                      ref={(el) => simInputRefs.current[order.invoice_id] = el}
                      type="text"
                      value={simInputs[order.invoice_id] || ''}
                      onChange={(e) => handleSimInput(order.invoice_id, e.target.value)}
                      onKeyDown={(e) => handleSimKeyDown(e, order.invoice_id)}
                      placeholder="Enter SIM Number"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                    />
                  )}
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  {order.device_type && order.device_type.toLowerCase() !== 'sim card only' ? (
                    <input
                      type="text"
                      value={trackingInputs[order.invoice_id] || ''}
                      onChange={(e) => handleTrackingInput(order.invoice_id, e.target.value)}
                      placeholder="Enter tracking #"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs italic">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No orders found
        </div>
      )}
    </div>
  );
}
