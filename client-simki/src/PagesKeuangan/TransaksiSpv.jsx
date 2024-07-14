import React, { useState } from "react";
import NavbarPrivate from '../components/NavbarPrivate';
import FooterPrivate from '../components/FooterPrivate';
import './TransaksiSpv.css';
import HeaderKeuangan from './HeaderSpv';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TransaksiKeuangan = () => {
    const [rows] = useState(Array.from({ length: 20 }));

    const BuatLaporan = () => {
        const element = document.querySelector('.tabel_transaksi-keuangan');
        const button = document.querySelector('.buat-laporan');
        button.classList.add('clicked');

        html2canvas(element).then(canvas => {
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

            // Remove the class after some time or after the PDF is generated
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 200);
        });
    };

    return (
        <div className="transaksi-keuangan-wrapper">
            <div className="navbar-header-transaksi-keuangan">
                <NavbarPrivate />
                <HeaderKeuangan />
            </div>
            <div className="transaksi-keuangan-container">
                <div className="content-wrapper-transaksi-keuangan">
                    <div className="header-transaksi-keuangan">
                        <h1 className="text_transaksi-keuangan">Transaksi</h1>
                        <div className='periode-surat'>
                            <span className='text-periode-surat'>Periode :</span>
                            <input type='date' className='kolom-periode-surat'></input>
                        </div>
                        <div className='hingga-surat'>
                            <span className='text-hingga-surat'>Hingga :</span>
                            <input type='date' className='kolom-hingga-surat'></input>
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
                                    <th>Total</th>
                                    <th>Petugas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((_, index) => (
                                    <tr key={index}>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="buat-laporan" onClick={BuatLaporan}>Buat Laporan</button>
                </div>
            </div>
            <FooterPrivate />
        </div>
    );
};

export default TransaksiKeuangan;
