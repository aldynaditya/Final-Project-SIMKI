import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../Style/Keuangan/NotifikasiSpv.css';
import SearchBar from '../../components/SearchBar';
import UploadLaporan from './UploadLaporan';
import { formatDateSlash } from '../../utils/dateUtils';
import { fetchNotif } from '../../redux/keuangan/indexnotif/actions';

const NotifikasiKeuangan = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.notif);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchNotif());
    }, [dispatch]);

    const UnggahLaporan = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const handleUnduh = (filePath) => {
        const fileUrl = `http://localhost:9000/uploads/${filePath}`;
        window.open(fileUrl, '_blank');
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
                                {!data ? (
                                    <tr>
                                        <td colSpan="6">Tidak terdapat data</td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="6" className="empty-message">
                                            {error || 'Terjadi kesalahan saat memuat data.'}
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((row) => (
                                        <tr key={row.uuid}>
                                            <td>{formatDateSlash(row.tanggal)}</td>
                                            <td>{row.no_laporan}</td>
                                            <td>{row.periode}</td>
                                            <td>{row.keterangan}</td>
                                            <td>{row.status}</td>
                                            <td>
                                                {row.file_path && (
                                                    <button className="ket_cetak" onClick={() => handleUnduh(row.file_path)}>
                                                        Unduh
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
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
