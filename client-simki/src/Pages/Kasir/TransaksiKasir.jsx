import React, { useState } from "react";
import '../../Style/Kasir/TransaksiKasir.css';
import HeaderKasir from './HeaderKasir';
import SearchBar from '../../components/SearchBar'; // Corrected import statement
import { useNavigate } from 'react-router-dom'; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TransaksiKasir = () => {
    const [rows] = useState(Array.from({ length: 20 }));
    const navigate = useNavigate();

    const DetailFaktur = () => {
        navigate('/detail-faktur');
    };

    const CetakTransaksi = (index) => {
        const element = document.getElementById(`row-${index}`);
        const cloneTable = document.createElement('table');
        const cloneThead = document.querySelector('.tabel_transaksi thead').cloneNode(true);
        const cloneRow = element.cloneNode(true);

        // Remove action column from cloned header and row
        cloneThead.querySelectorAll('th')[9].remove();
        cloneRow.querySelectorAll('td')[9].remove();

        // Append header and row to the cloned table
        cloneTable.appendChild(cloneThead);
        cloneTable.appendChild(cloneRow);

        // Style adjustments for better readability in PDF
        cloneTable.style.fontSize = '12px';
        cloneTable.style.borderCollapse = 'collapse';
        cloneTable.querySelectorAll('th, td').forEach(cell => {
            cell.style.padding = '4px';
            cell.style.border = '1px solid #ddd';
        });

        document.body.appendChild(cloneTable);

        html2canvas(cloneTable).then(canvas => {
            document.body.removeChild(cloneTable);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', [215, 40]); // Set size to 215x75 mm
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save("struk_transaksi.pdf");
        });
    };

    return (
        <div className="transaksi-wrapper">
            <div className="navbar-header-transaksi">
                <HeaderKasir />
            </div>
            <div className="transaksi-container">
                <div className="content-wrapper-transaksi">
                    <div className="header-transaksi">
                        <h1 className="text_transaksi">Transaksi</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel_transaksi">
                        <table>
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
                                    <th>Status</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((_, index) => (
                                    <tr key={index} id={`row-${index}`}>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="detail-faktur-cell">
                                            <button className="detail-faktur" onClick={DetailFaktur}>Detail Faktur</button>
                                            <button className="cetak-transaksi" onClick={() => CetakTransaksi(index)}>Cetak</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransaksiKasir;
