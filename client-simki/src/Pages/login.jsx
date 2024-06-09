// Pages/login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import email from '../images/email.png';
import pass from '../images/pass.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import simki from '../images/simki.png'; // Pastikan untuk mengimpor gambar yang ingin Anda tampilkan



const Login = () => {
  const [action, setAction] = useState("Daftar");
  const navigate = useNavigate();

  const handleActionClick = (action) => {
    setAction(action);
    if (action === "Daftar") {
      navigate('/daftar');
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h1 className='text'>{action}</h1>
      <div className='logo-container'>
        <img src={simki} alt="Simki" className='simki' /> {/* Tambahkan gambar di sini */}
        <div className='simki-text'>
          <p>Selamat Datang di Sistem Kami</p>
          <p>Silakan masuk untuk melanjutkan</p>
        </div>
      </div>
      <div className='inputs'>
        <img src={email} alt="ikon email" />
        <input type='email' placeholder='Email' />
      </div>
      <div className='inputs'>
        <img src={pass} alt="ikon kata sandi" />
        <input type='password' placeholder='Kata Sandi' />
      </div>
      <div className="forgot-password">
        Lupa Kata Sandi? <span onClick={() => navigate('/lupa-password')}>Klik Di sini</span>
      </div>
      <div className='submit-container'>
        <div className={`submit ${action === 'Login' ? 'gray' : ''}`} onClick={() => handleActionClick("Daftar")}>Daftar</div>
        <div className={`submit ${action === 'Daftar' ? 'gray' : ''}`} onClick={() => setAction("Login")}>Login</div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;


