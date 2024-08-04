import React, { useState } from "react";
import '../../Style/Perawat/KelolaItem.css';
import SearchBar from "../../components/SearchBar";
import TambahObat from "./TambahObat";
import EditObat from "./EditObat";

const KelolaObat = () => {
    const [rows, setRows] = useState(Array.from({ length: 20 }));
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleTambahObat = () => {
        setIsPopupVisible(true);
        setIsEditing(false);
    };

    const handleUbahObat = () => {
        setIsPopupVisible(true);
        setIsEditing(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const hapusObat = (index) => {
        setRows(rows.filter((_, i) => i !== index));
    };

    return (
        <div className="kelola-item-wrapper">
            <div className="navbar-kelola-item"></div>
            <div className={`kelola-item-container ${isPopupVisible ? 'overlay' : ''}`}>
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
                                        <td>
                                            <button className="ubah-jadwal" onClick={handleUbahObat}>Ubah</button>
                                            <div className="hapus-jadwal" onClick={() => hapusObat(index)}>
                                                Hapus
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isPopupVisible && (isEditing ? <EditObat onClose={handleClosePopup} /> : <TambahObat onClose={handleClosePopup} />)}
        </div>
    );
};

export default KelolaObat;
