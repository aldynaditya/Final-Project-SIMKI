import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { getDoctors, getAvailableHours, createAppointment } from '../../redux/patient/appointment/actions';
import '../../Style/Pasien/BuatJanji.css';

const BuatJanji = () => {
    const dispatch = useDispatch();
    const { doctors, hours, loading, error } = useSelector(state => state.appointments);

    const [formData, setFormData] = useState({
        poli: '',
        dokter: '',
        tanggal: '',
        start_time: '',
        end_time: '',
        penjamin: '',
        keluhan: ''
    });

    const [alert, setAlert] = useState({
        status: false,
        message: '',
        type: '',
    });

    // Function to generate time options in 30-minute intervals
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

    // Fetch doctors based on selected polyclinic
    useEffect(() => {
        if (formData.poli) {
            dispatch(getDoctors(formData.poli));
        }
    }, [formData.poli, dispatch]);

    // Fetch available hours based on selected doctor and date
    useEffect(() => {
        if (formData.dokter && formData.tanggal) {
            dispatch(getAvailableHours(formData.dokter, formData.tanggal));
        }
    }, [formData.dokter, formData.tanggal, dispatch]);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            await dispatch(createAppointment(formData));
            if (error) {
                setAlert({
                    status: true,
                    message: error.message,
                    type: 'danger',
                });
            } else {
                setAlert({
                    status: true,
                    message: 'Janji berhasil dibuat!',
                    type: 'success',
                });
            }
        } catch (error) {
        }
    };

    // Close the modal
    const closeModal = () => {
        setAlert({ status: false, message: '', type: '' });
    };

    return (
        <div className='BuatJanji_container'>
            <h1 className='text_buatjanji'>Buat Janji</h1>
            <div className='form_container'>
                <div className='form_group'>
                    <label htmlFor="poli">Poli :</label>
                    <select id="poli" name="poli" value={formData.poli} onChange={handleChange}>
                        <option value="">Pilih Poli</option>
                        <option value="Umum">Umum</option>
                        <option value="Gigi">Gigi</option>
                    </select>
                </div>

                <div className='form_group'>
                    <label htmlFor="dokter">Dokter :</label>
                    <select id="dokter" name="dokter" value={formData.dokter} onChange={handleChange}>
                        <option value="">Pilih Dokter</option>
                        {Array.isArray(doctors) && doctors.map(doctor => (
                            <option key={doctor.uuid} value={doctor.dokter}>{doctor.dokter}</option>
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
