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
    const [subscriptionsForEmail, setSubscriptionsForEmail] = useState([]);
    const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(null);
    const [authRecordId, setAuthRecordId] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [cancelLoading, setCancelLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [reactivateLoading, setReactivateLoading] = useState(false);

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
                const activeSubscriptionId = selectedSubscriptionId || sessionRecordId;

                if (activeSubscriptionId && sessionToken) {
                    setLoading(true);
                    try {
                        // Refresh all subscription data
                        const [subscriberData, subscriptionData, invoicesData] = await Promise.all([
                            axios.get(`${API_BASE_URL}/api/shield-subscriber-data?recordId=${activeSubscriptionId}`),
                            axios.get(`${API_BASE_URL}/api/shield-subscription?recordId=${activeSubscriptionId}`),
                            axios.get(`${API_BASE_URL}/api/shield-invoices?recordId=${activeSubscriptionId}`)
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
            let timestamp = searchParams.get('timestamp');
            if (timestamp) {
                console.log('Timestamp from URL:', timestamp);
            } else {
                console.log('Step 1: Fetching timestamp from cache...');
                // Validate auth code
                const cacheResponse = await axios.get(`${API_BASE_URL}/api/redis-cache?key=${recordId}&typeOfData=time`);
                timestamp = cacheResponse.data.data;
                console.log('Timestamp from cache:', timestamp);
            }

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
            setAuthRecordId(recordId);

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
            setSelectedSubscriptionId(recordId);
            sessionStorage.setItem('shield_portal_selected_subscriptionId', recordId);

            // Fetch all subscriptions that share the same email
            try {
                const subscriberEmail = subscriptionData.data?.email || subscriberData.data?.email || subscriberData.data?.customer_email;
                if (subscriberEmail) {
                    const subsResponse = await axios.get(
                        `${API_BASE_URL}/api/shield-subscriber?email=${encodeURIComponent(subscriberEmail)}&findAll=true`
                    );
                    const allSubscriptions = subsResponse.data?.data || [];
                    setSubscriptionsForEmail(allSubscriptions);
                    console.log('Subscriptions found for email:', subscriberEmail, allSubscriptions.map(sub => sub.subscription_id));
                    console.log('Subscription count for email:', allSubscriptions.length);
                    const savedSelection = sessionStorage.getItem('shield_portal_selected_subscriptionId');
                    if (savedSelection && savedSelection !== recordId && allSubscriptions.some(sub => sub.subscription_id === savedSelection)) {
                        await handleSubscriptionSelect({ target: { value: savedSelection } });
                    }
                } else {
                    console.log('No subscriber email available to look up subscriptions.');
                    setSubscriptionsForEmail([]);
                }
            } catch (error) {
                console.error('Error fetching subscriptions by email:', error);
                setSubscriptionsForEmail([]);
            }
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
            const refreshId = selectedSubscriptionId || sessionStorage.getItem('shield_portal_recordId');
            const subscriptionData = await axios.get(`${API_BASE_URL}/api/shield-subscription?recordId=${refreshId}`);
            setSubscription(subscriptionData.data);
            // Refresh subscription list statuses
            if (subscriptionsForEmail.length > 0) {
                const subscriberEmail = subscriptionData.data?.email || subscriber?.email || subscriber?.customer_email;
                if (subscriberEmail) {
                    const subsResponse = await axios.get(
                        `${API_BASE_URL}/api/shield-subscriber?email=${encodeURIComponent(subscriberEmail)}&findAll=true`
                    );
                    setSubscriptionsForEmail(subsResponse.data?.data || []);
                }
            }
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            alert(error.response?.data?.error || 'Failed to cancel subscription. Please try again.');
        } finally {
            setCancelLoading(false);
        }
    };

    const handleReactivateSubscription = async () => {
        if (!window.confirm('Are you sure you want to reactivate your subscription? Billing will resume on the next scheduled date.')) {
            return;
        }

        setReactivateLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/api/shield-reactivate-subscription`, {
                subscriptionId: subscription.subscription_id
            });

            alert('Your subscription has been reactivated successfully!');

            // Refresh subscription data
            const refreshId = selectedSubscriptionId || sessionStorage.getItem('shield_portal_recordId');
            const subscriptionData = await axios.get(`${API_BASE_URL}/api/shield-subscription?recordId=${refreshId}`);
            setSubscription(subscriptionData.data);
            // Refresh subscription list statuses
            if (subscriptionsForEmail.length > 0) {
                const subscriberEmail = subscriptionData.data?.email || subscriber?.email || subscriber?.customer_email;
                if (subscriberEmail) {
                    const subsResponse = await axios.get(
                        `${API_BASE_URL}/api/shield-subscriber?email=${encodeURIComponent(subscriberEmail)}&findAll=true`
                    );
                    setSubscriptionsForEmail(subsResponse.data?.data || []);
                }
            }
        } catch (error) {
            console.error('Error reactivating subscription:', error);
            alert(error.response?.data?.error || 'Failed to reactivate subscription. Please try again.');
        } finally {
            setReactivateLoading(false);
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

    const handleSubscriptionSelect = async (event) => {
        const nextId = event.target.value;
        if (!nextId || nextId === selectedSubscriptionId) {
            return;
        }

        setLoading(true);
        try {
            const [subscriberData, subscriptionData, invoicesData] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/shield-subscriber-data?recordId=${nextId}`),
                axios.get(`${API_BASE_URL}/api/shield-subscription?recordId=${nextId}`),
                axios.get(`${API_BASE_URL}/api/shield-invoices?recordId=${nextId}`)
            ]);

            setSubscriber(subscriberData.data);
            setSubscription(subscriptionData.data);
            setInvoices(invoicesData.data.invoices || []);
            setSelectedSubscriptionId(nextId);
            sessionStorage.setItem('shield_portal_selected_subscriptionId', nextId);
        } catch (error) {
            console.error('Error loading selected subscription:', error);
            alert('Failed to load that subscription. Please try again.');
        } finally {
            setLoading(false);
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
                    <h2 className="text-2xl sm:text-3xl font-bold text-c4p-darker mb-2 break-words leading-tight">
                        Welcome, {subscription?.customer_name || subscriber?.customer_name || 'Shield Subscriber'}!
                    </h2>
                    <p className="text-gray-600">Account: {subscription?.subscription_number || 'N/A'}</p>
                    {subscriptionsForEmail.length > 1 && (
                        <div className="mt-4">
                            <label htmlFor="subscriptionSelect" className="block text-sm font-semibold text-c4p-dark mb-2">
                                Select a subscription
                            </label>
                            <select
                                id="subscriptionSelect"
                                value={selectedSubscriptionId || authRecordId || ''}
                                onChange={handleSubscriptionSelect}
                                className="w-full max-w-[420px] rounded-md py-2 px-3 ring-1 ring-inset ring-gray-300 bg-white text-sm"
                            >
                                {subscriptionsForEmail.map((sub) => (
                                    <option key={sub.subscription_id} value={sub.subscription_id}>
                                        {sub.subscription_number || sub.subscription_id} • {sub.status || 'status'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-xl shadow-lg mb-6 border border-neutral-200">
                    <div className="border-b border-neutral-200">
                        <nav className="flex flex-wrap -mb-px">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold border-b-2 transition-all whitespace-normal leading-tight ${
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
                                    <div className={`relative overflow-hidden rounded-2xl shadow-lg p-6 border ${
                                        subscription?.status === 'non_renewing'
                                            ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300'
                                            : 'bg-gradient-to-br from-white to-neutral-100 border-neutral-200'
                                    }`}>
                                        <div className="relative z-10">
                                            <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                                                subscription?.status === 'non_renewing' ? 'text-amber-800' : 'text-c4p-dark'
                                            }`}>Status</p>
                                            <p className={`text-2xl sm:text-3xl font-black break-words leading-tight ${
                                                subscription?.status === 'non_renewing' ? 'text-amber-900' : 'text-c4p-darker'
                                            }`}>
                                                {subscription?.status === 'non_renewing'
                                                    ? 'Scheduled for Cancellation'
                                                    : subscription?.cf_shipping_status?.toLowerCase() === 'new manual order'
                                                    ? 'Awaiting Shipping'
                                                    : subscription?.cf_shipping_status === 'Shipped'
                                                    ? 'Active'
                                                    : subscription?.cf_shipping_status || 'Active'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative overflow-hidden bg-gradient-to-br from-white to-neutral-100 rounded-2xl shadow-lg p-6 border border-neutral-200">
                                        <div className="relative z-10">
                                            <p className="text-xs font-semibold text-c4p-dark uppercase tracking-wider mb-3">Recurring Cost</p>
                                            <p className="text-2xl sm:text-3xl font-black text-c4p-darker break-words leading-tight">
                                                ${subscription?.amount || '0.00'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`relative overflow-hidden rounded-2xl shadow-lg p-6 border ${
                                        subscription?.status === 'non_renewing'
                                            ? 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-700'
                                            : 'bg-gradient-to-br from-c4p to-c4p-hover border-c4p-dark'
                                    }`}>
                                        <div className="relative z-10">
                                            <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-3">
                                                {subscription?.status === 'non_renewing' ? 'Ends On' : 'Next Billing'}
                                            </p>
                                            <p className="text-2xl sm:text-3xl font-black text-white break-words leading-tight">
                                                {subscription?.status === 'non_renewing' && subscription?.current_term_ends_at
                                                    ? new Date(subscription.current_term_ends_at + 'T00:00:00').toLocaleDateString()
                                                    : subscription?.next_billing_at
                                                    ? new Date(subscription.next_billing_at + 'T00:00:00').toLocaleDateString()
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Information */}
                                {(() => {
                                    // Don't show if status is "New Manual Order"
                                    if (!subscription?.cf_shipping_status || subscription.cf_shipping_status?.toLowerCase() === 'new manual order') {
                                        return null;
                                    }

                                    // Don't show if no shipping date
                                    if (!subscription.cf_shipping_date) {
                                        return null;
                                    }

                                    // Don't show if shipped more than 1 week ago
                                    const shipDate = new Date(subscription.cf_shipping_date);
                                    const oneWeekAgo = new Date();
                                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

                                    if (shipDate < oneWeekAgo) {
                                        return null;
                                    }

                                    return (
                                        <div className="bg-gradient-to-br from-c4p/5 to-c4p/10 border border-c4p/20 rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-c4p-darker mb-4">Shipping Information</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="font-semibold text-c4p-dark">Shipping Status:</p>
                                                    <p className="text-gray-700">
                                                        {subscription.cf_shipping_status === 'Shipped' ? 'Shipped' : subscription.cf_shipping_status}
                                                    </p>
                                                </div>
                                                {subscription.cf_shipping_date && subscription.cf_shipping_status === 'Shipped' && (
                                                    <div>
                                                        <p className="font-semibold text-c4p-dark">Shipped Date:</p>
                                                        <p className="text-gray-700">
                                                            {new Date(subscription.cf_shipping_date).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                )}
                                                {subscription.cf_tracking_number && subscription.cf_shipping_status === 'Shipped' && (
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
                                            </div>
                                        </div>
                                    );
                                })()}

                                {/* Account Information */}
                                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-bold text-c4p-darker">Account Information</h3>
                                        {/* Shipping Address Tooltip - only show if status is "Awaiting Shipping" */}
                                        {subscription?.cf_shipping_status?.toLowerCase() === 'new manual order' && (
                                            <div className="relative group">
                                                <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full cursor-help border border-amber-300">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>Awaiting Shipping</span>
                                                </div>
                                                {/* Tooltip */}
                                                <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                                    <p className="font-semibold mb-2">Shipping Address:</p>
                                                    <p>{subscription?.cf_street || 'N/A'}</p>
                                                    {subscription?.cf_street_2 && <p>{subscription.cf_street_2}</p>}
                                                    <p>
                                                        {subscription?.cf_city || 'N/A'}, {subscription?.cf_state || 'N/A'} {subscription?.cf_zip_code || 'N/A'}
                                                    </p>
                                                    <p>{subscription?.cf_country || 'USA'}</p>
                                                    {/* Arrow pointing up */}
                                                    <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex">
                                            <p className="font-semibold text-c4p-dark min-w-[140px]">Name:</p>
                                            <p className="text-gray-700">{subscription?.customer_name || subscriber?.customer_name || 'N/A'}</p>
                                        </div>
                                        <div className="flex">
                                            <p className="font-semibold text-c4p-dark min-w-[140px]">SIM Card Quantity:</p>
                                            <p className="text-gray-700">{subscription?.cf_sim_card_quantity || 'N/A'}</p>
                                        </div>
                                        {subscription?.cf_device_type && subscription.cf_device_type !== 'N/A' && subscription.cf_device_type !== '' && (
                                            <div className="flex">
                                                <p className="font-semibold text-c4p-dark min-w-[140px]">Device Type:</p>
                                                <p className="text-gray-700">{subscription.cf_device_type}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

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

                                {/* Referral Program */}
                                <div className="bg-gradient-to-br from-c4p/5 to-c4p/10 border border-c4p/20 rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-c4p-darker mb-4">Refer a Friend, Get a Month Free!</h3>
                                    <p className="text-gray-700 mb-4">
                                        Share Shield with friends and family. New customers get 5% off each month when they use your link,
                                        and you will get an email as soon as they sign up.
                                    </p>
                                    <div className="bg-white border border-c4p/30 rounded-lg p-4 mb-4">
                                        <p className="text-sm text-gray-600 mb-2">Your Referral Link:</p>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                            <input
                                                type="text"
                                                readOnly
                                                value={`https://www.computers4people.org/shield?ref=${subscription?.subscription_id || ''}&coupon=REFERRAL5`}
                                                className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm"
                                            />
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(
                                                        `https://www.computers4people.org/shield?ref=${subscription?.subscription_id || ''}&coupon=REFERRAL5`
                                                    );
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
                                            You can cancel your subscription anytime from the Support tab. Your service will remain active until the end of your current billing period.
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
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-8 py-3 bg-gradient-to-r from-c4p to-c4p-hover text-white rounded-lg hover:from-c4p-hover hover:to-c4p-dark transition-all font-semibold shadow-lg hover:shadow-xl"
                                    >
                                        Contact Us
                                    </a>
                                </div>

                                {/* Cancel or Reactivate Subscription */}
                                {subscription?.status === 'non_renewing' ? (
                                    /* Reactivate Subscription */
                                    <div className="bg-white border border-green-200 rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-green-600 mb-4">Reactivate Subscription</h3>
                                        <p className="text-gray-600 mb-4">
                                            Your subscription is scheduled to be cancelled. Want to keep it? Reactivate to continue your service.
                                        </p>
                                        <button
                                            onClick={handleReactivateSubscription}
                                            disabled={reactivateLoading}
                                            className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all font-semibold disabled:opacity-50"
                                        >
                                            {reactivateLoading ? 'Reactivating...' : 'Reactivate Subscription'}
                                        </button>
                                    </div>
                                ) : (
                                    /* Cancel Subscription */
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
                                )}
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
