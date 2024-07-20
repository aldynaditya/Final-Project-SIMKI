import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../Style/Pasien/Daftar.css';

const Daftar = () => {
  const navigate = useNavigate();

  const handleDaftar = () => {
    // Logika untuk menangani submit di sini
    alert('Form submitted!');
    navigate('/halaman-pasien'); // Lakukan routing ke HalamanPasien
  };

  return (
    <div className="regist_container">
      <Navbar />
      <h1>Registrasi Akun</h1>
      <div className="form-container">
        <div className="form-fields">
          <div className='nama'>
            <input type="text" placeholder="Nama Lengkap (Sesuai KTP)" />
          </div>
          <div className='ttl'>
            <input type="text" placeholder="Tempat Lahir" />
            <input type="date" placeholder="Tanggal Lahir" />
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
          <div className='nik'>
            <input type="text" placeholder="NIK" pattern="\d{16}" maxLength="16" />
          </div>
          <div className='email'>
            <input type="email" placeholder="Email" />
          </div>
          <div className='password'>
            <input type="password" placeholder="Kata Sandi" />
          </div>
          <div className='password'>
            <input type="password" placeholder="Ulang Kata Sandi" />
          </div>
          <div className="daftar-container">
            <div className='daftar' onClick={handleDaftar}>Daftar</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Daftar;
