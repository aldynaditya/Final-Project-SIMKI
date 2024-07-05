import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import NavbarPrivate from '../components/NavbarPrivate';
import FooterPrivate from '../components/FooterPrivate';
import './Antrian.css';
import HeaderRsp from './HeaderRsp';
import SearchBar from "../components/SearchBar";

const Antrian = () => {
    const [rows] = useState(Array.from({ length: 20 }));
    const navigate = useNavigate();

    const handleBuatJanjiPopup = () => {
        navigate('/buatjanji-popup');
    };

    return (
        <div className="page-container">
            <div className="content-wrap">
                <div className="navbar-antrian">
                    <NavbarPrivate />
                    <HeaderRsp className="header-antrian"/>
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
            <FooterPrivate />
        </div>
    );
};

export default Antrian;
