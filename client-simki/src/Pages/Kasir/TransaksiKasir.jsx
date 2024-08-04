import React, { useState } from "react";
import '../../Style/Kasir/TransaksiKasir.css';
import SearchBar from '../../components/SearchBar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DetailFaktur from './DetailFaktur';

const TransaksiKasir = () => {
    const [rows] = useState(Array.from({ length: 20 }));
    const [isDetailFakturVisible, setIsDetailFakturVisible] = useState(false);

    const handleDetailFakturOpen = () => {
        setIsDetailFakturVisible(true);
    };

    const handleDetailFakturClose = () => {
        setIsDetailFakturVisible(false);
    };

    const CetakTransaksi = (index) => {
        const element = document.getElementById(`row-${index}`);
        const cloneTable = document.createElement('table');
        const cloneThead = document.querySelector('.tabel_transaksi thead').cloneNode(true);
        const cloneRow = element.cloneNode(true);

        cloneThead.querySelectorAll('th')[9].remove();
        cloneRow.querySelectorAll('td')[9].remove();

        cloneTable.appendChild(cloneThead);
        cloneTable.appendChild(cloneRow);

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
            const pdf = new jsPDF('landscape', 'mm', [215, 40]);
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save("struk_transaksi.pdf");
        });
    };

    return (
        <div className="transaksi-wrapper">
            <div className="navbar-header-transaksi"></div>
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
                                            <button className="detail-faktur" onClick={handleDetailFakturOpen}>Detail</button>
                                            <button className="cetak-transaksi" onClick={() => CetakTransaksi(index)}>Cetak</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isDetailFakturVisible && <DetailFaktur onClose={handleDetailFakturClose} />}
        </div>
    );
};

export default TransaksiKasir;
