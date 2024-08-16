import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchObatById, editObat } from '../../redux/pharmacy/edit/actions';
import Modal from 'react-modal';
import '../../Style/Perawat/TambahitemPopup.css';

const EditObat = ({ onClose, obatId, onSuccess }) => {
    const dispatch = useDispatch();
    const { obat, loading } = useSelector(state => state.editObat);
    const [formData, setFormData] = useState({
        nama_obat: '',
        kode_obat: '',
        harga_satuan_obat: '',
        satuan: '',
        stok: ''
    });
    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    useEffect(() => {
        dispatch(fetchObatById(obatId));
    }, [dispatch, obatId]);

    useEffect(() => {
        if (obat) {
            setFormData(obat);
        }
    }, [obat]);

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
    
        dispatch(editObat(obatId, formData))
            .then(() => {
                setAlert({
                    status: true,
                    message: 'Data Obat berhasil diperbarui!',
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
                <h1 className='text-tambahitem-popup'>Edit Obat</h1>
                <div className='kolom-tambah-item'>
                    <div className='nama-item'>
                        <span className='text-nama-item'>Nama Obat :</span>
                        <input type='text' className='kolom-nama-item' name="nama_obat" value={formData.nama_obat} onChange={handleChange} />
                    </div>
                    <div className='kode-item'>
                        <span className='text-kode-item'>Kode Obat :</span>
                        <input type='text' className='kolom-kode-item' name="kode_obat" value={formData.kode_obat} onChange={handleChange} />
                    </div>
                    <div className='harga-item'>
                        <span className='text-harga-item'>Harga Satuan :</span>
                        <input type='text' className='kolom-harga-item' name="harga_satuan_obat" value={formData.harga_satuan_obat} onChange={handleChange} />
                    </div>
                    <div className='satuan-item'>
                        <span className='text-satuan-item'>Satuan :</span>
                        <input type='text' className='kolom-satuan-item' name="satuan" value={formData.satuan} onChange={handleChange} />
                    </div>
                    <div className='stok-item'>
                        <span className='text-stok-item'>Stok/Kuantitas :</span>
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

export default EditObat;
