import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../../Style/Dokter/HasilKuisionerPopup.css';

const FeedbackPopUp = ({ data, onClose }) => {
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (data) {
            setFeedback(data);
        }
    }, [data]);

    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    return (
        <div className='hasilkuisioner-popup-container'>
            <div className='hasilkuisioner-popup-content'>
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-hasilkuisioner-popup'>Feedback</h1>
                <div className='keluhan'>
                    <textarea
                        className='textarea-kuisioner' 
                        type="text" 
                        placeholder="Feedback" 
                        value={feedback} 
                        readOnly 
                    />
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

export default FeedbackPopUp;
