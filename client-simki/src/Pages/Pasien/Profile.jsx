// Profile.js
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../Style/Pasien/profile.css';

const Profile = () => {
    const handleSimpan = () => {
        // Logika untuk menangani submit di sini
        alert('Biodata Tersimpan');
    };

    return (
        <div className='profile_container'>
            <Navbar />
            <div className="content">
                <h1 className='text_profil'>Profil</h1>
                <div className='biodata-pasien-public'>
                    <div className='nama-nik-public'>
                        <input type='text' className='kolom-npasien-public' placeholder='Nama Lengkap'/>
                        <input type='text' className='kolom-nik-public' placeholder='NIK'/>
                    </div>
                    <div className='ttl-public'>
                        <input type='text' className='kolom-ttl-public' placeholder='Tempat, Tanggal Lahir'/>
                    </div>
                    <div className='gender-public'>
                        <input type='text' className='kolom-gender-public' placeholder='Jenis Kelamin'/>
                    </div>
                    <div className='blood-public'>
                        <input type='text' className='kolom-blood-public' placeholder='Golongan Darah'/>
                    </div>
                    <div className='suku-public'>
                        <input type='text' className='kolom-suku-public' placeholder='Suku Bangsa'/>
                    </div>
                    <div className='alamat-public'>
                        <input type='text' className='kolom-alamat-public' placeholder='Alamat Lengkap'/>
                    </div>
                    <div className='email-public'>
                        <input type='email' className='kolom-email-public' placeholder='Email'/>
                    </div>
                    <div className='password-public'>
                        <input type='password' className='kolom-password-public' placeholder='Password'/>
                    </div>
                    <div className="simpan-profil-container">
                        <div className='simpan-profil' onClick={handleSimpan}>Simpan</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
