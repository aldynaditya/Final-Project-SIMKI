import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../Style/Perawat/KelolaItem.css';
import SearchBar from "../../components/SearchBar";  // Pastikan nama komponen dan path sesuai

const KelolaItem = () => {
    const [rows] = useState(Array.from({ length: 20 }));
    const navigate = useNavigate();

    const handleTambahItemPopup = () => {
        navigate('tambah-item-popup');
    };

    return (
        <div className="kelola-item-wrapper">
            <div className="navbar-kelola-item">
            </div>
            <div className="kelola-item-container">
                <div className="content-wrapper-kelola-item">
                    <div className="header-kelola-item">
                        <h1 className="text_kelola-item">Stok Item</h1>
                        <div className="header-kelola-item-action">
                            <button className='tombol_tambahitem' onClick={handleTambahItemPopup}>Tambah Item</button>
                            <SearchBar />
                        </div>
                    </div>
                    <div className="tabel_kelola-item">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nama Item</th>
                                    <th>Kode Item</th>
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
        </div>
    );
};

export default KelolaItem;
