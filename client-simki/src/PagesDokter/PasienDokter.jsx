import React, { useState } from "react";
import NavbarPrivate from '../components/NavbarPrivate';
import FooterPrivate from '../components/FooterPrivate';
import '../PagesResepsionis/PasienResepsionis.css';
import HeaderDokter from './HeaderDokter';
import SearchBar from "../components/SearchBar"; 
import './PasienDokter.css'; 
import { useNavigate } from 'react-router-dom';

const PasienDokter= () => {
    const [rows] = useState(Array.from({ length: 20 }));
    const navigate = useNavigate();

    const EmrDokter = () => {
        navigate('/emr-dokter');
    };

    return (
        <div className="pasien-resepsionis-wrapper">
            <div className="navbar-header-wrapper">
                <NavbarPrivate />
                <HeaderDokter />
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
                                            <button className="emr-dokter" onClick={EmrDokter}>EMR</button>
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

export default PasienDokter;
