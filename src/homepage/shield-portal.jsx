import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { validateJWT } from '../utils/jwtValidation';

const API_BASE_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : '';

export default function ShieldPortal() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [subscriber, setSubscriber] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [cancelLoading, setCancelLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);

    useEffect(() => {
        const recordId = searchParams.get('recordId');
        const jwt = searchParams.get('jwt');

        if (!recordId || !jwt) {
            // Try to get from session
            const sessionToken = sessionStorage.getItem('shield_portal_jwt');
            const sessionRecordId = sessionStorage.getItem('shield_portal_recordId');

            if (sessionToken && sessionRecordId) {
                initializePortal(sessionRecordId, sessionToken);
            } else {
                navigate('/shield-auth');
            }
        } else {
            // Validate and store session
            validateAndInitialize(recordId, jwt);
        }

        // Listen for payment update messages from popup
        const handleMessage = async (event) => {
            if (event.data && event.data.type === 'PAYMENT_UPDATED') {
                console.log('Payment updated! Refreshing subscription data...');

                const sessionRecordId = sessionStorage.getItem('shield_portal_recordId');
                const sessionToken = sessionStorage.getItem('shield_portal_jwt');

                if (sessionRecordId && sessionToken) {
                    setLoading(true);
                    try {
                        // Refresh all subscription data
                        const [subscriberData, subscriptionData, invoicesData] = await Promise.all([
                            axios.get(`${API_BASE_URL}/api/shield-subscriber-data?recordId=${sessionRecordId}`),
                            axios.get(`${API_BASE_URL}/api/shield-subscription?recordId=${sessionRecordId}`),
                            axios.get(`${API_BASE_URL}/api/shield-invoices?recordId=${sessionRecordId}`)
                        ]);

                        setSubscriber(subscriberData.data);
                        setSubscription(subscriptionData.data);
                        setInvoices(invoicesData.data.invoices || []);

                        console.log('Subscription data refreshed successfully!');
                        alert('Payment method updated successfully!');
                    } catch (error) {
                        console.error('Error refreshing subscription:', error);
                        alert('Payment updated but failed to refresh. Please refresh the page.');
                    } finally {
                        setLoading(false);
                    }
                }
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [searchParams, navigate]);

    const validateAndInitialize = async (recordId, jwt) => {
        try {
            console.log('Step 1: Fetching timestamp from cache...');
            // Validate auth code
            const cacheResponse = await axios.get(`${API_BASE_URL}/api/redis-cache?key=${recordId}&typeOfData=time`);
            const timestamp = cacheResponse.data.data;
            console.log('Timestamp from cache:', timestamp);

            console.log('Step 2: Validating auth code...');
            const validateResponse = await axios.get(
                `${API_BASE_URL}/api/validateAuthCode?authCode=${jwt}&timestamp=${timestamp}&userId=${recordId}`
            );
            console.log('Validation response:', validateResponse.data);

            if (!validateResponse.data.valid) {
                throw new Error('Invalid or expired authentication link');
            }

            console.log('Step 3: Deleting timestamp from cache...');
            // Delete timestamp from cache
            await axios.delete(`${API_BASE_URL}/api/redis-cache?key=${recordId}&typeOfData=time`);

            console.log('Step 4: Getting JWT token...');
            // Get JWT token
            const jwtResponse = await axios.post(`${API_BASE_URL}/api/jwt`, {
                recordID: recordId
            });

            const token = jwtResponse.data.token;
            console.log('JWT token received');

            // Store in session
            sessionStorage.setItem('shield_portal_jwt', token);
            sessionStorage.setItem('shield_portal_recordId', recordId);

            console.log('Step 5: Initializing portal...');
            // Initialize portal
            await initializePortal(recordId, token);

        } catch (error) {
            console.error('Validation error:', error);
            console.error('Error details:', error.response?.data);
            navigate('/shield-auth');
        }
    };

    const initializePortal = async (recordId, token) => {
        try {
            setLoading(true);

            // Validate JWT
            const validation = validateJWT(token, recordId);
            if (!validation.isValid) {
                throw new Error(validation.message);
            }

            // Fetch subscriber and subscription data
            const [subscriberData, subscriptionData, invoicesData] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/shield-subscriber-data?recordId=${recordId}`),
                axios.get(`${API_BASE_URL}/api/shield-subscription?recordId=${recordId}`),
                axios.get(`${API_BASE_URL}/api/shield-invoices?recordId=${recordId}`)
            ]);

            setSubscriber(subscriberData.data);
            setSubscription(subscriptionData.data);
            setInvoices(invoicesData.data.invoices || []);
            setLoading(false);

        } catch (error) {
            console.error('Error initializing portal:', error);
            sessionStorage.removeItem('shield_portal_jwt');
            sessionStorage.removeItem('shield_portal_recordId');
            navigate('/shield-auth');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('shield_portal_jwt');
        sessionStorage.removeItem('shield_portal_recordId');
        navigate('/shield-auth');
    };

    const downloadInvoice = async (invoiceId) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/shield-invoice-pdf?invoiceId=${invoiceId}`,
                { responseType: 'blob' }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${invoiceId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading invoice:', error);
            alert('Failed to download invoice. Please try again.');
        }
    };

    const handleCancelSubscription = async () => {
        if (!cancelReason.trim()) {
            alert('Please provide a reason for cancellation.');
            return;
        }

        if (!window.confirm('Are you sure you want to cancel your subscription? It will remain active until the end of your current billing period.')) {
            return;
        }

        setCancelLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/api/shield-cancel-subscription`, {
                subscriptionId: subscription.subscription_id,
                reason: cancelReason
            });

            alert('Your subscription has been scheduled for cancellation at the end of the current billing period.');
            setShowCancelModal(false);
            setCancelReason('');

            // Refresh subscription data
            const subscriptionData = await axios.get(`${API_BASE_URL}/api/shield-subscription?recordId=${sessionStorage.getItem('shield_portal_recordId')}`);
            setSubscription(subscriptionData.data);
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            alert(error.response?.data?.error || 'Failed to cancel subscription. Please try again.');
        } finally {
            setCancelLoading(false);
        }
    };

    const handleUpdatePayment = async () => {
        try {
            setPaymentLoading(true);

            // Generate hosted page for updating card
            const response = await axios.post(`${API_BASE_URL}/api/shield-update-payment-page`, {
                subscriptionId: subscription.subscription_id
            });

            const hostedPageUrl = response.data.url;

            // Open in centered popup
            const width = 600;
            const height = 700;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;

            const popup = window.open(
                hostedPageUrl,
                'UpdatePayment',
                `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no`
            );

            if (!popup || popup.closed || typeof popup.closed === 'undefined') {
                alert('Please allow popups for this site to update your payment method.');
            }
        } catch (error) {
            console.error('Error creating payment update page:', error);
            alert('Failed to open payment update page. Please try again.');
        } finally {
            setPaymentLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-c4p"></div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'invoices', label: 'Billing History' },
        { id: 'faq', label: 'FAQs' },
        { id: 'support', label: 'Support' }
    ];

    return (
        <div className="min-h-screen bg-neutral-50 pt-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-c4p-dark to-c4p border-b border-c4p-darker shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src="/Hotspot/shield.png" alt="Shield" className="h-12 w-12 object-contain" />
                            <div>
                                <h1 className="text-3xl font-bold text-white">Shield Portal</h1>
                                <p className="text-sm text-white/80 mt-1">Manage your Shield subscription</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Card */}
                <div className="bg-gradient-to-br from-white to-neutral-100 rounded-2xl shadow-lg p-6 mb-8 border border-neutral-200">
                    <h2 className="text-2xl font-bold text-c4p-darker mb-2">
                        Welcome, {subscriber?.customer_name || 'Shield Subscriber'}!
                    </h2>
                    <p className="text-gray-600">Account: {subscription?.subscription_number || 'N/A'}</p>
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
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Subscription Status */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="relative overflow-hidden bg-gradient-to-br from-white to-neutral-100 rounded-2xl shadow-lg p-6 border border-neutral-200">
                                        <div className="relative z-10">
                                            <p className="text-xs font-semibold text-c4p-dark uppercase tracking-wider mb-3">Status</p>
                                            <p className="text-3xl font-black text-c4p-darker">
                                                {subscription?.cf_shipping_status || 'Active'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative overflow-hidden bg-gradient-to-br from-white to-neutral-100 rounded-2xl shadow-lg p-6 border border-neutral-200">
                                        <div className="relative z-10">
                                            <p className="text-xs font-semibold text-c4p-dark uppercase tracking-wider mb-3">Monthly Cost</p>
                                            <p className="text-3xl font-black text-c4p-darker">
                                                ${subscription?.amount || '0.00'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative overflow-hidden bg-gradient-to-br from-c4p to-c4p-hover rounded-2xl shadow-lg p-6 border border-c4p-dark">
                                        <div className="relative z-10">
                                            <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-3">Next Billing</p>
                                            <p className="text-3xl font-black text-white">
                                                {subscription?.next_billing_at
                                                    ? new Date(subscription.next_billing_at).toLocaleDateString()
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Information */}
                                {subscription?.cf_shipping_status && (
                                    <div className="bg-gradient-to-br from-c4p/5 to-c4p/10 border border-c4p/20 rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-c4p-darker mb-4">Shipping Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="font-semibold text-c4p-dark">Status:</p>
                                                <p className="text-gray-700">{subscription.cf_shipping_status}</p>
                                            </div>
                                            {subscription.cf_tracking_number && (
                                                <div>
                                                    <p className="font-semibold text-c4p-dark">Tracking Number:</p>
                                                    <a
                                                        href={`https://www.fedex.com/fedextrack/?trknbr=${subscription.cf_tracking_number}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-c4p hover:text-c4p-hover underline"
                                                    >
                                                        {subscription.cf_tracking_number}
                                                    </a>
                                                </div>
                                            )}
                                            {subscription.cf_shipping_date && (
                                                <div>
                                                    <p className="font-semibold text-c4p-dark">Shipped Date:</p>
                                                    <p className="text-gray-700">
                                                        {new Date(subscription.cf_shipping_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Payment Method */}
                                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-c4p-darker mb-4">Payment Method</h3>
                                    {subscription?.card && (
                                        <p className="text-gray-600 mb-4">
                                            Current Card: •••• •••• •••• {subscription.card.last_four_digits || subscription.card.last4 || 'N/A'}
                                            {subscription.card.card_type && ` (${subscription.card.card_type})`}
                                        </p>
                                    )}
                                    <p className="text-gray-600 mb-4">
                                        Update your payment method securely through our payment portal.
                                    </p>
                                    <button
                                        onClick={handleUpdatePayment}
                                        disabled={paymentLoading}
                                        className="inline-block px-6 py-3 bg-gradient-to-r from-c4p to-c4p-hover text-white rounded-lg hover:from-c4p-hover hover:to-c4p-dark transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
                                    >
                                        {paymentLoading ? 'Opening...' : 'Update Payment Method'}
                                    </button>
                                </div>

                                {/* Cancel Subscription */}
                                <div className="bg-white border border-red-200 rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-red-600 mb-4">Cancel Subscription</h3>
                                    <p className="text-gray-600 mb-4">
                                        Need to cancel? Your subscription will remain active until the end of your current billing period.
                                    </p>
                                    <button
                                        onClick={() => setShowCancelModal(true)}
                                        className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-semibold"
                                    >
                                        Cancel Subscription
                                    </button>
                                </div>

                                {/* Referral Program */}
                                <div className="bg-gradient-to-br from-c4p/5 to-c4p/10 border border-c4p/20 rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-c4p-darker mb-4">Refer a Friend, Get a Month Free!</h3>
                                    <p className="text-gray-700 mb-4">
                                        Share Shield with friends and family. When they sign up using your referral link, you'll get a month free!
                                    </p>
                                    <div className="bg-white border border-c4p/30 rounded-lg p-4 mb-4">
                                        <p className="text-sm text-gray-600 mb-2">Your Referral Link:</p>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                readOnly
                                                value={`https://www.computers4people.org/shield?ref=${subscription?.subscription_number || ''}`}
                                                className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm"
                                            />
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`https://www.computers4people.org/shield?ref=${subscription?.subscription_number || ''}`);
                                                    alert('Referral link copied to clipboard!');
                                                }}
                                                className="px-4 py-2 bg-c4p hover:bg-c4p-hover text-white rounded font-semibold text-sm transition-colors"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'invoices' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-c4p-darker mb-4">Past Invoices</h3>
                                {invoices.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No invoices available</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white border border-neutral-200 rounded-lg">
                                            <thead className="bg-neutral-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-c4p-dark uppercase tracking-wider">
                                                        Invoice #
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-c4p-dark uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-c4p-dark uppercase tracking-wider">
                                                        Amount
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-c4p-dark uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-c4p-dark uppercase tracking-wider">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-neutral-200">
                                                {invoices.map((invoice) => (
                                                    <tr key={invoice.invoice_id} className="hover:bg-neutral-50">
                                                        <td className="px-4 py-3 text-sm text-gray-900">
                                                            {invoice.invoice_number}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">
                                                            {new Date(invoice.invoice_date).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-900 font-semibold">
                                                            ${invoice.total}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                                invoice.status === 'paid'
                                                                    ? 'bg-c4p/10 text-c4p-dark'
                                                                    : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                                {invoice.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">
                                                            <button
                                                                onClick={() => downloadInvoice(invoice.invoice_id)}
                                                                className="text-c4p hover:text-c4p-hover font-semibold"
                                                            >
                                                                Download PDF
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'faq' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-c4p-darker mb-4">Frequently Asked Questions</h3>

                                <div className="space-y-4">
                                    <div className="bg-gradient-to-br from-c4p/5 to-c4p/10 border border-c4p/20 rounded-xl p-4">
                                        <h4 className="font-bold text-c4p-darker mb-2">How do I update my payment method?</h4>
                                        <p className="text-gray-700 text-sm">
                                            Click the "Update Payment Method" button in the Overview tab to access your Zoho billing portal where you can update your credit card information.
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-c4p/5 to-c4p/10 border border-c4p/20 rounded-xl p-4">
                                        <h4 className="font-bold text-c4p-darker mb-2">When will my device ship?</h4>
                                        <p className="text-gray-700 text-sm">
                                            New orders typically ship within 3-5 business days. You can track your shipping status in the Overview tab.
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-c4p/5 to-c4p/10 border border-c4p/20 rounded-xl p-4">
                                        <h4 className="font-bold text-c4p-darker mb-2">How do I cancel my subscription?</h4>
                                        <p className="text-gray-700 text-sm">
                                            Please contact our support team through the Support tab to discuss cancellation options.
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-c4p/5 to-c4p/10 border border-c4p/20 rounded-xl p-4">
                                        <h4 className="font-bold text-c4p-darker mb-2">What if I have technical issues with my device?</h4>
                                        <p className="text-gray-700 text-sm">
                                            Contact our support team using the form in the Support tab, and we'll help troubleshoot your issue.
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-c4p/5 to-c4p/10 border border-c4p/20 rounded-xl p-4">
                                        <h4 className="font-bold text-c4p-darker mb-2">Can I change my plan?</h4>
                                        <p className="text-gray-700 text-sm">
                                            Yes! Contact our support team to discuss upgrading or changing your Shield plan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'support' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-c4p-darker mb-4">Contact Support</h3>

                                <div className="bg-gradient-to-br from-c4p/5 to-c4p/10 border border-c4p/20 rounded-xl p-6">
                                    <p className="text-gray-700 mb-6">
                                        Need help? Our support team is here to assist you with any questions or issues you may have.
                                    </p>

                                    <a
                                        href="/contact"
                                        className="inline-block px-8 py-3 bg-gradient-to-r from-c4p to-c4p-hover text-white rounded-lg hover:from-c4p-hover hover:to-c4p-dark transition-all font-semibold shadow-lg hover:shadow-xl"
                                    >
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cancel Subscription Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-c4p-darker mb-4">Cancel Subscription</h3>
                        <p className="text-gray-600 mb-4">
                            We're sorry to see you go. Please let us know why you're canceling:
                        </p>
                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            placeholder="Tell us why you're canceling..."
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg mb-4 h-24 resize-none"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowCancelModal(false);
                                    setCancelReason('');
                                }}
                                disabled={cancelLoading}
                                className="flex-1 px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-gray-700 rounded-lg font-semibold transition-colors"
                            >
                                Keep Subscription
                            </button>
                            <button
                                onClick={handleCancelSubscription}
                                disabled={cancelLoading}
                                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                            >
                                {cancelLoading ? 'Canceling...' : 'Confirm Cancellation'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
