import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJadwalById, editJadwal } from '../../redux/resepsionis/scheduleEdit/actions';
import Modal from 'react-modal';
import '../../Style/Resepsionis/JadwalPopup.css';

const EditJadwal = ({ onClose, jadwalId, onSuccess }) => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector(state => state.editJadwal);
    const [formData, setFormData] = useState({
        hari: '',
        status: '',
        start_time: '',
        end_time: '',
    });
    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    useEffect(() => {
        dispatch(fetchJadwalById(jadwalId));
    }, [dispatch, jadwalId]);

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

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

    const handleSubmit = () => {
        if (!isFormValid()) {
            setAlert({
                status: true,
                message: 'Isi seluruh form',
                type: 'danger'
            });
            return;
        }
    
        dispatch(editJadwal(jadwalId, formData))
            .then(() => {
                setAlert({
                    status: true,
                    message: 'Data data berhasil diperbarui!',
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

    const generateTimeOptions = () => {
        const times = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 30) {
                const hour = h < 10 ? `0${h}` : h;
                const minute = m < 10 ? `0${m}` : m;
                times.push(`${hour}:${minute}`);
            }
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

    return (
        <div className='tambah-jadwal-container'>
            <div className='tambah-jadwal-content'>
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-tambah-jadwal'>Edit Jadwal</h1>
                <div className='kolom-dokter-jadwal'>
                <div className='hari-tambahjadwal'>
                        <span className='text-hari-tambahjadwal'>Status :</span>
                        <select 
                            className='kolom-hari-tambahjadwal'
                            name="status" 
                            value={formData.status} 
                            onChange={handleChange}>
                            <option value="">Pilih</option>
                            <option value="ada">tersedia</option>
                            <option value="tidak ada">tidak tersedia</option>
                        </select>
                    </div>
                    <div className='hari-tambahjadwal'>
                        <span className='text-hari-tambahjadwal'>Hari :</span>
                        <select 
                            className='kolom-hari-tambahjadwal'
                            name="hari" 
                            value={formData.hari} 
                            onChange={handleChange}>
                            <option value="">Pilih Hari</option>
                            <option value="Senin">Hari Senin</option>
                            <option value="Selasa">Hari Selasa</option>
                            <option value="Rabu">Hari Rabu</option>
                            <option value="Kamis">Hari Kamis</option>
                            <option value="Jumat">Hari Jumat</option>
                            <option value="Sabtu">Hari Sabtu</option>
                            <option value="Minggu">Hari Minggu</option>
                        </select>
                    </div>
                    <div className='jam-tambahjadwal'>
                        <span className='text-jam-tambahjadwal'>Jam :</span>
                        <select 
                            className='kolom-jam-tambahjadwal'
                            name='start_time'
                            value={formData.start_time}
                            onChange={handleChange}>
                            <option value="">Pilih Waktu</option>
                            {timeOptions.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                        s.d. 
                        <select  
                            className='kolom-jam-tambahjadwal'
                            name='end_time'
                            value={formData.end_time}
                            onChange={handleChange}>
                            <option value="">Pilih Waktu</option>
                            {timeOptions.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='tambahjadwal-container'>
                    <button className="button-tambahjadwal" onClick={handleSubmit}>Simpan</button>
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

export default EditJadwal;
