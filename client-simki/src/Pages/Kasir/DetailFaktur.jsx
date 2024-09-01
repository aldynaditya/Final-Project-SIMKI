import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { updateOrdertoTransaction } from '../../redux/kasir/updateOrder/actions';
import '../../Style/Kasir/DetailFaktur.css';

const PopUpDetailFaktur = ({ id, onClose, onSuccess }) => {
    const dispatch = useDispatch();
    const { updatedata, loading, errordata } = useSelector(state => {
        console.log('Redux State:', state);
        return state.updateOrder;
    });                                              
    const [formData, setFormData] = useState({
        metode_bayar: '',
        diskon: '0',
        keterangan: ''
    });

    const [alert, setAlert] = useState({ status: false, message: '', type: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const isFormValid = useCallback(() => {
        return Object.values(formData).every(value => value.trim() !== '');
    }, [formData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        if (!isFormValid()) {
            setAlert({
                status: true,
                message: 'Isi seluruh form',
                type: 'danger'
            });
            return;
        }
        setIsSubmitted(true);
        dispatch(updateOrdertoTransaction(id, formData));
    };

    useEffect(() => {
        if (isSubmitted && !loading) {
            if (errordata) {
                setAlert({
                    status: true,
                    message: errordata,
                    type: 'danger'
                });
            } else if (updatedata) {
                setAlert({
                    status: true,
                    message: "Sukses",
                    type: 'success'
                });
                setTimeout(() => {
                    setAlert({ status: false, message: '', type: '' });
                    onSuccess();
                    onClose();
                }, 2000);
            }
            setIsSubmitted(false);
        }
    }, [updatedata, errordata, loading, isSubmitted, onClose, onSuccess]);


    return (
        <div className='modal-overlay'>
            <div className='detail-faktur-popup-container'>
                <button className='cancel-x' onClick={onClose}>
                    X
                </button>
                <h1 className='text-detail-faktur'>Detail Faktur</h1>
                <div className='kolom-detail-faktur'>
                    <div className='metode-pembayaran'>
                        <span className='text-metode-pembayaran'>Metode Pembayaran:</span>
                        <select  
                            className='dropdown-pembayaran'
                            name="metode_bayar"
                            value={formData.metode_bayar}
                            onChange={handleChange}
                        >
                            <option value="">Pilih Pembayaran</option>
                            <option value="cash">Cash</option>
                            <option value="bank">Bank</option>
                        </select>
                    </div>
                    <div className='diskon-faktur'>
                        <span className='text-diskon-faktur'>Diskon(%):</span>
                        <input
                            className='kolom-diskon-faktur'
                            type='number'
                            name="diskon"
                            value={formData.diskon} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className='keterangan-faktur'>
                        <span className='text-keterangan-faktur'>Keterangan:</span>
                        <input
                            className='kolom-keterangan-faktur'
                            type='text'
                            name="keterangan"
                            value={formData.keterangan} 
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='simpan-faktur-container'>
                    <button
                        className="simpan-faktur"
                        onClick={handleSubmit}
                    >
                        {loading ? 'Menyimpan...' : 'Simpan'}
                    </button>
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

export default PopUpDetailFaktur;
