import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { createorderSuratRujukan } from '../../redux/doctor/orderReferralLetter/actions';
import '../../Style/Dokter/SuratRujukan.css';

const SuratRujukan = ({ onClose }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.createorderObat);
    
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

    const SimpanRujukan = () => {
        dispatch(createorderSuratRujukan(id, formData));
        setAlert({ status: false, message: '', type: '' }); 
    };

    return (
        <div className='suratrujukan-container'>
            <div className='suratrujukan-content'>
            <button className='cancel-x' onClick={onClose}>
                    Cancel X
            </button>
                <h1 className='text-suratrujukan'>Surat Rujukan</h1>
                <div className='kolom-surat-rujukan'>
                    <div className='tujuan-rujukan'>
                        <span className='text-tujuan-rujukan'>Tujuan :</span>
                        <input type='text' className='kolom-tujuan-rujukan'></input>
                    </div>
                    <div className='tempat-rujukan'>
                        <span className='text-tempat-rujukan'>Tempat Tujuan :</span>
                        <input type='text' className='kolom-tempat-rujukan'></input>
                    </div>
                    <div className='diagnosis-rujukan'>
                        <span className='text-diagnosis-rujukan'>Diagnosis :</span>
                        <input type='text' className='kolom-diagnosis-rujukan'></input>
                    </div>
                    <div className='tindakan-rujukan'>
                        <p className='text-tindakan-rujukan-satu'>Tindakan yang Diberikan :</p>
                        <input type='text' className='kolom-tindakan-rujukan'></input>
                    </div>
                    <div className='keterangan-rujukan'>
                        <span className='text-keterangan-rujukan'>Keterangan :</span>
                        <input type='text' className='kolom-keterangan-rujukan'></input>
                    </div>
                    
                </div>
                <div className='button-surat-rujukan'>
                    <button className="simpan-rujukan" onClick={SimpanRujukan}>Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default SuratRujukan;
