import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import NavbarPrivate from '../../components/NavbarPrivate';
import FooterPrivate from '../../components/FooterPrivate';
import '../../Style/Resepsionis/KelolaJadwal.css';
import Header from '../../components/Header';

const KelolaJadwal = () => {
    const [rows] = useState(Array.from({ length: 12 }));
    const navigate = useNavigate();

    const TambahJadwal = () => {
        navigate('/jadwal-popup');
    };

    const MenuResepsionis = [
        { name: "Pendaftar Baru", path: "/pendaftar-baru" },
        { name: "Antrian", path: "/antrian" },
        { name: "Pasien", path: "/pasien-resepsionis" },
        { name: "Kelola Jadwal", path: "/kelola-jadwal" }
    ];

    return (
        <div className="kelola-jadwal-container">
            <div className="navbar-kelola-jadwal">
                <NavbarPrivate />
                <Header accountName="Nama Akun Resepsionis" menuItems={MenuResepsionis} />
            </div>
            <div className="content-wrap-kelola-jadwal">
                <div className="content-wrapper-kelola-jadwal">
                    <div className="header-kelola-jadwal">
                        <h1 className="text_kelola-jadwal">Kelola Jadwal</h1>
                        <button className='tombol_tambah-jadwal' onClick={TambahJadwal}>Tambah Jadwal</button>
                    </div>
                    <div className="tabel_kelola-jadwal">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nama Dokter</th>
                                    <th>Poli</th>
                                    <th>Hari</th>
                                    <th>Jam</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((_, index) => (
                                    <tr key={index}>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <FooterPrivate className="footerprivate-kelola-jadwal" />
        </div>
    );
};

export default KelolaJadwal;
