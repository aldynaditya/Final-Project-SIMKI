import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';  // Pastikan useNavigate diimpor
import NavbarPrivate from '../../components/NavbarPrivate';  // Pastikan jalurnya benar
import FooterPrivate from '../../components/FooterPrivate';  // Pastikan jalurnya benar
import '../../Style/Keuangan/NotifikasiSpv.css';
import Header from '../../components/Header';  // Pastikan jalurnya benar
import SearchBar from '../../components/SearchBar';  // Pastikan jalurnya benar

const NotifikasiKeuangan = () => {
    const [rows] = useState(Array.from({ length: 10 }));
    const navigate = useNavigate();

    const UnggahLaporan = () => {
        navigate('/laporan-popup');
    };

    const MenuKeuangan = [
        { name: "Transaksi", path: "/transaksi-keuangan" },
        { name: "Notifikasi", path: "/notifikasi-keuangan" }
    ];

    return (
        <div className="notif-keuangan-wrapper">
            <div className="navbar-header-notif-keuangan">
                <NavbarPrivate />
                <Header accountName="Nama Akun SPV Keuangan" menuItems={MenuKeuangan} />
            </div>
            <div className="notif-keuangan-container">
                <div className="content-wrapper-notif-keuangan">
                    <div className="header-notif-keuangan">
                        <h1 className="text_notif-keuangan">Notifikasi</h1>
                        <button className='upload-laporan' onClick={UnggahLaporan}>Unggah Laporan</button>
                        <SearchBar />
                    </div>
                    <div className="tabel_notif-keuangan">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>No. Laporan</th>
                                    <th>Periode</th>
                                    <th>Keterangan</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
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
                                        <td><div className="ket_cetak">Cetak</div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <FooterPrivate />
        </div>
    );
};

export default NotifikasiKeuangan;
