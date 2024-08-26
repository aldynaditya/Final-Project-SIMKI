import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AksiPopUp from './AksiPopup';
import '../../Style/Resepsionis/Antrian.css';
import { fetchAppointment } from '../../redux/resepsionis/queue/actions'; 
import { formatDateSlash } from '../../utils/dateUtils';

const JanjiMasuk = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.antrian); 

    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [showAksiPopup, setShowAksiPopup] = useState(false);

    useEffect(() => {
        dispatch(fetchAppointment()); 
    }, [dispatch]);

    const handleOpenAksiPopup = (id) => {
        setShowAksiPopup(true);
        setSelectedAppointmentId(id)
    };

    const handleCloseAksiPopup = () => {
        setShowAksiPopup(false);
    };

    const handleAksiSuccess = () => {
        dispatch(fetchAppointment());
    };

    const IdentitasPasien = (id) => {
        window.open(`/resepsionis/identitas-pasien/${id}`, '_blank');
    };

    return (
        <div className="page-antrian-container">
            <div className="content-wrap-antrian">
                <div className="antrian-container">
                    <div className="content-wrapper-antrian">
                        <div className="header-antrian">
                            <h1 className="text_antrian">Janji Masuk</h1>
                            <div className="header-antrian-action">
                            </div>
                        </div>
                        <div className="tabel_antrian">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nama Pasien</th>
                                        <th>Dokter</th>
                                        <th>Poli</th>
                                        <th>Tanggal</th>
                                        <th>Jam</th>
                                        <th>Penjamin</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="empty-message">
                                                Tidak ada janji masuk
                                            </td>
                                        </tr>
                                    ) : (
                                        data.map((row) => (
                                            <tr key={row.id}>
                                                <td>{row.nama_lengkap}</td>
                                                <td>{row.nama_dokter}</td>
                                                <td>{row.poli}</td>
                                                <td>{formatDateSlash(row.tanggal)}</td>
                                                <td>{row.jam}</td>
                                                <td>{row.penjamin}</td>
                                                <td>
                                                    <button className="lihat-identitas" onClick={() => IdentitasPasien(row.id)}>Lihat</button>
                                                    <button className="aksi-antrian" onClick={() => handleOpenAksiPopup(row.id)}>Aksi</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {showAksiPopup 
                && <AksiPopUp
                    id={selectedAppointmentId}
                    onClose={handleCloseAksiPopup} 
                    onSuccess={handleAksiSuccess} 
                />
            }
        </div>
    );
};

export default JanjiMasuk;
