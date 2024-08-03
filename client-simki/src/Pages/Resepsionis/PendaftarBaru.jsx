import React, { useState } from "react";
import '../../Style/Resepsionis/PendaftarBaru.css';
import PendaftarPopup from './PendaftarPopup';
import SearchBar from "../../components/SearchBar";

const PendaftarBaru = () => {
    const [rows, setRows] = useState(Array.from({ length: 20 }, (_, index) => index));
    const [showPopup, setShowPopup] = useState(false);

    const HapusPendaftar = (index) => {
        setRows(rows.filter((_, i) => i !== index));
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="pendaftar-baru-wrapper">
            <div className="navbar-header-pendaftar">
                {/* Konten Navbar jika ada */}
            </div>
            <div className="pendaftar-baru-container">
                <div className="content-wrapper">
                    <div className="header-pendaftar-baru">
                        <h1 className="text_pendaftar">Pendaftar Baru</h1>
                        <div className="header-pendaftar-action">
                            <button className='tambah_pendaftar' onClick={handleOpenPopup}>Tambah</button>
                            <SearchBar />
                        </div>
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
                                {rows.map((row, index) => (
                                    <tr key={index}>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <div className="hapus-pendaftar" onClick={() => HapusPendaftar(index)}>
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
            {showPopup && <PendaftarPopup onClose={handleClosePopup} />}
        </div>
    );
};

export default PendaftarBaru;
