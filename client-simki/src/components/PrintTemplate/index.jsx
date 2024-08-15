// PrintTemplate.js
import React, { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import TemplateSuratSakit from '../FormatSurat/Sakit';
import TemplateSuratRujukan from '../FormatSurat/Rujukan';

const PrintTemplate = ({ order, data }) => {
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    useEffect(() => {
        handlePrint();
    }, [handlePrint]);

    return (
        <div style={{ display: 'none' }}>
            {order.jenis_surat === 'rujukan' ? (
                <TemplateSuratRujukan ref={printRef} data={{ ...data, order }} />
            ) : (
                <TemplateSuratSakit ref={printRef} data={{ ...data, order }} />
            )}
        </div>
    );
};

export default PrintTemplate;
