import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getScheduleP } from '../../redux/resepsionis/schedule/actions';
import { deleteJadwal } from '../../redux/resepsionis/scheduleDelete/actions';
import '../../Style/Resepsionis/KelolaJadwal.css';
import TambahJadwal from './JadwalPopup';
import EditJadwal from './EditJadwal';
import Modal from 'react-modal'; 

const KelolaJadwal = () => {
    const dispatch = useDispatch();
    const { schedules, loading } = useSelector((state) => state.getScheduleP);
    const { loading: deleteLoading, error: deleteError } = useSelector((state) => state.deleteJadwal);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedJadwalId, setSelectedJadwalId] = useState(null);
    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    useEffect(() => {
        dispatch(getScheduleP());
    }, [dispatch]);

    useEffect(() => {
        if (!deleteLoading && !deleteError) {
            dispatch(getScheduleP());
        }
    }, [deleteLoading, deleteError, dispatch]);

    const handleTambahJadwal = () => {
        setIsPopupVisible(true);
        setIsEditing(false);
        setSelectedJadwalId(null);
    };

    const handleUbahJadwal = (id) => {
        setIsPopupVisible(true);
        setIsEditing(true);
        setSelectedJadwalId(id);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setSelectedJadwalId(null);
    };

    const handleSuccess = () => {
        dispatch(getScheduleP());
    };

    const hapusJadwal = async (id) => {
        try {
            await dispatch(deleteJadwal(id));
            if (deleteError) {
                setAlert({
                    status: true,
                    message: 'Jadwal gagal dihapus!',
                    type: 'danger'
                });
            } else {
                setAlert({
                    status: true,
                    message: 'Jadwal berhasil dihapus!',
                    type: 'success'
                });
            }
        } catch (error) {
            setAlert({
                status: true,
                message: 'Failed to delete',
                type: 'danger',
            });
        }
    };

    const closeModal = () => {
        setAlert({ status: false, message: '', type: '' });
    };

    return (
        <div className="kelola-jadwal-container">
            <div className="content-wrap-kelola-jadwal">
                <div className="content-wrapper-kelola-jadwal">
                    <div className="header-kelola-jadwal">
                        <h1 className="text_kelola-jadwal">Kelola Jadwal</h1>
                        <button className='tombol_tambah-jadwal' onClick={handleTambahJadwal}>Tambah Jadwal</button>
                        
                    </div>
                    <div className="tabel_kelola-jadwal">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nama Dokter</th>
                                    <th>Poli</th>
                                    <th>Hari</th>
                                    <th>Jam</th>
                                    <th>Status</th>
                                    <th className="aksi-column">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                            {schedules.map((jadwal) => (
                                    <tr key={jadwal.id}>
                                        <td>{jadwal.dokter}</td>
                                        <td>{jadwal.poli}</td>
                                        <td>{jadwal.hari}</td>
                                        <td>{jadwal.jam}</td>
                                        <td>{jadwal.status}</td>
                                        <td>
                                            <button className="ubah-jadwal" onClick={() => handleUbahJadwal(jadwal.id)}>Ubah</button>
                                            <div className="hapus-jadwal" onClick={() => hapusJadwal(jadwal.id)}>Hapus</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isPopupVisible && (
                isEditing 
                ? <EditJadwal onClose={handleClosePopup} jadwalId={selectedJadwalId} onSuccess={handleSuccess}/> 
                : <TambahJadwal onClose={handleClosePopup} onSuccess={handleSuccess} />
            )}
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

export default KelolaJadwal;
