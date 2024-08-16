import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdateStatus from './AksiPopup';
import '../../Style/Resepsionis/Antrian.css';
import { fetchAppointment } from '../../redux/resepsionis/queue/actions'; 

const Antrian = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.antrian); 

    const [showAksiPopup, setShowAksiPopup] = useState(false);

    useEffect(() => {
        dispatch(fetchAppointment()); 
    }, [dispatch]);

    const handleOpenAksiPopup = () => {
        setShowAksiPopup(true);
    };

    const handleCloseAksiPopup = () => {
        setShowAksiPopup(false);
    };

    const IdentitasPasien = () => {
        window.open('identitas-pasien', '_blank');
    };

    const formatDate = (dateString) => {
        return dateString.split('T')[0];
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
                                    {data.map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.nama_lengkap}</td>
                                            <td>{row.dokter}</td>
                                            <td>{row.poli}</td>
                                            <td>{formatDate(row.tanggal)}</td>
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
            {showAksiPopup && <UpdateStatus onClose={handleCloseAksiPopup} />}
        </div>
    );
};

export default Antrian;
