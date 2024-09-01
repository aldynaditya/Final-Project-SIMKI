import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { createItem } from '../../redux/nurse/create/actions';
import '../../Style/Perawat/TambahitemPopup.css';

const TambahItem = ({ onClose, onSuccess }) => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.createItem);
    const [formData, setFormData] = useState({
        nama_item: '',
        kode_item: '',
        harga_satuan_item: '',
        satuan: '',
        stok: ''
    });
    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    const isFormValid = useCallback(() => {
        return Object.values(formData).every(value => value.trim() !== '');
    }, [formData]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value).replace(/\D00(?=\D*$)/, '');
    };

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'harga_satuan_item') {
            const numberValue = value.replace(/\D/g, '');
            value = formatCurrency(numberValue);
            setFormData(prevFormData => ({
                ...prevFormData,
                harga_satuan_item: numberValue
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

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
        }

        if (data && !loading) {
            setAlert({
                status: true,
                message: 'Data Item berhasil disimpan!',
                type: 'success'
            });
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 2000);
        }
    }, [data, error, loading, onClose, onSuccess]);

    const handleSubmit = async () => {   
        if (!isFormValid()) {
            setAlert({
                status: true,
                message: 'Isi seluruh form',
                type: 'danger'
            });
            return;
        }
        dispatch(createItem(formData));
    };

    return (
        <div className='tambahitem-popup-container'>
            <div className='tambahitem-popup-content'>
                <button className='cancel-x' onClick={onClose}>
                    X
                </button>
                <h1 className='text-tambahitem-popup'>Tambah Item</h1>
                <div className='kolom-tambah-item'>
                    <div className='nama-item'>
                        <span className='text-nama-item'>Nama Item :</span>
                        <input type='text' className='kolom-nama-item' name="nama_item" value={formData.nama_item} onChange={handleChange} />
                    </div>
                    <div className='kode-item'>
                        <span className='text-kode-item'>Kode Item :</span>
                        <input type='text' className='kolom-kode-item' name="kode_item" value={formData.kode_item} onChange={handleChange} />
                    </div>
                    <div className='harga-item'>
                        <span className='text-harga-item'>Harga Satuan :</span>
                        <input type='text' className='kolom-harga-item' name="harga_satuan_item" value={formatCurrency(formData.harga_satuan_item)} onChange={handleChange} />
                    </div>
                    <div className='satuan-item'>
                        <span className='text-satuan-item'>Satuan :</span>
                        <input type='text' className='kolom-satuan-item' name="satuan" value={formData.satuan} onChange={handleChange} />
                    </div>
                    <div className='stok-item'>
                        <span className='text-stok-item'>Stok :</span>
                        <input type='text' className='kolom-stok-item' name="stok" value={formData.stok} onChange={handleChange} />
                    </div>
                </div>
                <div className='tambah-item-container'>
                    <button className="simpan-item" onClick={handleSubmit}>
                        {loading ? 'Loading...' : 'Simpan'}
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

export default TambahItem;
