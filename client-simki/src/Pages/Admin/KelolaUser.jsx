import React, { useState } from "react";
import '../../Style/Admin/KelolaUser.css';
import SearchBar from '../../components/SearchBar';  // Pastikan jalurnya benar
import { useNavigate } from 'react-router-dom'; 

const KelolaUser = () => {
    const [rows] = useState(Array.from({ length: 10 }));
    const navigate = useNavigate();

    const LihatLaporan = () => {
        navigate('/notifikasi-admin');
    };

    return (
        <div className="notif-admin-wrapper">
            <div className="navbar-header-notif-admin">
            </div>
            <div className="notif-admin-container">
                <div className="content-wrapper-notif-admin">
                    <div className="header-notif-admin">
                        <h1 className="text_notif-admin">Notifikasi</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel_notif-admin">
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
                                        <td className="notif-laporan-cell" >
                                            <div className="ket_terima">Terima</div>
                                            <button className="laporan-admin" onClick={LihatLaporan}>Lihat</button>
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

export default KelolaUser;
