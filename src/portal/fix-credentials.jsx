import React, { useState } from 'react';

function FixCredentials() {
    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [code, setCode] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        // Restore credentials from localStorage if we came back from OAuth
        const savedClientId = localStorage.getItem('fix_creds_client_id');
        const savedClientSecret = localStorage.getItem('fix_creds_client_secret');
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
            localStorage.removeItem('fix_creds_client_id');
            localStorage.removeItem('fix_creds_client_secret');
        }
    }, []);

    const handleAuthorize = () => {
        if (!clientId) {
            alert('Please enter Client ID first!');
            return;
        }

        // Save credentials to localStorage so we can retrieve them after redirect
        localStorage.setItem('fix_creds_client_id', clientId);
        localStorage.setItem('fix_creds_client_secret', clientSecret);

        // All necessary scopes for Creator and CRM
        const scopes = [
            'ZohoCreator.report.READ',
            'ZohoCreator.report.CREATE',
            'ZohoCreator.report.UPDATE',
            'ZohoCreator.report.DELETE',
            'ZohoCreator.form.CREATE',
            'ZohoCreator.meta.form.READ',
            'ZohoCreator.meta.application.READ',
            'ZohoCreator.dashboard.READ',
            'ZohoCRM.modules.ALL',
            'ZohoCRM.settings.ALL',
            'ZohoCRM.users.ALL',
            'ZohoCRM.org.ALL'
        ].join(',');

        const redirectUri = 'http://computers4people.org/oauth2callback';
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
            const response = await fetch('/api/fix-credentials', {
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
            <h1>Fix Portal Credentials</h1>
            <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>
                Use this to generate a NEW refresh token that matches your existing Client ID and Secret
            </p>

            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
                <h2>Step 1: Copy Credentials from Vercel</h2>
                <p>Go to Vercel → Environment Variables and copy the <strong>full values</strong>:</p>

                <label style={{ display: 'block', marginTop: '15px', marginBottom: '10px', fontWeight: 'bold' }}>
                    ZOHO_CLIENT_ID (paste FULL value):
                </label>
                <input
                    type="text"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    placeholder="Paste full Client ID from Vercel"
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
                    ZOHO_CLIENT_SECRET (paste FULL value):
                </label>
                <input
                    type="password"
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                    placeholder="Paste full Client Secret from Vercel"
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

            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
                <h2>Step 2: Authorize</h2>
                <button
                    onClick={handleAuthorize}
                    disabled={!clientId}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: !clientId ? '#999' : '#2196f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        cursor: !clientId ? 'not-allowed' : 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Authorize with Creator + CRM Scopes
                </button>
                <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                    This will request all necessary scopes for the portal to work
                </p>
            </div>

            {code && (
                <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
                    <h2>Step 3: Generate Matching Refresh Token</h2>
                    <p>Authorization successful! Code received: {code.substring(0, 20)}...</p>
                    <button
                        onClick={handleGenerateToken}
                        disabled={loading || !clientSecret}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: loading || !clientSecret ? '#999' : '#4caf50',
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
                            <h3>Your NEW Refresh Token:</h3>
                            <pre style={{
                                backgroundColor: 'white',
                                padding: '15px',
                                borderRadius: '4px',
                                overflow: 'auto',
                                fontSize: '12px',
                                wordBreak: 'break-all'
                            }}>
                                {result.refresh_token}
                            </pre>
                            <p style={{ color: '#d32f2f', fontWeight: 'bold', marginTop: '15px' }}>
                                ⚠️ Copy this token and update ZOHO_REFRESH_TOKEN in Vercel
                            </p>
                            <p style={{ fontSize: '14px', marginTop: '10px' }}>
                                Go to: Vercel → Environment Variables → Edit ZOHO_REFRESH_TOKEN → Paste → Save
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

export default FixCredentials;
