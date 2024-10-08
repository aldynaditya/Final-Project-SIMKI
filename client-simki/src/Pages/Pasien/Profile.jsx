import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import '../../Style/Pasien/profile.css';
import { fetchProfile, updateProfile } from '../../redux/patient/profile/actions';

const Profile = () => {
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector(state => state.profile);

    const [localProfile, setLocalProfile] = useState({
        nama_lengkap: '',
        nik: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        gol_darah: '',
        kewarganegaraan: '',
        alamat: ''
    });

    const [alert, setAlert] = useState({
        status: false,
        message: '',
        type: '',
    });

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile && profile.data) {
            setLocalProfile({
                nama_lengkap: profile.data.nama_lengkap || '',
                nik: profile.data.nik || '',
                tempat_lahir: profile.data.tempat_lahir || '',
                tanggal_lahir: profile.data.tanggal_lahir ? new Date(profile.data.tanggal_lahir).toISOString().split('T')[0] : '',
                jenis_kelamin: profile.data.jenis_kelamin || '',
                gol_darah: profile.data.gol_darah || '',
                kewarganegaraan: profile.data.kewarganegaraan || '',
                alamat: profile.data.alamat || ''
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'nik') {
            const numericValue = value.replace(/[^0-9]/g, '');
            setLocalProfile({
                ...localProfile,
                [name]: numericValue
            });
        } else {
            setLocalProfile({
                ...localProfile,
                [name]: value
            });
        }
    };

    const closeModal = () => {
        setAlert({ status: false, message: '', type: '' });
    };

    const handleSimpan = async () => {
        console.log('Updating profile with data:', localProfile);
        try {
            await dispatch(updateProfile(localProfile));
            setAlert({
                status: true,
                message: 'Biodata Tersimpan',
                type: 'success',
            });
        } catch (err) {
            setAlert({
                status: true,
                message: 'Failed to update profile',
                type: 'danger',
            });
        }
    };

    return (
        <div className='profile_container'>
            <div className="content">
                <h1 className='text_profil'>Profil</h1>
                <div className='biodata-pasien-public'>
                    <div className='nama-nik-public'>
                        <input
                            type='text'
                            className='kolom-npasien-public'
                            placeholder='Nama Lengkap'
                            name='nama_lengkap'
                            value={localProfile.nama_lengkap}
                            onChange={handleChange}
                        />
                        <input
                            type='text'
                            className='kolom-nik-public'
                            placeholder='NIK'
                            name='nik'
                            value={localProfile.nik}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='ttl-public'>
                        <input
                            type='text'
                            className='kolom-ttl-public'
                            placeholder='Tempat'
                            name='tempat_lahir'
                            value={localProfile.tempat_lahir}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='ttl-public'>
                        <input
                            type='date'
                            className='kolom-ttl-public'
                            placeholder='Tanggal Lahir'
                            name='tanggal_lahir'
                            value={localProfile.tanggal_lahir}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='gender-public'>
                        <select
                            className='kolom-gender-public'
                            placeholder='Jenis Kelamin'
                            name='jenis_kelamin'
                            value={localProfile.jenis_kelamin}
                            onChange={handleChange}
                        >
                            <option value="laki-laki">Laki-laki</option>
                            <option value="perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div className='blood-public'>
                        <select
                            type='text'
                            className='kolom-blood-public'
                            placeholder='Golongan Darah'
                            name='gol_darah'
                            value={localProfile.gol_darah}
                            onChange={handleChange}
                        >
                            <option value="O">O</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                        </select>
                    </div>
                    <div className='suku-public'>
                        <select
                            type='text'
                            className='kolom-suku-public'
                            placeholder='Kewarganegaraan'
                            name='kewarganegaraan'
                            value={localProfile.kewarganegaraan}
                            onChange={handleChange}
                        >
                            <option value="WNI">WNI</option>
                            <option value="WNA">WNA</option>
                        </select>
                    </div>
                    <div className='alamat-public'>
                        <input
                            type='text'
                            className='kolom-alamat-public'
                            placeholder='Alamat Lengkap'
                            name='alamat'
                            value={localProfile.alamat}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="simpan-profil-container">
                        <div className='simpan-profil' onClick={handleSimpan}>Simpan</div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={alert.status}
                onRequestClose={closeModal}
                contentLabel="Alert Message"
                className="Modal"
                overlayClassName="Overlay"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
            >
                <div className="modal-content">
                    <p>{alert.message}</p>
                    <button onClick={closeModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default Profile;
