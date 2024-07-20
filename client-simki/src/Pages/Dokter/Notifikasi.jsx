import React, { useState } from "react";
import NavbarPrivate from '../../components/NavbarPrivate';
import FooterPrivate from '../../components/FooterPrivate';
import '../../Style/Dokter/Notifikasi.css';
import Header from '../../components/Header';
import SearchBar from "../../components/SearchBar";

const Notifikasi = () => {
    const [rows] = useState(Array.from({ length: 20 }));

    const Menudokter = [
        { name: "Jadwal Dokter", path: "/schedule-dokter" },
        { name: "Pasien", path: "/pasien-dokter" },
        { name: "Notifikasi", path: "/notifikasi-dokter" }
      ];

    return (
        <div className="notifikasi-wrapper">
            <div className="navbar-header-notifikasi">
                <NavbarPrivate />
                <Header accountName="Nama Akun Dokter" menuItems={Menudokter} />
            </div>
            <div className="notifikasi-container">
                <div className="content-wrapper-notifikasi">
                    <div className="header-notifikasi">
                        <h1 className="text_notifikasi">Notifikasi</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel_notifikasi">
                        <table>
                            <thead>
                                <tr>
                                    <th>No EMR</th>
                                    <th>Nama Pasien</th>
                                    <th>Keterangan</th>
                                    <th>Tanggal</th>
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
                                        <td><div className="ket_aksi">Terima</div></td>
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

export default Notifikasi;
