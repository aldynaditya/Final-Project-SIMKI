import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../../Style/Keuangan/TransaksiSpv.css';
import { fetchTransaksi } from '../../redux/keuangan/indextransaksi/actions';
import { formatDateSlash, formatDateStrip } from "../../utils/dateUtils";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TransaksiKeuangan = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getTransaksi);

    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        if (formData.startDate && formData.endDate) {
            dispatch(fetchTransaksi({
                startDate: formData.startDate,
                endDate: formData.endDate
            }));
        }
    }, [dispatch, formData.startDate, formData.endDate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const BuatLaporan = async () => {
        const doc = new jsPDF();

        doc.setFont("times", "bold");
        doc.setFontSize(12);

        const title = `Laporan Periode ${formatDateStrip(formData.startDate)} hingga ${formatDateStrip(formData.endDate)}`;

        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(title);
        const titleX = (pageWidth - textWidth) / 2;

        doc.text(title, titleX, 10);

        const table = document.querySelector('.tabel_transaksi-keuangan table');
        const canvas = await html2canvas(table);
        const imgData = canvas.toDataURL('image/png');

        const imgWidth = 190; // PDF page width is 210mm
        const pageHeight = 290; // PDF page height is 297mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let position = 20;
    
        if (imgHeight > pageHeight) {
            doc.addImage(imgData, 'PNG', 10, position, imgWidth, pageHeight - position);
            doc.addPage();
            position = 10;
            doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight - (pageHeight - position));
        } else {
            doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        }
        
        doc.save(`Laporan_Transaksi_${formData.startDate}_hingga_${formData.endDate}.pdf`);
    };

    return (
        <div className="transaksi-keuangan-wrapper">
            <div className="transaksi-keuangan-container">
                <div className="content-wrapper-transaksi-keuangan">
                    <div className="header-transaksi-keuangan">
                        <h1 className="text_transaksi-keuangan">Transaksi</h1>
                        <div className="periode-surat">
                            <span className="text-periode-surat">Periode :</span>
                            <input
                                className="kolom-periode-surat"
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                            />
                        </div>
    
                        <div className="hingga-surat">
                            <span className="text-hingga-surat">Hingga :</span>
                            <input
                                className="kolom-hingga-surat"
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    <div className="tabel_transaksi-keuangan">
                        <table id="transaksi-table">
                            <thead>
                                <tr>
                                    <th>No. Faktur</th>
                                    <th>Tanggal</th>
                                    <th>No. EMR</th>
                                    <th>Nama Pasien</th>
                                    <th>Penjamin</th>
                                    <th>Metode Bayar</th>
                                    <th>Total</th>
                                    <th>Petugas</th>
                                </tr>
                            </thead>
                            <tbody>
                            {(!formData.startDate || !formData.endDate) ? (
                                <tr>
                                    <td colSpan="8" className="empty-message">
                                        Tolong masukkan periode untuk menampilkan transaksi.
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="8" className="empty-message">
                                        {error || 'Terjadi kesalahan saat memuat data.'}
                                    </td>
                                </tr>
                            ) : (
                                    data.map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.noInvoice}</td>
                                            <td>{formatDateSlash(row.tanggal)}</td>
                                            <td>{row.noEMR}</td>
                                            <td>{row.namaPasien}</td>
                                            <td>{row.penjamin}</td>
                                            <td>{row.metodeBayar}</td>
                                            <td>{row.total}</td>
                                            <td>{row.petugas}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    <button className="buat-laporan" onClick={BuatLaporan}>Buat Laporan</button>
                </div>
            </div>
        </div>
    );
}  

export default TransaksiKeuangan;
