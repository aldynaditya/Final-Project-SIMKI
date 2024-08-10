import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import '../../Style/Resepsionis/PendaftarBaru.css';
import PendaftarPopup from './PendaftarPopup';
import SearchBar from "../../components/SearchBar";
import { fetchPasien } from '../../redux/resepsionis/updatependaftar/actions';
import { deletePendaftar } from '../../redux/resepsionis/deletependaftar/actions';

const PendaftarBaru = () => {
    const dispatch = useDispatch();
    const { data: rows, loading, error } = useSelector(state => state.pasien);
    const { loading: deleteLoading, error: deleteError, success: deleteSuccess } = useSelector(state => state.deletePendaftar);

    useEffect(() => {
        dispatch(fetchPasien());
    }, [dispatch]);

    const [showPopup, setShowPopup] = useState(false);

    const [alert, setAlert] = useState({
        status: false,
        message: '',
        type: '',
    });

    const HapusPendaftar = async (id) => {
        try {
            await dispatch(deletePendaftar(id));
            setAlert({
                status: true,
                message: 'DataPasien berhasil terhapus',
                type: 'success',
            });
        } catch (err) {
            setAlert({
                status: true,
                message: 'Gagal menghapus DataPasien',
                type: 'danger',
            });
        }
    };

    const closeModal = () => {
        setAlert({ status: false, message: '', type: '' });
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (loading || deleteLoading) {
        return <div>Loading...</div>;
    }

    if (error || deleteError) {
        return <div>Error: {error || deleteError}</div>;
    }

    return (
        <div className="pendaftar-baru-wrapper">
            <div className="pendaftar-baru-container">
                <div className="content-wrapper">
                    <div className="header-pendaftar-baru">
                        <h1 className="text_pendaftar">Pendaftar Baru</h1>
                        <div className="header-pendaftar-action">
                            <button className='tambah_pendaftar' onClick={handleOpenPopup}>Tambah</button>
                            <SearchBar />
                        </div>
                    </div>
                    <div className="tabel_pendaftar_baru">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>NIK</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Jenis Kelamin</th>
                                    <th>Alamat</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.nama_lengkap}</td>
                                        <td>{row.nik}</td>
                                        <td>{formatDate(row.tanggal_lahir)}</td>
                                        <td>{row.jenis_kelamin}</td>
                                        <td>{row.alamat}</td>
                                        <td>
                                            <div className="hapus-pendaftar" onClick={() => HapusPendaftar(row.uuid)}>
                                                Hapus
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showPopup && <PendaftarPopup onClose={handleClosePopup} />}
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

export default PendaftarBaru;
