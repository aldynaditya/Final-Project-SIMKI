import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import emailIcon from '../images/email.png'; // Gantilah dengan path yang benar jika berbeda
import otpIcon from '../images/otp.png'; // Tambahkan ikon OTP jika ada
import './LupaPass.css';

const LupaPass = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(''); // State untuk menyimpan kode OTP

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = () => {
    if (!email) {
      alert('Harap masukkan email Anda');
      return;
    }

    // Lakukan panggilan ke backend API untuk mengirim email
    console.log('Email yang akan dikirim:', email);

    fetch('YOUR_BACKEND_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Email telah dikirim!');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Terjadi kesalahan. Coba lagi nanti.');
    });
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrap">
        <h1 className='text'>Lupa Kata Sandi</h1>
        <div className='inputs'>
          <img src={emailIcon} alt="ikon email" />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className='inputs'>
          <img src={otpIcon} alt="ikon otp" />
          <input
            type='text'
            placeholder='Kode OTP'
            value={otp}
            onChange={handleOtpChange}
          />
        </div>
        <div className='submit' onClick={handleSubmit}>Kirim</div>
      </div>
      <Footer />
    </div>
  );
};

export default LupaPass;
