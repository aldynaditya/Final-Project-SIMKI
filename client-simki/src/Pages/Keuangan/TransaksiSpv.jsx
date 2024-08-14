import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../../Style/Keuangan/TransaksiSpv.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { fetchTransaksi } from '../../redux/keuangan/indextransaksi/actions';

const TransaksiKeuangan = () => {
    const dispatch = useDispatch();
    const { data: rows, loading, error } = useSelector(state => state.transaksi);

    // Initialize state for periodeSurat and hinggaSurat
    const [periodeSurat, setPeriodeSurat] = useState('');
    const [hinggaSurat, setHinggaSurat] = useState('');

    useEffect(() => {
        dispatch(fetchTransaksi());
    }, [dispatch]);

    const BuatLaporan = async () => {
        const element = document.querySelector('.tabel_transaksi-keuangan');
        const button = document.querySelector('.buat-laporan');

        if (!element || !button) {
            console.error("Element or button not found!");
            return;
        }

        button.classList.add('clicked');

        try {
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a4'); // Landscape A4

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = pdfWidth - 40; // 20 mm margin on each side
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            const xOffset = (pdfWidth - imgWidth) / 2;
            const yOffset = (pdfHeight - imgHeight) / 2;

            pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
            pdf.save("laporan_transaksi.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 200);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="transaksi-keuangan-wrapper">
            <div className="transaksi-keuangan-container">
                <div className="content-wrapper-transaksi-keuangan">
                    <div className="header-transaksi-keuangan">
                        <h1 className="text_transaksi-keuangan">Transaksi</h1>
                        <div className="periode-surat">
                            <span className="text-periode-surat">Periode :</span>
                            <input
                                type="date"
                                value={periodeSurat}
                                onChange={(e) => setPeriodeSurat(e.target.value)}
                                className="kolom-periode-surat"
                            />
                        </div>

                        <div className="hingga-surat">
                            <span className="text-hingga-surat">Hingga :</span>
                            <input
                                type="date"
                                value={hinggaSurat}
                                onChange={(e) => setHinggaSurat(e.target.value)}
                                className="kolom-hingga-surat"
                            />
                        </div>
                    </div>
                    <div className="tabel_transaksi-keuangan">
                        <table>
                            <thead>
                                <tr>
                                    <th>No. Faktur</th>
                                    <th>Tanggal</th>
                                    <th>No. EMR</th>
                                    <th>Nama Pasien</th>
                                    <th>Penjamin</th>
                                    <th>Metode Bayar</th>
                                    <th>Total Jasa</th>
                                    <th>Total</th>
                                    <th>Petugas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={row.id || index}>
                                        <td>{row.noFaktur}</td>
                                        <td>{row.tanggal}</td>
                                        <td>{row.noEMR}</td>
                                        <td>{row.nama_lengkap}</td>
                                        <td>{row.penjamin}</td>
                                        <td>{row.metode_bayar}</td>
                                        <td>{row.total_order}</td>
                                        <td>{row.total}</td>
                                        <td>{row.petugas}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="buat-laporan" onClick={BuatLaporan}>Buat Laporan</button>
                </div>
            </div>
        </div>
    );
};

export default TransaksiKeuangan;
