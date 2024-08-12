import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { createorderSuratSakit } from '../../redux/doctor/orderSickLetter/actions';
import '../../Style/Resepsionis/CetakSuratPopup.css';

const SuratSakit = ({ onClose }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.createorderSuratSakit);

    const [formData, setFormData] = useState({
        riwayatPenyakit: '',
        subjective: '',
        objective: '',
        assessment: '',
        plan: '',
        tindakan: [],
    });

    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    useEffect(() => {
        if (error) {
            setAlert({
                status: true,
                message: 'Isi seluruh Form Entry',
                type: 'danger'
            });
        } else if (data) {
            setAlert({
                status: true,
                message: 'Data berhasil disimpan!',
                type: 'success'
            });
        }
    }, [error, data]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSuratSakit = () => {
        dispatch(createorderSuratSakit(id, formData));
        setAlert({ status: false, message: '', type: '' });
    };

    return (
        <div className='cetaksurat-popup-container'>
            <div className='cetaksurat-popup-content'>
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-cetaksurat-popup'>Perpanjang Surat Sakit</h1>
                <div className='kolom-cetak-surat'>
                    <div className='umur-cetaksurat'>
                        <span className='text-umur-cetaksurat'>Umur :</span>
                        <input type='text' className='kolom-umur-cetaksurat'></input>
                    </div>
                    <div className='job-surat'>
                        <span className='text-job-surat'>Pekerjaan :</span>
                        <input type='text' className='kolom-job-surat'></input>
                    </div>
                    <div className='diagnosis-surat'>
                        <span className='text-diagnosis-surat'>Diagnosis :</span>
                        <input type='text' className='kolom-diagnosis-surat'></input>
                    </div>
                    <div className='kadaluarsa-surat'>
                        <div className='periode-surat'>
                            <span className='text-periode-surat'>Periode :</span>
                            <input type='date' className='kolom-periode-surat'></input>
                        </div>
                        <div className='hingga-surat'>
                            <span className='text-hingga-surat'>Hingga :</span>
                            <input type='date' className='kolom-hingga-surat'></input>
                        </div>
                    </div>
                </div>
                <div className='perubahan-surat-container'>
                    <button className="perubahan-surat" onClick={handleSuratSakit}>Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default SuratSakit;
