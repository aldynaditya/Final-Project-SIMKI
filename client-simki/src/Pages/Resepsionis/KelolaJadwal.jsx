import React, { useState } from "react";
import '../../Style/Resepsionis/KelolaJadwal.css';
import TambahJadwal from './JadwalPopup'; // Import TambahJadwal component

const KelolaJadwal = () => {
    const [rows] = useState(Array.from({ length: 12 }));
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

    const handleTambahJadwal = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="kelola-jadwal-container">
            <div className="navbar-kelola-jadwal">
            </div>
            <div className="content-wrap-kelola-jadwal">
                <div className="content-wrapper-kelola-jadwal">
                    <div className="header-kelola-jadwal">
                        <h1 className="text_kelola-jadwal">Kelola Jadwal</h1>
                        <button className='tombol_tambah-jadwal' onClick={handleTambahJadwal}>Tambah Jadwal</button>
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
            {showPopup && <TambahJadwal onClose={handleClosePopup} />} {/* Conditionally render the popup */}
        </div>
    );
};

export default KelolaJadwal;
