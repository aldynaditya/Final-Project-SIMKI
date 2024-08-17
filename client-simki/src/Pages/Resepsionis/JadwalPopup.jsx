import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { createJadwal } from '../../redux/resepsionis/scheduleCreate/actions';
import '../../Style/Resepsionis/JadwalPopup.css';

const TambahJadwal = ({ onClose, onSuccess, schedules }) => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.createObat);
    const [formData, setFormData] = useState({
        hari: '',
        start_time: '',
        end_time: '',
        namaDokter: '',
    });

    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    const isFormValid = useCallback(() => {
        return Object.values(formData).every(value => value.trim() !== '');
    }, [formData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if (alert.status) {
            const timer = setTimeout(() => {
                setAlert({ status: false, message: '', type: '' });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alert.status]);

    const handleSubmit = async () => {   
        if (!isFormValid()) {
            setAlert({
                status: true,
                message: 'Isi seluruh form',
                type: 'danger'
            });
            return;
        }
        dispatch(createJadwal(formData))
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
                <h1 className='text-tambah-jadwal'>Tambah Jadwal</h1>
                <div className='kolom-dokter-jadwal'>
                    <div className='ndokter-tambahjadwal'>
                        <span className='text-ndokter-tambahjadwal'>Nama Dokter :</span>
                        <select 
                            className='kolom-ndokter-tambahjadwal'
                            name="namaDokter" 
                            value={formData.namaDokter} 
                            onChange={handleChange}>
                            <option value="">Pilih Dokter</option>
                            {Array.isArray(schedules) && schedules.length > 0 && [...new Set(schedules.map(schedule => schedule.dokter))].map(dokter => (
                                <option key={dokter} value={dokter}>{dokter}</option>
                            ))}
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
                    <button className="button-tambahjadwal" onClick={handleSubmit}>
                        {loading ? 'Loading...' : 'Simpan'}
                    </button>
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

export default TambahJadwal;
