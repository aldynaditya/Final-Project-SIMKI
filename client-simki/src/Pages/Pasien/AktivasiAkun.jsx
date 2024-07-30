import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import emailIcon from '../../images/email.png';
import otpIcon from '../../images/otp.png';
import '../../Style/Pasien/AktivasiAkun.css';
import { activateAccount } from '../../redux/activated/actions';

const AktivasiAkun = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: '',
    otp: ''
  });

  const [alert, setAlert] = useState({
    status: false,
    message: '',
    type: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await dispatch(activateAccount(form));
      setAlert({
        status: true,
        message: 'Account activated successfully!',
        type: 'success'
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setAlert({
        status: true,
        message: 'Failed to activate account',
        type: 'danger'
      });
    }
  };

  const closeModal = () => {
    setAlert({ status: false, message: '', type: '' });
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <h1 className='text-header'>Aktivasi Akun</h1>
        <div className='input'>
          <img src={emailIcon} alt="ikon email" />
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className='input'>
          <img src={otpIcon} alt="ikon otp" />
          <input
            type='text'
            placeholder='Kode OTP'
            name='otp'
            value={form.otp}
            onChange={handleChange}
          />
        </div>
        <div className='submit' onClick={handleSubmit}>Kirim</div>
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

export default AktivasiAkun;
