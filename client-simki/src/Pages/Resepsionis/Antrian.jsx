import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../Style/Resepsionis/Antrian.css';
import Header from '../../components/Header';
import SearchBar from "../../components/SearchBar";

const Antrian = () => {
    const [rows] = useState(Array.from({ length: 20 }));
    const navigate = useNavigate();

    const handleBuatJanjiPopup = () => {
        navigate('/buatjanji-popup');
    };

    const MenuResepsionis = [
        { name: "Pendaftar Baru", path: "/pendaftar-baru" },
        { name: "Antrian", path: "/antrian" },
        { name: "Pasien", path: "/pasien-resepsionis" },
        { name: "Kelola Jadwal", path: "/kelola-jadwal" }
    ];

    return (
        <div className="page-antrian-container">
            <div className="content-wrap-antrian">
                <div className="navbar-antrian">
                    <Header accountName="Nama Akun Resepsionis" menuItems={MenuResepsionis} />
                </div>
                <div className="antrian-container">
                    <div className="content-wrapper-antrian">
                        <div className="header-antrian">
                            <h1 className="text_antrian">Antrian</h1>
                            <div className="header-antrian-action">
                                <button className='tombol_buatjanji' onClick={handleBuatJanjiPopup}>Buat Janji</button>
                                <SearchBar />
                            </div>
                        </div>
                        <div className="tabel_antrian">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Dokter</th>
                                        <th>Poli</th>
                                        <th>Tanggal</th>
                                        <th>Jam</th>
                                        <th>Penjamin</th>
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
            </div>
        </div>
    );
};

export default Antrian;
