import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/signin/login.css';
import { postData } from '../../utils/fetch';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth/actions';
import Modal from 'react-modal';
import emailIcon from '../../images/email.png';
import passIcon from '../../images/pass.png';
import logoklinik from '../../images/logoklinik.png';
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  
  const [alert, setAlert] = useState({
    status: false,
    message: '',
    type: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [captchaValidated, setCaptchaValidated] = useState(false); // Tambahkan state untuk captcha

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleActionClick = (actionType) => {
    if (actionType === "Daftar") {
      navigate('/daftar');
    } else if (actionType === "LupaPassword") {
      navigate('/lupa-password');
    }
  };

  const closeModal = () => {
    setAlert({ status: false, message: '', type: '' });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValidated(!!value); // Perbarui state captcha berdasarkan apakah ada nilai atau tidak
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setAlert({
        status: true,
        message: 'Form belum terisi. Silakan lengkapi email dan password.',
        type: 'danger',
      });
      return;
    }

    if (!captchaValidated) {
      setAlert({
        status: true,
        message: 'Captcha belum terisi. Silakan selesaikan captcha.',
        type: 'danger',
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await postData(`/auth/signin`, form);

      if (res?.data?.data) {
        const { token, role } = res.data.data;
        dispatch(userLogin(token, role));

        setIsLoading(false);

        navigate('');
      } else {
        throw new Error(res?.response?.data?.msg || 'Internal server error');
      }
    } catch (err) {
      setIsLoading(false);
      setAlert({
        status: true,
        message: err.message,
        type: 'danger',
      });
    }
  };

  return (
    <div className="login_container">
      <h1 className='text-login'>Login</h1>
      <div className='logo-container'>
        <img src={logoklinik} alt='Logo Klinik' className='logoklinik' />
        <div className='simki-text'>
          <p>Selamat Datang di Klinik Pratama Diponegoro I</p>
          <p>Silakan masuk untuk melanjutkan</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='inputs'>
          <img src={emailIcon} alt="ikon email" />
          <input 
            type='email' 
            name='email' 
            placeholder='Email' 
            value={form.email}
            onChange={handleChange} 
          />
        </div>
        <div className='inputs'>
          <img src={passIcon} alt="ikon kata sandi" />
          <input 
            type='password' 
            name='password' 
            placeholder='Password' 
            value={form.password}
            onChange={handleChange} 
          />
        </div>
        <div className="forgot-password">
          Lupa Kata Sandi? <span onClick={() => handleActionClick("LupaPassword")}>Klik Di sini</span>
        </div>
        <div className="captcha-container">
            <ReCAPTCHA
              sitekey="6LesWTIqAAAAAIZQEeNjMBOHOBPyH9m8OAz3vwv-"
              onChange={handleCaptchaChange} // Pasangkan event handler untuk captcha
            />
        </div>
        <div className='submit-container'>
          <button 
            type="button"
            className='submit'
            onClick={() => handleActionClick("Daftar")}
          >
            Daftar
          </button>
          <button 
            type="submit"
            className='submit'
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>
      <Modal
        isOpen={alert.status}
        onRequestClose={closeModal}
        contentLabel="Error Message"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-content">
          <p>{alert.message}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
