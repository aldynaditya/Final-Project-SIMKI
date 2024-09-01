import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { createorderSuratSakit } from '../../redux/doctor/orderSickLetter/actions';
import '../../Style/Resepsionis/CetakSuratPopup.css';

const SuratSakit = ({ onClose, onComplete }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.createorderSuratSakit);

    const [formData, setFormData] = useState({
        umur: '',
        pekerjaan: '',
        diagnosis: '',
        periode_start: '',
        periode_end: '',
    });

    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const isFormValid = useCallback(() => {
        return Object.values(formData).every(value => value.trim() !== '');
    }, [formData]);

    useEffect(() => {
        if (alert.status) {
            const timer = setTimeout(() => {
                setAlert({ status: false, message: '', type: '' });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alert.status]);

    useEffect(() => {
        if (error) {
            setAlert({
                status: true,
                message: error,
                type: 'danger'
            });
        } else if (data) {
            setAlert({
                status: true,
                message: 'Data berhasil disimpan!',
                type: 'success'
            });
            setTimeout(() => {
                onComplete();
                onClose();
            }, 2000);
        }
    }, [error, data, onClose, onComplete]);


    const handleSuratSakit = () => {
        if (!isFormValid()) {
            setAlert({
                status: true,
                message: 'Isi seluruh form',
                type: 'danger'
            });
            return;
        }
        dispatch(createorderSuratSakit(id, formData));
    };

    return (
        <div className='cetaksurat-popup-container'>
            <div className='cetaksurat-popup-content'>
                <button className='cancel-x' onClick={onClose}>
                    X
                </button>
                <h1 className='text-cetaksurat-popup'>Surat Sakit</h1>
                <div className='kolom-cetak-surat'>
                    <div className='umur-cetaksurat'>
                        <span className='text-umur-cetaksurat'>Umur :</span>
                        <input type='text' className='kolom-umur-cetaksurat' name="umur" value={formData.umur} onChange={handleChange}/>
                    </div>
                    <div className='job-surat'>
                        <span className='text-job-surat'>Pekerjaan :</span>
                        <input type='text' className='kolom-job-surat' name="pekerjaan" value={formData.pekerjaan} onChange={handleChange}/>
                    </div>
                    <div className='diagnosis-surat'>
                        <span className='text-diagnosis-surat'>Diagnosis :</span>
                        <input type='text' className='kolom-diagnosis-surat' name="diagnosis" value={formData.diagnosis} onChange={handleChange}/>
                    </div>
                    <div className='kadaluarsa-surat'>
                        <div className='periode-surat'>
                            <span className='text-periode-surat-sakit'>Periode :</span>
                            <input type='date' className='kolom-periode-surat' name="periode_start" value={formData.periode_start} onChange={handleChange}/>
                            <span className='text-hingga-surat-rujukan'>Hingga :</span>
                            <input type='date' className='kolom-hingga-surat' name="periode_end" value={formData.periode_end} onChange={handleChange}/>
                        </div>
                    </div>
                </div>
                <div className='perubahan-surat-container'>
                    <button className="perubahan-surat" onClick={handleSuratSakit}>Simpan</button>
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

export default SuratSakit;
