import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { createAppointment } from '../../redux/patient/create/actions';
import { getSchedules } from '../../redux/patient/input/actions';
import '../../Style/Pasien/BuatJanji.css';

const BuatJanji = () => {
    const dispatch = useDispatch();
    const schedules = useSelector(state => state.input.schedules);
    const error = useSelector(state => state.input.error);
    const [alert, setAlert] = useState({ status: false, message: '' });

    const [formData, setFormData] = useState({
        poli: '',
        dokter: '',
        tanggal: '',
        start_time: '',
        end_time: '',
        penjamin: '',
        keluhan: ''
    });

    console.log(formData)

    useEffect(() => {
        dispatch(getSchedules());
    }, [dispatch]);

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                options.push(time);
            }
        }
        return options;
    };

    const timeOptions = generateTimeOptions();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        dispatch(createAppointment(formData));
    };

    const closeModal = () => {
        setAlert({ status: false, message: '' });
    };

    return (
        <div className='BuatJanji_container'>
            <h1 className='text_buatjanji'>Buat Janji</h1>
            <div className='form_container'>
                <div className='form_group'>
                    <label htmlFor="poli">Poli :</label>
                    <select id="poli" name="poli" value={formData.poli} onChange={handleChange}>
                        <option value="">Pilih Poli</option>
                        {Array.isArray(schedules) && schedules.length > 0 && [...new Set(schedules.map(schedule => schedule.poli))].map(poli => (
                            <option key={poli} value={poli}>{poli}</option>
                        ))}
                    </select>
                </div>

                <div className='form_group'>
                    <label htmlFor="dokter">Dokter :</label>
                    <select id="dokter" name="dokter" value={formData.dokter} onChange={handleChange}>
                        <option value="">Pilih Dokter</option>
                        {Array.isArray(schedules) && schedules.length > 0 && [...new Set(schedules.map(schedule => schedule.dokter))].map(dokter => (
                            <option key={dokter} value={dokter}>{dokter}</option>
                        ))}
                    </select>
                </div>

                <div className='form_group'>
                    <label htmlFor="tanggal">Tanggal :</label>
                    <input type="date" id="tanggal" name="tanggal" value={formData.tanggal} onChange={handleChange} />
                </div>

                <div className='form_group'>
                    <label htmlFor="jam">Jam :</label>
                    <div className="time_input_container">
                        <select id="start_time" name="start_time" value={formData.start_time} onChange={handleChange}>
                            <option value="">Start Time</option>
                            {timeOptions.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                        <select id="end_time" name="end_time" value={formData.end_time} onChange={handleChange}>
                            <option value="">End Time</option>
                            {timeOptions.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='form_group'>
                    <label htmlFor="penjamin">Penjamin :</label>
                    <select id="penjamin" name="penjamin" value={formData.penjamin} onChange={handleChange}>
                        <option value="umum">Umum</option>
                        <option value="asuransi">Asuransi</option>
                    </select>
                </div>

                <div className='keluhan'>
                    <input type="text" placeholder="Keluhan Umum" name="keluhan" value={formData.keluhan} onChange={handleChange} />
                </div>

                <button className='klik_buatjanji' onClick={handleSubmit}>Buat Janji</button>
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
