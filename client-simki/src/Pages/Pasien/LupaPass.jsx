import React from 'react';
import { useNavigate } from 'react-router-dom';
import emailIcon from '../../images/email.png';
import '../../Style/Pasien/LupaPass.css';

const LupaPass = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    alert('Form submitted!');
    navigate('/login');
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <h1 className='text-lupapass'>Lupa Kata Sandi</h1>
        <div className='input'>
          <img src={emailIcon} alt="ikon email" />
          <input
            type='email'
            placeholder='Email'
            value=''
          />
        </div>
        <div className='submit' onClick={handleSubmit}>Kirim</div>
      </div>
    </div>
  );
};

export default LupaPass;
