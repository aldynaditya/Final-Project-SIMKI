import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import email from '../images/email.png';
import pass from '../images/pass.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import simki from '../images/simki.png';

const Login = () => {
  const [action, setAction] = useState("Login");
  const navigate = useNavigate();

  const handleActionClick = (actionType) => {
    setAction(actionType);
    if (actionType === "Daftar") {
      navigate('/daftar');
    } else if (actionType === "Login") {
      navigate('/halaman-pasien'); // Navigasi ke halaman pasien setelah login
    }
  };

  return (
    <div className="login_container">
      <Navbar />
      <h1 className='text'>{action}</h1>
      <div className='logo-container'>
        <img src={simki} alt="Simki" className='simki' />
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
        <div
          className={`submit ${action === 'Daftar' ? 'filled' : 'gray'}`}
          onClick={() => handleActionClick("Daftar")}
        >
          Daftar
        </div>
        <div
          className={`submit ${action === 'Login' ? 'filled' : 'gray'}`}
          onClick={() => handleActionClick("Login")}
        >
          Login
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
