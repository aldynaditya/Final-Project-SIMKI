// src/components/FormatSurat.jsx
import React from 'react';
import SuratSakit from './Sakit';
import SuratRujukan from './Rujukan';

const FormatSurat = React.forwardRef(({ data }, ref) => {
    if (!data) return null;

    const { orderInfo, orderDetails } = data;
    const { jenis_surat } = orderDetails;

    return (
        <div ref={ref}>
            {jenis_surat === 'sakit' ? (
                <SuratSakit orderInfo={orderInfo} orderDetails={orderDetails} />
            ) : (
                <SuratRujukan orderInfo={orderInfo} orderDetails={orderDetails} />
            )}
        </div>
    );
});

export default FormatSurat;