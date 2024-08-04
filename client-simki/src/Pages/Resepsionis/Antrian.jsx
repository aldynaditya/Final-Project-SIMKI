import React, { useState } from "react";
import BuatJanjiPopup from './BuatJanjiPopup';
import UpdateStatus from './AksiPopup';
import '../../Style/Resepsionis/Antrian.css';
import SearchBar from "../../components/SearchBar";

const Antrian = () => {
    const [rows] = useState(Array.from({ length: 20 }));
    const [showJanjiPopup, setShowJanjiPopup] = useState(false);
    const [showAksiPopup, setShowAksiPopup] = useState(false);

    const handleOpenJanjiPopup = () => {
        setShowJanjiPopup(true);
    };

    const handleCloseJanjiPopup = () => {
        setShowJanjiPopup(false);
    };

    const handleOpenAksiPopup = () => {
        setShowAksiPopup(true);
    };

    const handleCloseAksiPopup = () => {
        setShowAksiPopup(false);
    };

    const IdentitasPasien = () => {
        window.open('identitas-pasien', '_blank');
    };

    return (
        <div className="page-antrian-container">
            <div className="content-wrap-antrian">
                <div className="navbar-antrian">
                </div>
                <div className="antrian-container">
                    <div className="content-wrapper-antrian">
                        <div className="header-antrian">
                            <h1 className="text_antrian">Antrian</h1>
                            <div className="header-antrian-action">
                                <button className='tombol_buatjanji' onClick={handleOpenJanjiPopup}>Buat Janji</button>
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
                                            <td>
                                                <button className="lihat-identitas" onClick={IdentitasPasien}>Lihat</button>
                                                <button className="aksi-antrian" onClick={handleOpenAksiPopup}>Aksi</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {showJanjiPopup && <BuatJanjiPopup onClose={handleCloseJanjiPopup} />}
            {showAksiPopup && <UpdateStatus onClose={handleCloseAksiPopup} />}
        </div>
    );
};

export default Antrian;
