import React, { useState } from "react";
import NavbarPrivate from '../components/NavbarPrivate';  // Pastikan jalurnya benar
import FooterPrivate from '../components/FooterPrivate';  // Pastikan jalurnya benar
import './NotifikasiSpv.css';
import HeaderKeuangan from './HeaderSpv';  // Pastikan jalurnya benar
import SearchBar from '../components/SearchBar';  // Pastikan jalurnya benar

const NotifikasiKeuangan = () => {
    const [rows] = useState(Array.from({ length: 10 }));

    return (
        <div className="notif-keuangan-wrapper">
            <div className="navbar-header-notif-keuangan">
                <NavbarPrivate />
                <HeaderKeuangan />
            </div>
            <div className="notif-keuangan-container">
                <div className="content-wrapper-notif-keuangan">
                    <div className="header-notif-keuangan">
                        <h1 className="text_notif-keuangan">Notifikasi</h1>
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
