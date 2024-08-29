import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifikasiLaporan } from "../../redux/pimpinan/index/actions";
import { updateStatus } from "../../redux/pimpinan/update/actions";
import { formatDateSlash } from "../../utils/dateUtils";
import '../../Style/Pimpinan/NotifikasiLead.css';
import SearchBar from '../../components/SearchBar';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const NotifikasiPimpinan = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.getlaporanbyPimpinan);

    const [alert, setAlert] = React.useState({ status: false, message: '', type: '' });

    useEffect(() => {
        dispatch(fetchNotifikasiLaporan());
    }, [dispatch]);

    const handleProsesClick = async (id) => {
        try {
            await dispatch(updateStatus(id));
            dispatch(fetchNotifikasiLaporan()); 
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleUnduh = (filePath) => {
        const fileUrl = `http://localhost:9000/uploads/${filePath}`;
        window.open(fileUrl, '_blank');
    };

    const closeModal = () => {
        setAlert({ status: false, message: '', type: '' });
    };

    return (
        <div className="notif-pimpinan-wrapper">
            <div className="navbar-header-notif-pimpinan"></div>
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
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-message">
                                            Belum ada laporan yang masuk
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
                                            <td className="notif-laporan-cell">
                                                <button 
                                                    className="laporan-pimpinan" 
                                                    onClick={() => handleProsesClick(row.uuid)}
                                                >
                                                    Terima
                                                </button>
                                                <button 
                                                    className="laporan-pimpinan" 
                                                    onClick={() => handleUnduh(row.file_path)}
                                                >
                                                    Unduh
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={alert.status}
                onRequestClose={closeModal}
                contentLabel="Alert Message"
                className="Modal"
                overlayClassName="Overlay"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
            >
                <div className="modal-content">
                    <p>{alert.message}</p>
                    <button onClick={closeModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default NotifikasiPimpinan;
