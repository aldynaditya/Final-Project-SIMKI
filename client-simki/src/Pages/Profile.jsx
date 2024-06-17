import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './profile.css';
import profil from '../images/profil.png';

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
                <div className="foto_profile">
                    <img src={profil} alt='Profil' className='profil' />
                </div>
                <div className="biodata-container">
                    <div className="biodata-fields">
                        <div className='nama_lengkap'>
                            <input type="text" placeholder="Nama Lengkap" />
                        </div>
                        <div className='nik'>
                            <input type="text" placeholder="NIK" pattern="\d{16}" maxLength="16" />
                        </div>
                        <div className='ttl'>
                            <input type="text" placeholder="Tempat, Tanggal Lahir" />
                        </div>
                        <div className='gender'>
                            <input type="text" placeholder="Jenis Kelamin" />
                        </div>
                        <div className='blood'>
                            <input type="text" placeholder="Golongan Darah" />
                        </div>
                        <div className='suku'>
                            <input type="text" placeholder="Suku Bangsa" />
                        </div>
                        <div className='alamat'>
                            <input type="text" placeholder="Alamat" />
                        </div>
                        <div className='email'>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className='password'>
                            <input type="password" placeholder="Kata Sandi" />
                        </div>
                        <div className="simpan-container">
                            <div className='simpan' onClick={handleSimpan}>Simpan</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
