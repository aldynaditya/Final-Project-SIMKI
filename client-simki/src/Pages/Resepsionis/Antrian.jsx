import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuatJanjiPopup from './BuatJanjiPopup';
import UpdateStatus from './AksiPopup';
import '../../Style/Resepsionis/Antrian.css';
import SearchBar from "../../components/SearchBar";
import { fetchAntrian } from '../../redux/resepsionis/antrian/actions';

const Antrian = () => {
    const dispatch = useDispatch();
    const { data: rows, loading, error } = useSelector(state => state.antrian);

    const [showJanjiPopup, setShowJanjiPopup] = useState(false);
    const [showAksiPopup, setShowAksiPopup] = useState(false);

    useEffect(() => {
        dispatch(fetchAntrian());
    }, [dispatch]);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="page-antrian-container">
            <div className="content-wrap-antrian">
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
                                        <th>NIK</th>
                                        <th>Dokter</th>
                                        <th>Poli</th>
                                        <th>Tanggal</th>
                                        <th>Jam</th>
                                        <th>Penjamin</th>
                                        <th className>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.nama_lengkap}</td>
                                            <td>{row.dokter}</td>
                                            <td>{row.poli}</td>
                                            <td>{row.tanggal}</td>
                                            <td>{row.jam}</td>
                                            <td>{row.penjamin}</td>
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
