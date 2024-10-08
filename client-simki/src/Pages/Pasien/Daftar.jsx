import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../../Style/Pasien/Daftar.css';
import { daftarUser } from '../../redux/patient/daftar/actions';
import ReCAPTCHA from "react-google-recaptcha";

const Daftar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(state => state.daftar);
  const [navigateAfterClose, setNavigateAfterClose] = useState(false);

  const [userData, setUserData] = useState({
    nama_lengkap: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    gol_darah: '',
    kewarganegaraan: '',
    alamat: '',
    nik: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [alert, setAlert] = useState({
    status: false,
    message: '',
    type: ''
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formError, setFormError] = useState('');

  const isFormValid = useCallback(() => {
    return (
      Object.values(userData).every(value => value.trim() !== '') &&
      captchaVerified
    );
  }, [userData, captchaVerified]);

  useEffect(() => {
    if (!isFormValid()) {
      setFormError('Isi seluruh form dan selesaikan captcha');
    } else {
      setFormError('');
    }
  }, [userData, isFormValid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'nik') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setUserData({
        ...userData,
        [name]: numericValue
      });
    } else {
      setUserData({
        ...userData,
        [name]: value
      });
    }
  };

  const handleDaftar = async () => {
    if (!isFormValid()) {
      setAlert({
        status: true,
        message: 'Isi seluruh form dan selesaikan captcha',
        type: 'danger'
      });
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setAlert({
        status: true,
        message: 'Passwords do not match!',
        type: 'danger'
      });
      return;
    }

    const formattedUserData = {
      ...userData,
      tanggal_lahir: new Date(userData.tanggal_lahir).toISOString()
    };

    setAlert({ status: false, message: '' });
    dispatch(daftarUser(formattedUserData));
  };

  useEffect(() => {
    if (error) {
      setAlert({
        status: true,
        message: error,
        type: 'danger'
      });
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      setAlert({
        status: true,
        message: 'Kode OTP telah dikirimkan ke Emailmu',
        type: 'success'
      });
      setNavigateAfterClose(true);
    }
  }, [user]);

  const closeModal = () => {
    setAlert({ status: false, message: '' });
    if (navigateAfterClose) {
      setNavigateAfterClose(false);
      navigate('/aktivasi-akun');
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  return (
    <div className="regist_container">
      <h1 className='title-resgitrasi'>Registrasi Akun</h1>
      <div className="form-container">
        <div className="form-fields">
          {formError && <p className="error_message">{formError}</p>}
          <div className='nama'>
            <input 
              type="text" 
              name="nama_lengkap" 
              placeholder="Nama Lengkap (Sesuai KTP)" 
              value={userData.nama_lengkap} 
              onChange={handleChange} 
            />
          </div>
          <div className='tempat-tanggal-lahir'>
            <div className='field-container'>
              <input 
                type="text" 
                name="tempat_lahir" 
                placeholder="Tempat Lahir" 
                value={userData.tempat_lahir} 
                onChange={handleChange} 
              />
            </div>
            <div className='field-container'>
              <input 
                type="date" 
                name="tanggal_lahir" 
                placeholder="Tanggal Lahir" 
                value={userData.tanggal_lahir} 
                onChange={handleChange} 
              />
            </div>
          </div>
          <div className='gender'>
            <select 
              name="jenis_kelamin" 
              value={userData.jenis_kelamin} 
              onChange={handleChange}
            >
              <option value="" disabled hidden>Pilih Jenis Kelamin</option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>
          <div className='blood'>
            <select 
              name="gol_darah" 
              value={userData.gol_darah} 
              onChange={handleChange}
            >
              <option value="" disabled hidden>Pilih Golongan Darah</option>
              <option value="O">O</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
            </select>
          </div>
          <div className='suku'>
            <select 
              name="kewarganegaraan" 
              value={userData.kewarganegaraan} 
              onChange={handleChange}
            >
              <option value="" disabled hidden>Pilih Kewarganegaraan</option>
              <option value="WNI">WNI</option>
              <option value="WNA">WNA</option>
            </select>
          </div>
          <div className='alamat'>
            <input 
              type="text" 
              name="alamat" 
              placeholder="Alamat" 
              value={userData.alamat} 
              onChange={handleChange} 
            />
          </div>
          <div className='nik'>
            <input 
              type="text" 
              name="nik" 
              placeholder="NIK" 
              pattern="\d{16}" 
              maxLength="16" 
              value={userData.nik} 
              onChange={handleChange} 
            />
          </div>
          <div className='email'>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={userData.email} 
              onChange={handleChange} 
            />
          </div>
          <div className='password'>
            <input 
              type="password" 
              name="password" 
              placeholder="Kata Sandi" 
              value={userData.password} 
              onChange={handleChange} 
            />
          </div>
          <div className='password'>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Ulang Kata Sandi" 
              value={userData.confirmPassword} 
              onChange={handleChange} 
            />
          </div>
          <div className="captcha-container">
            <ReCAPTCHA
              sitekey="6LesWTIqAAAAAIZQEeNjMBOHOBPyH9m8OAz3vwv-"
              onChange={handleCaptchaChange}
            />
          </div>
          <div className="daftar-container">
            <div 
              className='daftar' 
              onClick={handleDaftar} 
              style={{ pointerEvents: isFormValid() ? 'auto' : 'none' }}
            >
              {loading ? 'Loading...' : 'Daftar'}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={alert.status}
        onRequestClose={closeModal}
        contentLabel="Alert Message"
        className="Modal"
        overlayClassName="Overlay"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <div className="modal-content">
          <p>{alert.message}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default Daftar;
