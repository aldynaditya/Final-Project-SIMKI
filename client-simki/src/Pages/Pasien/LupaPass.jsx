import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import emailIcon from '../../images/email.png';
import otpIcon from '../../images/otp.png'; 
import '../../Style/Pasien/LupaPass.css';

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

    if (!otp) {
      alert('Harap masukkan kode OTP Anda');
      return;
    }

    // Lakukan panggilan ke backend API untuk menyimpan data email dan OTP
    console.log('Data yang akan dikirim:', { email, otp });

    fetch('YOUR_BACKEND_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Data anda telah tersimpan!');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Terjadi kesalahan. Coba lagi nanti.');
    });
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <h1 className='text-lupapass'>Lupa Kata Sandi</h1>
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
    </div>
  );
};

export default LupaPass;
