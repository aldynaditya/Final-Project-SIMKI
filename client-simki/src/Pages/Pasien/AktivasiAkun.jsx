import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import emailIcon from '../../images/email.png';
import otpIcon from '../../images/otp.png';
import '../../Style/Pasien/AktivasiAkun.css';
import { activateAccount } from '../../redux/patient/activated/actions';

const AktivasiAkun = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.activated);
  const [navigateAfterClose, setNavigateAfterClose] = useState(false);

  const [form, setForm] = useState({
    email: '',
    otp: ''
  });

  const [alert, setAlert] = useState({
    status: false,
    message: '',
    type: ''
  });

  const [formError, setFormError] = useState('');

  const isFormValid = useCallback(() => {
    return Object.values(form).every(value => value.trim() !== '');
  }, [form]);

  useEffect(() => {
    if (!isFormValid()) {
      setFormError('Isi seluruh form');
    } else {
      setFormError('');
    }
  }, [form, isFormValid]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      setAlert({
        status: true,
        message: 'Isi seluruh form',
        type: 'danger'
      });
      return;
    }

    setAlert({ status: false, message: '' }); // Reset alert before dispatching
    dispatch(activateAccount(form));
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
    if (data) {
      setAlert({
        status: true,
        message: 'Account activated successfully!',
        type: 'success'
      });
      setNavigateAfterClose(true);
    }
  }, [data]);

  const handleActionClick = (actionType) => {
    if (actionType === "KirimKode") {
      navigate('/lupa-password');
    }
  };

  const closeModal = () => {
    setAlert({ status: false, message: '' });
    if (navigateAfterClose) {
      setNavigateAfterClose(false);
      navigate('/login');
    }
  };

  return (
    <div className="page-container-aktivasi">
      <div className="content-wrap-aktivasi">
        <h1 className='text-header'>Aktivasi Akun</h1>
        <p className='text-ket'>Ketik email yang didaftarkan dan kode verifikasi yang telah dikirim ke alamat email Anda:</p>
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
        <div className='kode-otp-ulang'>
            Belum dapat kode? <span onClick={() => handleActionClick("KirimKode")}>Kirim ulang</span>
        </div>
        <div className='submit' onClick={handleSubmit} style={{ pointerEvents: isFormValid() ? 'auto' : 'none' }}>
          {loading ? 'Processing...' : 'Kirim'}
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

export default AktivasiAkun;
