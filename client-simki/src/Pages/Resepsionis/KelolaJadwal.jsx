import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../Style/Resepsionis/KelolaJadwal.css';
import TambahJadwal from './JadwalPopup'; // Import komponen TambahJadwal
import EditJadwal from './EditJadwal'; // Import komponen EditJadwal

const KelolaJadwal = () => {
    const [baris, setBaris] = useState(Array.from({ length: 12 }));
    const [tampilkanPopup, setTampilkanPopup] = useState({ show: false, type: '' }); // State untuk mengontrol visibilitas popup
    const navigate = useNavigate();

    const handleTambahJadwal = () => {
        setTampilkanPopup({ show: true, type: 'tambah' });
    };

    const handleTutupPopup = () => {
        setTampilkanPopup({ show: false, type: '' });
    };

    const hapusJadwal = (index) => {
        setBaris(baris.filter((_, i) => i !== index));
    };

    const UbahJadwal = () => {
        setTampilkanPopup({ show: true, type: 'edit' });
    };

    return (
        <div className="kelola-jadwal-container">
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
                                    <th className="aksi-column">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {baris.map((_, index) => (
                                    <tr key={index}>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <button className="ubah-jadwal" onClick={UbahJadwal}>Ubah</button>
                                            <div className="hapus-jadwal" onClick={() => hapusJadwal(index)}>
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
            {tampilkanPopup.show && (
                tampilkanPopup.type === 'tambah' ? (
                    <TambahJadwal onClose={handleTutupPopup} title="Tambah Jadwal" />
                ) : (
                    <EditJadwal onClose={handleTutupPopup} title="Edit Jadwal" />
                )
            )}
        </div>
    );
};

export default KelolaJadwal;
