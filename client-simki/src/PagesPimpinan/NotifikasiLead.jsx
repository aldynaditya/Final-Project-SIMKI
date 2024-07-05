import React, { useState } from "react";
import NavbarPrivate from '../components/NavbarPrivate';  // Pastikan jalurnya benar
import FooterPrivate from '../components/FooterPrivate';  // Pastikan jalurnya benar
import './NotifikasiLead.css';
import HeaderPimpinan from './HeaderLead';  // Pastikan jalurnya benar
import SearchBar from '../components/SearchBar';  // Pastikan jalurnya benar

const NotifikasiPimpinan = () => {
    const [rows] = useState(Array.from({ length: 10 }));

    return (
        <div className="notif-pimpinan-wrapper">
            <div className="navbar-header-notif-pimpinan">
                <NavbarPrivate />
                <HeaderPimpinan />
            </div>
            <div className="notif-pimpinan-container">
                <div className="content-wrapper-notif-pimpinan">
                    <div className="header-notif-pimpinan">
                        <h1 className="text_notif-pimpinan">Notifikasi</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel_notif-pimpinan">
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
                                        <td><div className="ket_terima">Terima</div></td>
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

export default NotifikasiPimpinan;
