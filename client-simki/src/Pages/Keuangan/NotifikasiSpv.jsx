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
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchNotif());
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(data);
        setNoResults(data.length === 0);
    }, [data]);

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
    
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const result = data.filter(row =>
                row.no_laporan.toLowerCase().includes(query) ||
                row.periode.toLowerCase().includes(query)
            );
            setFilteredData(result);
            setNoResults(result.length === 0);
        } else {
            setFilteredData(data);
            setNoResults(false);
        }
    };

    return (
        <div className="notif-keuangan-wrapper">
            <div className="notif-keuangan-container">
                <div className="content-wrapper-notif-keuangan">
                    <div className="header-notif-keuangan">
                        <h1 className="text_notif-keuangan">Notifikasi</h1>
                        <button className='upload-laporan' onClick={UnggahLaporan}>Unggah Laporan</button>
                        <SearchBar onSearch={handleSearch}/>
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
                                {data.length === 0 ? 
                                        <tr>
                                            <td colSpan="12" className="empty-message">
                                                Belum ada Laporan yang masuk
                                            </td>
                                        </tr>
                                    : filteredData.length === 0 ? (
                                        <tr>
                                            <td colSpan="12" className="empty-message">
                                                {noResults ? "Tidak ditemukan" : "Tidak ditemukan"}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredData.map((row) => (
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
