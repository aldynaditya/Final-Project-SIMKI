import React, { useState } from "react";
import BuatJanjiPopup from './BuatJanjiPopup'; // Pastikan jalur impor benar
import '../../Style/Resepsionis/Antrian.css';
import SearchBar from "../../components/SearchBar";

const Antrian = () => {
    const [rows] = useState(Array.from({ length: 20 }));
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
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
                                <button className='tombol_buatjanji' onClick={handleOpenPopup}>Buat Janji</button>
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
            {showPopup && <BuatJanjiPopup onClose={handleClosePopup} />}
        </div>
    );
};

export default Antrian;
