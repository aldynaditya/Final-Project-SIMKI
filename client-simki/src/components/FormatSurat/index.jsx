// src/components/FormatSurat.jsx
import React from 'react';
import SuratSakit from './Sakit';
import SuratRujukan from './Rujukan';

const FormatSurat = React.forwardRef(({ data }, ref) => {
    if (!data) return null;

    const { jenis_surat } = data;

    return (
        <div ref={ref}>
            {jenis_surat === 'sakit' ? <SuratSakit data={data} /> : <SuratRujukan data={data} />}
        </div>
    );
});

export default FormatSurat;
