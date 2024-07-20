import React, { useState } from "react";
import NavbarPrivate from '../../components/NavbarPrivate';
import FooterPrivate from '../../components/FooterPrivate';
import '../../Style/Resepsionis/PasienResepsionis.css';
import Header from '../../components/Header';
import SearchBar from "../../components/SearchBar"; 
import '../../Style/Perawat/PasienPerawat.css'; 
import { useNavigate } from 'react-router-dom';

const PasienPerawat= () => {
    const [rows] = useState(Array.from({ length: 20 }));
    const navigate = useNavigate();

    const EmrPerawat = () => {
        navigate('/emr-perawat');
    };

    const Menuperawat = [
        { name: "Jadwal perawat", path: "/jadwal-perawat" },
        { name: "Pasien", path: "/pasien-perawat" },
        { name: "Kelola Item", path: "/kelola-item" }
      ];

    return (
        <div className="pasien-resepsionis-wrapper">
            <div className="navbar-header-wrapper">
                <NavbarPrivate />
                <Header accountName="Nama Akun Perawat" menuItems={Menuperawat} />
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
                                            <button className="emr-perawat" onClick={EmrPerawat}>EMR</button>
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

export default PasienPerawat;
