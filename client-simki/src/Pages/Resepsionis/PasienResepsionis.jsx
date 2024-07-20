import React, { useState } from "react";
import NavbarPrivate from '../../components/NavbarPrivate';
import FooterPrivate from '../../components/FooterPrivate';
import '../../Style/Resepsionis/PasienResepsionis.css';
import Header from '../../components/Header';
import SearchBar from "../../components/SearchBar";  // Pastikan nama komponen dan path sesuai

const PasienResepsionis = () => {
    const [rows] = useState(Array.from({ length: 20 }));

    const IdentitasPasien = () => {
        window.open('/identitas-pasien', '_blank');
    };

    const EmrResepsionis = () => {
        window.open('/emr-resepsionis', '_blank');
    };

    const MenuResepsionis = [
        { name: "Pendaftar Baru", path: "/pendaftar-baru" },
        { name: "Antrian", path: "/antrian" },
        { name: "Pasien", path: "/pasien-resepsionis" },
        { name: "Kelola Jadwal", path: "/kelola-jadwal" }
    ];

    return (
        <div className="pasien-resepsionis-wrapper">
            <div className="navbar-header-wrapper">
                <NavbarPrivate />
                <Header accountName="Nama Akun Resepsionis" menuItems={MenuResepsionis} />
            </div>
            <div className="pasien-resepsionis-container">
                <div className="pasien-wrapper">
                    <div className="header-pasien-resepsionis">
                        <h1 className="text_pasien_resepsionis">Pasien</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel_pasien_resepsionis">
                        <table>
                            <thead>
                                <tr>
                                    <th>No. EMR</th>
                                    <th>Nama Pasien</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Jenis Kelamin</th>
                                    <th>Aksi</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((_, index) => (
                                    <tr key={index}>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <button className="identitas-pasien" onClick={IdentitasPasien}>Identitas</button>
                                            <button className="emr-resepsionis" onClick={EmrResepsionis}>EMR</button>
                                        </td>
                                        <td></td>
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

export default PasienResepsionis;
