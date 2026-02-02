import React, { useState } from 'react';

function GenerateBillingToken() {
    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [code, setCode] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        // Restore credentials from localStorage if we came back from OAuth
        const savedClientId = localStorage.getItem('billing_creds_client_id');
        const savedClientSecret = localStorage.getItem('billing_creds_client_secret');
        if (savedClientId) {
            setClientId(savedClientId);
        }
        if (savedClientSecret) {
            setClientSecret(savedClientSecret);
        }

        // Check for code in URL
        const urlParams = new URLSearchParams(window.location.search);
        const codeFromUrl = urlParams.get('code');
        if (codeFromUrl) {
            setCode(codeFromUrl);
            // Clear localStorage after successful OAuth
            localStorage.removeItem('billing_creds_client_id');
            localStorage.removeItem('billing_creds_client_secret');
        }
    }, []);

    const handleAuthorize = () => {
        if (!clientId) {
            alert('Please enter Client ID first!');
            return;
        }

        // Save credentials to localStorage so we can retrieve them after redirect
        localStorage.setItem('billing_creds_client_id', clientId);
        localStorage.setItem('billing_creds_client_secret', clientSecret);

        // Only Billing scope needed
        const scopes = 'ZohoSubscriptions.fullaccess.all';

        const redirectUri = 'https://computers4people.org/generate-billing-token';
        const authUrl = `https://accounts.zoho.com/oauth/v2/auth?scope=${encodeURIComponent(scopes)}&client_id=${clientId}&response_type=code&access_type=offline&redirect_uri=${encodeURIComponent(redirectUri)}`;

        window.location.href = authUrl;
    };

    const handleGenerateToken = async () => {
        if (!code || !clientId || !clientSecret) {
            alert('Please fill in all fields!');
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/generate-billing-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code, clientId, clientSecret })
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h1>Generate Billing API Refresh Token</h1>
            <p style={{ color: '#2196f3', fontWeight: 'bold' }}>
                This generates credentials for the fulfillment portal (Zoho Billing API only)
            </p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                These credentials are separate from your portal credentials and only access Zoho Billing
            </p>

            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
                <h2>Step 1: Create Billing OAuth Client (if needed)</h2>
                <p>If you haven't already, create a new OAuth client in Zoho:</p>
                <ol style={{ marginLeft: '20px' }}>
                    <li>Go to: <a href="https://api-console.zoho.com/" target="_blank" rel="noopener noreferrer">https://api-console.zoho.com/</a></li>
                    <li>Click "Add Client" → Choose "Server-based Applications"</li>
                    <li>Client Name: <strong>Shield Fulfillment</strong></li>
                    <li>Homepage URL: <strong>https://computers4people.org</strong></li>
                    <li>Authorized Redirect URI: <strong>https://computers4people.org/generate-billing-token</strong></li>
                    <li>Click "Create" and copy the Client ID and Secret</li>
                </ol>
            </div>

            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
                <h2>Step 2: Enter OAuth Client Credentials</h2>

                <label style={{ display: 'block', marginTop: '15px', marginBottom: '10px', fontWeight: 'bold' }}>
                    Client ID:
                </label>
                <input
                    type="text"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    placeholder="Paste Billing OAuth Client ID"
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        marginBottom: '15px'
                    }}
                />

                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                    Client Secret:
                </label>
                <input
                    type="password"
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                    placeholder="Paste Billing OAuth Client Secret"
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontFamily: 'monospace'
                    }}
                />
            </div>

            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
                <h2>Step 3: Authorize Billing Access</h2>
                <button
                    onClick={handleAuthorize}
                    disabled={!clientId}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: !clientId ? '#999' : '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        cursor: !clientId ? 'not-allowed' : 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Authorize Zoho Billing Access
                </button>
                <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                    Scope: ZohoSubscriptions.fullaccess.all
                </p>
            </div>

            {code && (
                <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#e1f5fe', borderRadius: '8px' }}>
                    <h2>Step 4: Generate Refresh Token</h2>
                    <p>Authorization successful! Code: {code.substring(0, 20)}...</p>
                    <button
                        onClick={handleGenerateToken}
                        disabled={loading || !clientSecret}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: loading || !clientSecret ? '#999' : '#2196f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: loading || !clientSecret ? 'not-allowed' : 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        {loading ? 'Generating...' : 'Generate Refresh Token'}
                    </button>
                </div>
            )}

            {result && (
                <div style={{
                    padding: '20px',
                    backgroundColor: result.success ? '#c8e6c9' : '#ffcdd2',
                    borderRadius: '8px',
                    marginTop: '20px'
                }}>
                    <h2>{result.success ? '✓ Success!' : '✗ Error'}</h2>

                    {result.success && result.refresh_token && (
                        <div>
                            <h3>Add These to Vercel Environment Variables:</h3>

                            <p style={{ fontWeight: 'bold', marginTop: '15px' }}>ZOHO_BILLING_CLIENT_ID:</p>
                            <pre style={{
                                backgroundColor: 'white',
                                padding: '10px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                wordBreak: 'break-all'
                            }}>
                                {clientId}
                            </pre>

                            <p style={{ fontWeight: 'bold', marginTop: '15px' }}>ZOHO_BILLING_CLIENT_SECRET:</p>
                            <pre style={{
                                backgroundColor: 'white',
                                padding: '10px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                wordBreak: 'break-all'
                            }}>
                                {clientSecret}
                            </pre>

                            <p style={{ fontWeight: 'bold', marginTop: '15px' }}>ZOHO_BILLING_REFRESH_TOKEN:</p>
                            <pre style={{
                                backgroundColor: 'white',
                                padding: '10px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                wordBreak: 'break-all'
                            }}>
                                {result.refresh_token}
                            </pre>

                            <p style={{ color: '#d32f2f', fontWeight: 'bold', marginTop: '20px' }}>
                                ⚠️ Add all three values to Vercel → Environment Variables → Save → Redeploy
                            </p>
                        </div>
                    )}

                    <details style={{ marginTop: '15px' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Full Response</summary>
                        <pre style={{
                            backgroundColor: 'white',
                            padding: '15px',
                            borderRadius: '4px',
                            overflow: 'auto',
                            fontSize: '12px',
                            marginTop: '10px'
                        }}>
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </details>
                </div>
            )}
        </div>
    );
}

export default GenerateBillingToken;
