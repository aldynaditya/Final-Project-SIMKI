import React, { useState } from "react";
import '../../Style/Pimpinan/NotifikasiLead.css';
import SearchBar from '../../components/SearchBar'; 
import { useNavigate } from 'react-router-dom';

const NotifikasiPimpinan = () => {
    const [rows] = useState(Array.from({ length: 10 }));
    const navigate = useNavigate();

    const LihatLaporan = () => {
        navigate('notifikasi-pimpinan');
    };

    return (
        <div className="notif-pimpinan-wrapper">
            <div className="navbar-header-notif-pimpinan">
            </div>
            <div className="notif-pimpinan-container">
                <div className="content-wrapper-notif-pimpinan">
                    <div className="header-notif-pimpinan">
                        <h1 className="text_notif-pimpinan">Notifikasi</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel_notif-pimpinan">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>No. Laporan</th>
                                    <th>Periode</th>
                                    <th>Keterangan</th>
                                    <th>Status</th>
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
                                        <td className="notif-laporan-cell">
                                            <button className="ket_terima-pimpinan">Terima</button>
                                            <button className="laporan-pimpinan" onClick={LihatLaporan}>Lihat</button>
                                        </td>
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

export default NotifikasiPimpinan;
