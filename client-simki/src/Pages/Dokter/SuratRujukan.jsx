import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { createorderSuratRujukan } from '../../redux/doctor/orderReferralLetter/actions';
import '../../Style/Dokter/SuratRujukan.css';

const SuratRujukan = ({ onClose, onComplete }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.createorderSuratRujukan);
    
    const [formData, setFormData] = useState({
        tujuan: '',
        tempat_tujuan: '',
        diagnosis: '',
        tindakan: '',
        keterangan: ''
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

    const SimpanRujukan = () => {
        if (!isFormValid()) {
            setAlert({
                status: true,
                message: 'Isi seluruh form',
                type: 'danger'
            });
            return;
        }
        dispatch(createorderSuratRujukan(id, formData));
    };

    return (
        <div className='suratrujukan-container'>
            <div className='suratrujukan-content'>
            <button className='cancel-x' onClick={onClose}>
                    X
            </button>
                <h1 className='text-suratrujukan'>Surat Rujukan</h1>
                <div className='kolom-surat-rujukan'>
                    <div className='tujuan-rujukan'>
                        <span className='text-tujuan-rujukan'>Tujuan :</span>
                        <input type='text' className='kolom-tujuan-rujukan' name="tujuan" value={formData.tujuan} onChange={handleChange}/>
                    </div>
                    <div className='tempat-rujukan'>
                        <span className='text-tempat-rujukan'>Tempat Tujuan :</span>
                        <input type='text' className='kolom-tempat-rujukan' name="tempat_tujuan" value={formData.tempat_tujuan} onChange={handleChange}/>
                    </div>
                    <div className='diagnosis-rujukan'>
                        <span className='text-diagnosis-rujukan'>Diagnosis :</span>
                        <input type='text' className='kolom-diagnosis-rujukan' name="diagnosis" value={formData.diagnosis} onChange={handleChange}/>
                    </div>
                    <div className='tindakan-rujukan'>
                        <p className='text-tindakan-rujukan-satu'>Tindakan yang Diberikan :</p>
                        <input type='text' className='kolom-tindakan-rujukan' name="tindakan" value={formData.tindakan} onChange={handleChange}/>
                    </div>
                    <div className='keterangan-rujukan'>
                        <span className='text-keterangan-rujukan'>Keterangan :</span>
                        <input type='text' className='kolom-keterangan-rujukan' name="keterangan" value={formData.keterangan} onChange={handleChange}/>
                    </div>
                    
                </div>
                <div className='button-surat-rujukan'>
                    <button className="simpan-rujukan" onClick={SimpanRujukan}>Simpan</button>
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

export default SuratRujukan;
