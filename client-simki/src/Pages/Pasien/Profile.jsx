// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../Style/Pasien/profile.css';
import { fetchProfile, updateProfile } from '../../redux/profile/actions';

const Profile = () => {
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector(state => state.profile);

    const [localProfile, setLocalProfile] = useState({
        namaLengkap: '',
        nik: '',
        tempatLahir: '',
        tanggalLahir: '',
        jenisKelamin: '',
        golDarah: '',
        sukuBangsa: '',
        alamat: ''
    });

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile && profile.data) {
            setLocalProfile({
                namaLengkap: profile.data.nama_lengkap || '',
                nik: profile.data.nik || '',
                tempatLahir: profile.data.tempat_lahir || '',
                tanggalLahir: profile.data.tanggal_lahir ? new Date(profile.data.tanggal_lahir).toISOString().split('T')[0] : '',
                jenisKelamin: profile.data.jenis_kelamin || '',
                golDarah: profile.data.gol_darah || '',
                sukuBangsa: profile.data.suku_bangsa || '',
                alamat: profile.data.alamat || ''
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        setLocalProfile({
            ...localProfile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSimpan = () => {
        alert('Biodata Tersimpan');
        console.log('Updating profile with data:', localProfile); // Debugging step
        dispatch(updateProfile(localProfile));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                            name='namaLengkap'
                            value={localProfile.namaLengkap}
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
                            name='tempatLahir'
                            value={localProfile.tempatLahir}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='ttl-public'>
                        <input
                            type='date'
                            className='kolom-ttl-public'
                            placeholder='Tanggal Lahir'
                            name='tanggalLahir'
                            value={localProfile.tanggalLahir}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='gender-public'>
                        <input
                            type='text'
                            className='kolom-gender-public'
                            placeholder='Jenis Kelamin'
                            name='jenisKelamin'
                            value={localProfile.jenisKelamin}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='blood-public'>
                        <input
                            type='text'
                            className='kolom-blood-public'
                            placeholder='Golongan Darah'
                            name='golDarah'
                            value={localProfile.golDarah}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='suku-public'>
                        <input
                            type='text'
                            className='kolom-suku-public'
                            placeholder='Suku Bangsa'
                            name='sukuBangsa'
                            value={localProfile.sukuBangsa}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='alamat-public'>
                        <input
                            type='text'
                            className='kolom-alamat-public'
                            placeholder='Alamat Lengkap'
                            value={localProfile.alamat}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="simpan-profil-container">
                        <div className='simpan-profil' onClick={handleSimpan}>Simpan</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
