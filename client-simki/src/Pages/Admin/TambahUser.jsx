import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import '../../Style/Admin/TambahUser.css';
import '../../Style/Resepsionis/CetakSuratPopup.css';
import { addUser } from '../../redux/admin/add/actions';

const TambahUser = () => {
    const [formData, setFormData] = useState({
        role: '',
        nama: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.addUser);

    const [alert, setAlert] = useState({
        status: false,
        message: '',
        type: ''
    });

    const BACK_PATH = '/admin';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            await dispatch(addUser(formData));
            navigate(BACK_PATH);
        } catch (err) {
            setAlert({
                status: true,
                message: error || 'Gagal',
                type: 'danger'
            });
        }
    };

    const closeModal = () => {
        setAlert({ status: false, message: '', type: '' });
    };

    return (
        <div className='tambah-popup-container'>
            <div className='tambah-popup-content'>
                <Link 
                    to={BACK_PATH}
                    className='cancel-x' 
                >
                    Cancel X
                </Link>
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
            {error && (
                <Modal
                    isOpen={alert.status}
                    onRequestClose={closeModal}
                    contentLabel="Error Message"
                    className="Modal"
                    overlayClassName="Overlay"
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                >
                    <div className="modal-content">
                        <p>{error}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TambahUser;
