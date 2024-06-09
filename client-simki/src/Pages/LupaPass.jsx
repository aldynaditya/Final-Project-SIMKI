// Pages/LupaPass.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import emailIcon from '../images/email.png'; // Gantilah dengan path yang benar jika berbeda
import './LupaPass.css';

const LupaPass = () => {
  const [email, setEmail] = useState(''); // State untuk menyimpan email

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Update state dengan nilai input email
  };

  const handleSubmit = () => {
    if (!email) {
      alert('Harap masukkan email Anda');
      return;
    }

    // Lakukan panggilan ke backend API untuk mengirim email
    console.log('Email yang akan dikirim:', email);

    // Contoh menggunakan fetch
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
    <div className="container">
      <Navbar />
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
      <div className='submit'onClick={handleSubmit}>Kirim</div>
      <Footer />
    </div>
  );
};


export default LupaPass;
