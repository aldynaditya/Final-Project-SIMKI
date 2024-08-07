import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import emailIcon from '../../images/email.png';
import { forgotPassword } from '../../redux/patient/forgot/actions';
import '../../Style/Pasien/LupaPass.css';

const LupaPass = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.forgotPassword);
  const [alert, setAlert] = useState({
    status: false,
    message: '',
    type: ''
  });
  const [navigateAfterClose, setNavigateAfterClose] = useState(false);

  const handleSubmit = () => {
    if (email.trim() === '') {
      setAlert({
        status: true,
        message: 'Isi email',
        type: 'danger'
      });
      return;
    }
    setAlert({ status: false, message: '' }); // Reset alert before dispatching
    dispatch(forgotPassword(email));
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
        message: 'Email sent successfully!',
        type: 'success'
      });
      setNavigateAfterClose(true);
    }
  }, [data]);

  const closeModal = () => {
    setAlert({ status: false, message: '' });
    if (navigateAfterClose) {
      setNavigateAfterClose(false);
      navigate('/login');
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <h1 className='text-lupapass'>Lupa Kata Sandi</h1>
        <p className='text-ket-lupapass'>Silahkan masukkan email yang telah terdaftar. Link untuk mengubah password kami kirimkan ke email Anda.</p>
        <div className='input'>
          <img src={emailIcon} alt="ikon email" />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='submit' onClick={handleSubmit} disabled={loading}>
          {loading ? 'Loading...' : 'Kirim'}
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
    </div>
  );
};

export default LupaPass;
