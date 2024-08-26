import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import Modal from 'react-modal';
import { createAppointment } from '../../redux/patient/create/actions';
import { getSchedules } from '../../redux/patient/schedule/actions';
import { getDayString } from '../../utils/convertfunction';
import { getMinDate } from '../../utils/dateUtils';
import '../../Style/Pasien/BuatJanji.css';

const BuatJanji = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {schedules, error} = useSelector(state => state.schedule);
    const {data: dataform, error: errorform, loading: loadingform} = useSelector(state => state.createAppointment);
    const [alert, setAlert] = useState({ status: false, message: '' });
    const [navigateAfterClose, setNavigateAfterClose] = useState(false);
    const minDate = getMinDate();

    const [formData, setFormData] = useState({
        poli: '',
        dokter: '',
        tanggal: '',
        jam: '',
        penjamin: '',
        keluhan: ''
    });

    const [formError, setFormError] = useState('');
    const [doctorUnavailable, setDoctorUnavailable] = useState(false);

    const isFormValid = useCallback(() => {
        return Object.values(formData).every(value => value.trim() !== '');
    }, [formData]);

    useEffect(() => {
        if (!isFormValid()) {
            setFormError('Isi seluruh form');
        } else {
            setFormError('');
        }
    }, [formData, isFormValid]);

    const [filteredDokters, setFilteredDokters] = useState([]);
    const [timeOptions, setTimeOptions] = useState([]);

    useEffect(() => {
        dispatch(getSchedules());
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
            setDoctorUnavailable(times.length === 0);
        }
    }, [formData.tanggal, formData.dokter, formData.poli, schedules]);

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

        const [start_time, end_time] = formData.jam.split('-');
        const appointmentData = {
            ...formData,
            start_time,
            end_time
        };

        setAlert({ status: false, message: '' });
        dispatch(createAppointment(appointmentData));
    };
    
    useEffect(() => {
        if (errorform) {
            setAlert({
                status: true,
                message: errorform,
                type: 'danger'
            });
        } else if (errorform === null && dataform !== null){
            setAlert({
                status: true,
                message: 'Janji berhasil dibuat!',
                type: 'success',
            });
            setNavigateAfterClose(true);
        }
    }, [errorform, dataform]);

    const closeModal = () => {
        setAlert({ status: false, message: '' });
        if (navigateAfterClose) {
            navigate('/pasien');
        }
    };

    return (
        <div className='BuatJanji_container'>
            <h1 className='text_buatjanji'>Buat Janji</h1>
            <div className='form_container_buatjanji'>
                <div className='form_group'>
                    <label htmlFor="poli">Poli :</label>
                    <select id="poli" name="poli" value={formData.poli} onChange={handleChange}>
                        <option value="" disabled hidden>Pilih Poli</option>
                        {Array.isArray(schedules) && schedules.length > 0 && [...new Set(schedules.map(schedule => schedule.poli))].map(poli => (
                            <option key={poli} value={poli}>{poli}</option>
                        ))}
                    </select>
                </div>
                <div className='form_group'>
                    <label htmlFor="dokter">Dokter :</label>
                    <select id="dokter" name="dokter" value={formData.dokter} onChange={handleChange}>
                        <option value="" disabled hidden>Pilih Dokter</option>
                        {filteredDokters.map(dokter => (
                            <option key={dokter} value={dokter}>{dokter}</option>
                        ))}
                    </select>
                </div>
                <div className='form_group'>
                    <label htmlFor="tanggal">Tanggal :</label>
                    <input 
                        type="date" 
                        id="tanggal" 
                        name="tanggal" 
                        value={formData.tanggal} 
                        onChange={handleChange} 
                        min={minDate}
                    />
                </div>
                <div className='form_group'>
                    <label htmlFor="jam">Jam :</label>
                    <select id="jam" name="jam" value={formData.jam} onChange={handleChange}>
                        <option value="" disabled hidden>Pilih Jam</option>
                        {doctorUnavailable ? (
                            <option value="" disabled>Dokter tidak tersedia pada hari itu</option>
                        ) : (
                            timeOptions.map(jam => (
                                <option key={jam} value={jam}>{jam}</option>
                            ))
                        )}
                    </select>
                </div>
                <div className='form_group'>
                    <label htmlFor="penjamin">Penjamin :</label>
                    <select id="penjamin" name="penjamin" value={formData.penjamin} onChange={handleChange}>
                        <option value="" disabled hidden>Pilih Penjamin</option>
                        <option value="umum">Umum</option>
                        <option value="asuransi">Asuransi</option>
                    </select>
                </div>

                <div className='keluhan'>
                    <input type="text" placeholder="Keluhan Umum" name="keluhan" value={formData.keluhan} onChange={handleChange} />
                </div>

                <div className='button_container'>
                    <button className='klik_buatjanji' onClick={handleSubmit} disabled={!isFormValid() || doctorUnavailable}>Buat Janji</button>
                    {formError && <p className="error_message">{formError}</p>}
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

export default BuatJanji;
