import React from 'react';
import { useNavigate } from 'react-router-dom';
import passIcon from '../../images/pass.png';
import '../../Style/Pasien/GantiPassword.css';

const GantiPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    alert('Form submitted!');
    navigate('/login');
  };
  return (
    <div className="page-container">
      <div className="content-wrap">
        <h1 className='text-title'>Ganti Password</h1>
        <div className='input'>
          <img src={passIcon} alt="ikon password" />
          <input
            type='password'
            placeholder='Password'
            value=''
          />
        </div>
        <div className='input'>
          <img src={passIcon} alt="ikon password" />
          <input
            type='password'
            placeholder='Konfirmasi Password'
            value=''
          />
        </div>
        <div className='submit' onClick={handleSubmit}>Kirim</div>
      </div>
    </div>
  );
};

export default GantiPassword;
