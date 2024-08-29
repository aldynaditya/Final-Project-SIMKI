import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { createAppointment } from '../../redux/resepsionis/createAppointment/actions';
import { getScheduleP } from '../../redux/resepsionis/schedule/actions';
import { getDayString } from '../../utils/convertfunction';
import '../../Style/Resepsionis/BuatJanjiPopup.css';

const BuatJanjiPopup = ({ id, onClose, onSuccess }) => {
    const dispatch = useDispatch();
    const { schedules } = useSelector(state => state.getScheduleP);
    const { data, loading, error } = useSelector(state => state.createAppointmentbyRSP);

    const [formData, setFormData] = useState({
        poli: '',
        dokter: '',
        tanggal: '',
        jam: '',
        penjamin: '',
        keluhan: ''
    });

    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    const isFormValid = useCallback(() => {
        return Object.values(formData).every(value => {
            return String(value).trim() !== '';
        });
    }, [formData]);

    const [filteredDokters, setFilteredDokters] = useState([]);
    const [timeOptions, setTimeOptions] = useState([]);

    useEffect(() => {
        dispatch(getScheduleP());
    }, [dispatch]);

    useEffect(() => {
        if (formData.poli) {
            const filtered = schedules.filter(schedule => schedule.poli === formData.poli);
            const dokters = [...new Set(filtered.map(schedule => schedule.dokter))];
            setFilteredDokters(dokters);
        } else {
            setFilteredDokters([...new Set(schedules.map(schedule => schedule.dokter))]);
        }
    }, [formData.poli, schedules]);

    useEffect(() => {
        if (formData.tanggal) {
            const dayString = getDayString(formData.tanggal);
            const filtered = schedules.filter(
                schedule => 
                    schedule.poli === formData.poli && 
                    schedule.dokter === formData.dokter &&
                    schedule.hari === dayString
                );

            const times = [...new Set(filtered.map(schedule => schedule.jam))];
            setTimeOptions(times);
        }
    }, [formData.tanggal, formData.dokter, formData.poli, schedules]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log('form', formData);
        if (!isFormValid()) {
            setAlert({
                status: true,
                message: 'Isi seluruh form',
                type: 'danger'
            });
            return;
        }

        const [start_time, end_time] = formData.jam.split('-');
        const appointmentData = {
            ...formData,
            start_time,
            end_time
        };

        dispatch(createAppointment(id, appointmentData))
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
        <div className="popup-container">
            <button className='cancel-x-b' onClick={onClose}>
                    Cancel X
                </button>
            <div className="popup-content">
                <h1 className='text-popup-buatjanji'>Buat Janji</h1>
                <form>
                    <label>
                        Poli:
                        <select id="poli" name="poli" value={formData.poli} onChange={handleChange}>
                            <option value="">Pilih Poli</option>
                            {Array.isArray(schedules) && schedules.length > 0 && [...new Set(schedules.map(schedule => schedule.poli))].map(poli => (
                                <option key={poli} value={poli}>{poli}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Dokter:
                        <select id="dokter" name="dokter" value={formData.dokter} onChange={handleChange}>
                            <option value="">Pilih Dokter</option>
                            {filteredDokters.map(dokter => (
                                <option key={dokter} value={dokter}>{dokter}</option>
                            ))}
                        </select>                                       
                    </label>
                    <label>
                        Tanggal:
                        <input type="date" id="tanggal" name="tanggal" value={formData.tanggal} onChange={handleChange} />
                    </label>
                    <label>
                        Jam:
                        <select id="jam" name="jam" value={formData.jam} onChange={handleChange}>
                            <option value="">Pilih Jam</option>
                            {timeOptions.map(jam => (
                                <option key={jam} value={jam}>{jam}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Penjamin:
                        <select id="penjamin" name="penjamin" value={formData.penjamin} onChange={handleChange}>
                            <option value="">Pilih Penjamin</option>
                            <option value="umum">Umum</option>
                            <option value="asuransi">Asuransi</option>
                        </select>   
                    </label>
                    <label>
                        Keluhan:
                        <input type="text" id="keluhan" name="keluhan" value={formData.keluhan} onChange={handleChange} />
                    </label>
                    <div className='button_container'>
                        <button className='klik_buatjanji' onClick={handleSubmit} disabled={!isFormValid()}>Buat Janji</button>
                    </div>
                </form>
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

export default BuatJanjiPopup;
