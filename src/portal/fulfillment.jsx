import { useState, useEffect } from 'react';
import OrderQueue from './components/OrderQueue';
import RecentShipments from './components/RecentShipments';
import TmobileActivationQueue from './components/TmobileActivationQueue';

// API base URL - Vercel serverless functions
const API_BASE = '';

// Access code protection
const PORTAL_ACCESS_CODE = process.env.REACT_APP_SHIELD_FULFILLMENT_ACCESS || 'shieldrocks321';

export default function FulfillmentPortal() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('queue');
  const [stats, setStats] = useState({
    sims_to_ship: 0,
    shield_5g_to_ship: 0,
    t10_to_ship: 0,
    shipped_last_2_days: 0,
    pending_tmobile_activation: 0
  });
  const [loading, setLoading] = useState(true);

  // Check if already authenticated in session
  useEffect(() => {
    const isAuth = sessionStorage.getItem('shield_portal_auth') === 'true';
    if (isAuth) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === PORTAL_ACCESS_CODE) {
      setAuthenticated(true);
      sessionStorage.setItem('shield_portal_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
      setPasswordInput('');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem('shield_portal_auth');
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/fulfillment/stats`);
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use mock data if API is unavailable
      setStats({
        sims_to_ship: 4,
        shield_5g_to_ship: 2,
        t10_to_ship: 1,
        shipped_last_2_days: 3,
        pending_tmobile_activation: 2
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Auto-refresh stats every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'queue', label: 'Order Queue' },
    { id: 'tmobile', label: 'Pending T-Mobile Activation' },
    { id: 'shipments', label: 'Recent Shipments' }
  ];

  // Show login form if not authenticated
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center pt-20">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-neutral-200">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <img src="/Hotspot/shield.png" alt="Shield" className="h-16 w-16 object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-c4p-darker">Shield Fulfillment Portal</h1>
            <p className="text-sm text-gray-500 mt-2">Enter password to access</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-c4p-dark mb-2">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-c4p focus:border-c4p"
                placeholder="Enter password"
                autoFocus
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-c4p to-c4p-hover text-white rounded-lg font-semibold hover:from-c4p-hover hover:to-c4p-dark transition-all shadow-lg hover:shadow-xl"
            >
              Access Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-c4p-dark to-c4p border-b border-c4p-darker shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/Hotspot/shield.png" alt="Shield" className="h-12 w-12 object-contain" />
              <div>
                <h1 className="text-3xl font-bold text-white">Shield Fulfillment Portal</h1>
                <p className="text-sm text-white/80 mt-1">Internal order fulfillment system</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchStats}
                className="text-sm text-white/90 hover:text-white flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* SIMs to Ship */}
          <div className="relative overflow-hidden bg-gradient-to-br from-white to-neutral-100 rounded-2xl shadow-lg p-6 border border-neutral-200 hover:shadow-xl transition-shadow">
            <div className="relative z-10">
              <p className="text-xs font-semibold text-c4p-dark uppercase tracking-wider mb-3">SIMs to Ship</p>
              <p className="text-5xl font-black text-c4p-darker">
                {loading ? '—' : stats.sims_to_ship}
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-5">
              <svg className="w-32 h-32 text-c4p" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 8h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h1V7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1zM9 8h6V7H9v1z" />
              </svg>
            </div>
          </div>

          {/* Shield 5G to Ship */}
          <div className="relative overflow-hidden bg-gradient-to-br from-white to-neutral-100 rounded-2xl shadow-lg p-6 border border-neutral-200 hover:shadow-xl transition-shadow">
            <div className="relative z-10">
              <p className="text-xs font-semibold text-c4p-dark uppercase tracking-wider mb-3">Shield 5G to Ship</p>
              <p className="text-5xl font-black text-c4p-darker">
                {loading ? '—' : stats.shield_5g_to_ship}
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-5">
              <svg className="w-32 h-32 text-c4p" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
          </div>

          {/* T10 to Ship */}
          <div className="relative overflow-hidden bg-gradient-to-br from-white to-neutral-100 rounded-2xl shadow-lg p-6 border border-neutral-200 hover:shadow-xl transition-shadow">
            <div className="relative z-10">
              <p className="text-xs font-semibold text-c4p-dark uppercase tracking-wider mb-3">T10 to Ship</p>
              <p className="text-5xl font-black text-c4p-darker">
                {loading ? '—' : stats.t10_to_ship}
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-5">
              <svg className="w-32 h-32 text-c4p" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Shipped Last 2 Days */}
          <div className="relative overflow-hidden bg-gradient-to-br from-c4p to-c4p-hover rounded-2xl shadow-lg p-6 border border-c4p-dark hover:shadow-xl transition-shadow">
            <div className="relative z-10">
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-3">Shipped Last 2 Days</p>
              <p className="text-5xl font-black text-white">
                {loading ? '—' : stats.shipped_last_2_days}
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-10">
              <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Pending T-Mobile Activation */}
          <div className="relative overflow-hidden bg-gradient-to-br from-white to-neutral-100 rounded-2xl shadow-lg p-6 border border-neutral-200 hover:shadow-xl transition-shadow">
            <div className="relative z-10">
              <p className="text-xs font-semibold text-c4p-dark uppercase tracking-wider mb-3">Pending T-Mobile</p>
              <p className="text-5xl font-black text-c4p-darker">
                {loading ? '—' : stats.pending_tmobile_activation}
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-5">
              <svg className="w-32 h-32 text-c4p" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 7h10v10H7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-6 border border-neutral-200">
          <div className="border-b border-neutral-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-semibold border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-c4p text-c4p-dark bg-c4p/5'
                      : 'border-transparent text-gray-500 hover:text-c4p-dark hover:border-c4p/30 hover:bg-neutral-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'queue' && <OrderQueue apiBase={API_BASE} onStatsUpdate={fetchStats} />}
            {activeTab === 'tmobile' && <TmobileActivationQueue apiBase={API_BASE} />}
            {activeTab === 'shipments' && <RecentShipments apiBase={API_BASE} />}
          </div>
        </div>
      </div>
    </div>
  );
}
