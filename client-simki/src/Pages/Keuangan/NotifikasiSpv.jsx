import React, { useState } from 'react';
import '../../Style/Keuangan/NotifikasiSpv.css';
import SearchBar from '../../components/SearchBar';
import UploadLaporan from './UploadLaporan';

const NotifikasiKeuangan = () => {
    const [rows] = useState(Array.from({ length: 10 }));
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const UnggahLaporan = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="notif-keuangan-wrapper">
            <div className="notif-keuangan-container">
                <div className="content-wrapper-notif-keuangan">
                    <div className="header-notif-keuangan">
                        <h1 className="text_notif-keuangan">Notifikasi</h1>
                        <button className='upload-laporan' onClick={UnggahLaporan}>Unggah Laporan</button>
                        <SearchBar />
                    </div>
                    <div className="tabel_notif-keuangan">
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
                                        <td><div className="ket_cetak">Cetak</div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isPopupVisible && <UploadLaporan onClose={handleClosePopup} />} 
        </div>
    );
};

export default NotifikasiKeuangan;
