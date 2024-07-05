import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import NavbarPrivate from '../components/NavbarPrivate';
import FooterPrivate from '../components/FooterPrivate';
import '../PagesPerawat/KelolaItem.css';
import HeaderFarmasi from './HeaderFarmasi';
import SearchBar from "../components/SearchBar";  // Pastikan nama komponen dan path sesuai

const KelolaObat = () => {
    const [rows] = useState(Array.from({ length: 20 }));
    const navigate = useNavigate();

    const handleTambahObat = () => {
        navigate('/tambah-obat');
    };

    return (
        <div className="kelola-item-wrapper">
            <div className="navbar-kelola-item">
                <NavbarPrivate />
                <HeaderFarmasi className="header-kelola-item"/>
            </div>
            <div className="kelola-item-container">
                <div className="content-wrapper-kelola-item">
                    <div className="header-kelola-item">
                        <h1 className="text_kelola-item">Stok Obat</h1>
                        <div className="header-kelola-item-action">
                            <button className='tombol_tambahitem' onClick={handleTambahObat}>Tambah Obat</button>
                            <SearchBar />
                        </div>
                    </div>
                    <div className="tabel_kelola-item">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nama Obat</th>
                                    <th>Kode Obat</th>
                                    <th>Harga Satuan</th>
                                    <th>Satuan</th>
                                    <th>Stok</th>
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

export default KelolaObat;
