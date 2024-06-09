// Pages/Daftar.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


//home
const Daftar = () => {
  return (
    <div className="container">
      <Navbar />
      <h1>Daftar</h1> 
      <p>Silakan isi formulir pendaftaran untuk membuat akun baru.</p>
      <input type="text" placeholder="Nama Lengkap" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Kata Sandi" />
      <button>Daftar</button>
      <Footer />
    </div>
  );
};

export default Daftar;
