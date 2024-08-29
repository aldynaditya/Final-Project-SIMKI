import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import '../../Style/Admin/TambahUser.css';
import '../../Style/Resepsionis/CetakSuratPopup.css';
import { addUser } from '../../redux/admin/add/actions';

const TambahUser = ({ onClose, onSuccess }) => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.addUser);
    const [formData, setFormData] = useState({
            role: '',
            nama: '',
            email: '',
            password: ''
        });

    const [alert, setAlert] = useState({
        status: false,
        message: '',
        type: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const isFormValid = useCallback(() => {
        return Object.values(formData).every(value => value.trim() !== '');
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
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
        dispatch(addUser(formData));
    };

    useEffect(() => {
        if (isSubmitted && !loading) {
            if (error) {
                setAlert({
                    status: true,
                    message: error,
                    type: 'danger'
                });
            }
            else if (data && !loading) {
                setAlert({
                    status: true,
                    message: 'Akun berhasil dibuat!',
                    type: 'success'
                });
                setTimeout(() => {
                    onSuccess();
                    onClose();
                }, 2000);
            }
            setIsSubmitted(false);
        }
    }, [data, error, loading, isSubmitted, onClose, onSuccess]);

    return (
        <div className='tambah-popup-container'>
            <div className='tambah-popup-content'>
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-tambah-popup'>Tambah User</h1>
                <div className='kolom-tambah'>
                    <div className='nama'>
                        <span className='text-nama'>Nama :</span>
                        <input 
                            type='text' 
                            name='nama'
                            className='kolom-nama' 
                            value={formData.nama} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='email'>
                        <span className='text-email'>Email :</span>
                        <input 
                            type='text' 
                            name='email'
                            className='kolom-email' 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='pass'>
                        <span className='text-pass'>Password :</span>
                        <input 
                            type='password' 
                            name='password'
                            className='kolom-pass' 
                            value={formData.password} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='role'>
                        <span className='text-role'>Role :</span>
                        <select 
                            name='role' 
                            value={formData.role} 
                            onChange={handleChange} 
                            className='kolom-role'
                        >
                            <option value="">Pilih Role</option>
                            <option value="superuser">Superuser</option>
                            <option value="dokter">Dokter</option>
                            <option value="perawat">Perawat</option>
                            <option value="farmasi">Farmasi</option>
                            <option value="kasir">Kasir</option>
                            <option value="pimpinan">Pimpinan</option>
                            <option value="spvkeuangan">SPV Keuangan</option>
                            <option value="resepsionis">Resepsionis</option>
                        </select>
                    </div>                  
                </div>
                <div className='tambah--container'>
                    <button className="simpan" onClick={handleSubmit}>
                        {loading ? 'Loading...' : 'Tambah'}
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

export default TambahUser;
