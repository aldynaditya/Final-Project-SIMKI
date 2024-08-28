import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../../Style/Resepsionis/PendaftarBaru.css';
import PendaftarPopup from './PendaftarPopup';
import BuatJanjiPopup from './BuatJanjiPopup';
import SearchBar from "../../components/SearchBar";
import { fetchPasien } from '../../redux/resepsionis/indexPatient/actions';
import { deletePasien } from '../../redux/resepsionis/deletePatient/actions';
import { formatDateStrip } from "../../utils/dateUtils";
import Modal from 'react-modal';

const PendaftarBaru = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getPatient);
    const { loading: deleteLoading, error: deleteError } = useSelector(state => state.deletePatient);

    const [selectedPasienId, setSelectedPasienId] = useState(null);
    const [isTambahPendaftarPopupVisible, setIsTambahPendaftarPopupVisible] = useState(false);
    const [isBuatJanjiPopupVisible, setIsBuatJanjiPopupVisible] = useState(false);
    const [alert, setAlert] = useState({status: false,  message: '', type: '' });

    useEffect(() => {
        dispatch(fetchPasien());
    }, [dispatch]);

    useEffect(() => {
        if (!deleteLoading && !deleteError) {
            dispatch(fetchPasien());
        }
    }, [deleteLoading, deleteError, dispatch]);

    const handleTambahPendaftar = () => {
        setIsTambahPendaftarPopupVisible(true);
    };

    const handleTambahPendaftarClose = () => {
        setIsTambahPendaftarPopupVisible(false);
        dispatch(fetchPasien());
    };

    const handleBuatJanji = (id) => {
        setSelectedPasienId(id);
        setIsBuatJanjiPopupVisible(true);
    };

    const handleBuatJanjiClose = () => {
        setIsBuatJanjiPopupVisible(false);
    };

    const handleTambahPendaftarSuccess = () => {
        dispatch(fetchPasien());
    };

    const handleBuatJanjiSuccess = () => {
        dispatch(fetchPasien());
    };

    const hapusPendaftar = async (id) => {
        try {
            await dispatch(deletePasien(id));
            if (deleteError) {
                setAlert({
                    status: true,
                    message: 'Data Pasien gagal dihapus!',
                    type: 'danger'
                });
            } else {
                setAlert({
                    status: true,
                    message: 'Data Pasien berhasil dihapus!',
                    type: 'success'
                });
            }
        } catch (err) {
            setAlert({
                status: true,
                message: 'Gagal menghapus Data Pasien',
                type: 'danger',
            });
        }
    };

    if (loading || deleteLoading) {
        return <div>Loading...</div>;
    }

    const closeModal = () => {
        setAlert({ status: false, message: '', type: '' });
    };

    return (
        <div className="pendaftar-baru-wrapper">
            <div className="pendaftar-baru-container">
                <div className="content-wrapper">
                    <div className="header-pendaftar-baru">
                        <h1 className="text_pendaftar">Pendaftar</h1>
                        <div className="header-pendaftar-action">
                            <button className='tambah_pendaftar' onClick={handleTambahPendaftar}>Tambah</button>
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
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-message">
                                            Data pasien belum tersedia
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.nama_lengkap}</td>
                                            <td>{row.nik}</td>
                                            <td>{formatDateStrip(row.tanggal_lahir)}</td>
                                            <td>{row.jenis_kelamin}</td>
                                            <td>{row.alamat}</td>
                                            <td>
                                                <div className="hapus-pendaftar" onClick={() => hapusPendaftar(row.id)}>
                                                    Hapus
                                                </div>
                                                <div className="buat-janji" onClick={() => handleBuatJanji(row.id)}>
                                                    Buat Janji
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isTambahPendaftarPopupVisible &&
                <PendaftarPopup
                    onClose={handleTambahPendaftarClose}
                    onSuccess={handleTambahPendaftarSuccess}
                />
            }
            {isBuatJanjiPopupVisible &&
                <BuatJanjiPopup
                    id={selectedPasienId}
                    onClose={handleBuatJanjiClose}
                    onSuccess={handleBuatJanjiSuccess}
                />
            }
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
