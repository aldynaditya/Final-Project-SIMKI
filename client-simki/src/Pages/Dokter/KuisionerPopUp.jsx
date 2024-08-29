import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchResponseById } from '../../redux/doctor/indexResponse/actions';
import { fetchFeedback } from '../../redux/doctor/indexFeedback/actions';
import { createFeedback } from '../../redux/doctor/createFeedback/actions';
import Modal from 'react-modal';
import '../../Style/Dokter/HasilKuisionerPopup.css';

const HasilKuisionerPopup = ({ onClose, onComplete }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getResponse);
    const { data: Gdatafb, loading: Gloadingfb, error: Gerrorfb } = useSelector(state => state.getFeedback);
    const { data: datafb, loading: loadingfb, error: errorfb } = useSelector(state => state.createFeedback);

    useEffect(() => {
        dispatch(fetchResponseById(id));
        dispatch(fetchFeedback(id));
    }, [dispatch, id]);

    const [formData, setFormData] = useState({
        feed_back: '',
    });

    useEffect(() => {
        if (Gdatafb) {
            setFormData({
                feed_back: Gdatafb.feed_back || '',
            });
        }
    }, [Gdatafb]);
    
    const [alert, setAlert] = useState({ status: false, message: '', type: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

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
        if (isSubmitted && !Gloadingfb) {
            if (errorfb) {
                setAlert({
                    status: true,
                    message: errorfb,
                    type: 'danger'
                });
            } else if (datafb) {
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
            setIsSubmitted(false);
        }
    }, [errorfb, datafb, onClose, onComplete]);

    const handleSimpan = () => {
        if (!isFormValid()) {
            setAlert({
                status: true,
                message: 'Isi seluruh form',
                type: 'danger'
            });
            return;
        }
        setIsSubmitted(true);
        dispatch(createFeedback(id, formData));
    };

    const translateAnswer = (answer) => {
        switch (answer) {
            case 'Strongly Agree':
                return 'Sangat Setuju';
            case 'Agree':
                return 'Setuju';
            case 'Neutral':
                return 'Netral';
            case 'Disagree':
                return 'Tidak Setuju';
            case 'Strongly Disagree':
                return 'Sangat Tidak Setuju';
            default:
                return answer;
        }
    };
    
    return (
        <div className='hasilkuisioner-popup-container'>
            <div className='hasilkuisioner-popup-content'>
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-hasilkuisioner-popup'>Hasil Kuisioner</h1>
                <div className='kolom-hasilkuisioner'>
                    <table>
                        <thead>
                            <tr>
                                <th>Pertanyaan</th>
                                <th>Jawaban</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.question}</td>
                                    <td>{translateAnswer(row.answer)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='keluhan'>
                    <textarea
                        className='textarea-kuisioner' 
                        placeholder="Feedback" 
                        name="feed_back" 
                        value={formData.feed_back} 
                        onChange={handleChange}
                    />
                </div>
                <div className='perubahan-surat-container'>
                    <button className="perubahan-surat" onClick={handleSimpan}>Simpan</button>
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

export default HasilKuisionerPopup;
