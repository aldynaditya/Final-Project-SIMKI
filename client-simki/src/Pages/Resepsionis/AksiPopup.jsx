import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../Style/Resepsionis/AksiPopup.css';
import Modal from 'react-modal';
import { updatestatusAppointment } from '../../redux/resepsionis/updateStatus/actions';

const UpdateStatus = ({ id, onClose, onSuccess }) => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.updateStatus);

    const [formData, setFormData] = useState({
        status: '',
        keterangan: '',
    });

    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    const isFormValid = useCallback(() => {
        return Object.values(formData).every(value => {
            return String(value).trim() !== '';
        });
    }, [formData]);
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const SimpanAksi = () => {
        if (!isFormValid()) {
            setAlert({
                status: true,
                message: 'Isi seluruh form',
                type: 'danger'
            });
            return;
        }

        dispatch(updatestatusAppointment(id, formData))
            .then(() => {
                setAlert({
                    status: true,
                    message: 'Data berhasil diperbarui!',
                    type: 'success'
                });
                setTimeout(() => {
                    setAlert({ status: false, message: '', type: '' });
                    onSuccess();
                    onClose();
                }, 2000);
            })
            .catch(() => {
                setAlert({
                    status: true,
                    message: 'Gagal memperbarui data!',
                    type: 'danger'
                });
            });
    };

    return (
        <div className='update-status-container'>
            <div className='update-status-content'>
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-update-status'>Update Status</h1>
                <div className='kolom-update-status'>
                    <div className='status-aksi'>
                        <span className='text-status-aksi'>Status :</span>
                        <select 
                            className='kolom-status-aksi' 
                            name="status"
                            value={formData.status} 
                            onChange={handleChange}
                        >
                            <option value=''>Pilih Aksi</option>
                            <option value='diterima'>Terima</option>
                            <option value='ditolak'>Tolak</option>
                        </select>
                    </div>
                    <div className='keterangan-aksi'>
                        <span className='text-keterangan-aksi'>Keterangan :</span>
                        <textarea 
                            className='kolom-keterangan-aksi' 
                            placeholder='Masukkan keterangan'
                            name="keterangan" 
                            value={formData.keterangan} 
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='updateaksi-container'>
                    <button className="button-updatestatus" onClick={SimpanAksi}>Simpan</button>
                </div>
            </div>
            <Modal
                isOpen={alert.status}
                onRequestClose={() => setAlert({ status: false, message: '', type: '' })}
                contentLabel="Alert Message"
                className="Modal"
                overlayClassName="Overlay"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
            >
                <div className="modal-content">
                    <p>{alert.message}</p>
                    <button onClick={() => setAlert({ status: false, message: '', type: '' })}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default UpdateStatus;
