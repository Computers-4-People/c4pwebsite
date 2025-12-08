import React from 'react';
import CertificateHeader from './CertificateHeader';
import CertificateFooter from './CertificateFooter';
import ErasureCertificate from './ErasureCertificate';
import NoHDDCertificate from './NoHDDCertificate';
import DestroyedCertificate from './DestroyedCertificate';
import './certificate.css';

export default function Certificate({ data }) {
    const { certificateType } = data;

    return (
        <div className="certificate-container">
            <CertificateHeader data={data} />

            {/* Render appropriate certificate type */}
            {certificateType === 'erasure' && <ErasureCertificate data={data} />}
            {certificateType === 'no_hdd' && <NoHDDCertificate data={data} />}
            {certificateType === 'destroyed' && <DestroyedCertificate data={data} />}

            <CertificateFooter data={data} />
        </div>
    );
}
