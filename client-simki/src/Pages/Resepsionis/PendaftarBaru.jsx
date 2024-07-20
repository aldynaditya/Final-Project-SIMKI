import React, { useState } from "react";
import NavbarPrivate from '../../components/NavbarPrivate';
import FooterPrivate from '../../components/FooterPrivate';
import '../../Style/Resepsionis/PendaftarBaru.css';
import Header from '../../components/Header';
import SearchBar from "../../components/SearchBar"; 

const PendaftarBaru = () => {
    const [rows] = useState(Array.from({ length: 20 }));

    const MenuResepsionis = [
        { name: "Pendaftar Baru", path: "/pendaftar-baru" },
        { name: "Antrian", path: "/antrian" },
        { name: "Pasien", path: "/pasien-resepsionis" },
        { name: "Kelola Jadwal", path: "/kelola-jadwal" }
    ];

    return (
        <div className="pendaftar-baru-wrapper">
            <div className="navbar-header-pendaftar">
                <NavbarPrivate />
                <Header accountName="Nama Akun Resepsionis" menuItems={MenuResepsionis} />
            </div>
            <div className="pendaftar-baru-container">
                <div className="content-wrapper">
                    <div className="header-pendaftar-baru">
                        <h1 className="text_pendaftar">Pendaftar Baru</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel_pendaftar_baru">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>NIK</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Jenis Kelamin</th>
                                    <th>Alamat</th>
                                    <th>Email</th>
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
                                        <td></td>
                                        <td><div className="ket_aksi">Aksi</div></td>
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

export default PendaftarBaru;
