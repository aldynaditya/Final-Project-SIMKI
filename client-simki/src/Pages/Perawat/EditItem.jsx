import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemById, editItem } from '../../redux/nurse/edit/actions';import Modal from 'react-modal';
import '../../Style/Perawat/TambahitemPopup.css';

const EditItem = ({ onClose, itemId, onSuccess }) => {
    const dispatch = useDispatch();
    const { item, loading } = useSelector(state => state.editItem);
    const [formData, setFormData] = useState({
        nama_item: '',
        kode_item: '',
        harga_satuan_item: '',
        satuan: '',
        stok: ''
    });
    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    useEffect(() => {
        dispatch(fetchItemById(itemId));
    }, [dispatch, itemId]);

    useEffect(() => {
        if (item) {
            setFormData(item);
        }
    }, [item]);

    const isFormValid = useCallback(() => {
        return Object.values(formData).every(value => {
            return String(value).trim() !== '';
        });
    }, [formData]);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (!isFormValid()) {
            setAlert({
                status: true,
                message: 'Isi seluruh form',
                type: 'danger'
            });
            return;
        }
    
        dispatch(editItem(itemId, formData))
            .then(() => {
                setAlert({
                    status: true,
                    message: 'Data Item berhasil diperbarui!',
                    type: 'success'
                });
                setTimeout(() => {
                    setAlert({ status: false, message: '', type: '' });
                    onSuccess();
                    onClose();
                }, 2000);
            })
            .catch(() => {
                setAlert({
                    status: true,
                    message: 'Gagal memperbarui data!',
                    type: 'danger'
                });
            });
    };
    

    return (
        <div className='tambahitem-popup-container'>
            <div className='tambahitem-popup-content'>
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-tambahitem-popup'>Edit Item</h1>
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
                        <input type='text' className='kolom-harga-item' name="harga_satuan_item" value={formData.harga_satuan_item} onChange={handleChange} />
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

export default EditItem;
