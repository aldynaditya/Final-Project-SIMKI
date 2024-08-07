import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import passIcon from '../../images/pass.png';
import { changePassword } from '../../redux/patient/change/actions';
import '../../Style/Pasien/GantiPassword.css';

const GantiPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.changePassword);
  const [alert, setAlert] = useState({
    status: false,
    message: '',
    type: ''
  });
  const [navigateAfterClose, setNavigateAfterClose] = useState(false);

  const handleSubmit = () => {
    if (newPassword.trim() === '' || confirmPassword.trim() === '') {
      setAlert({
        status: true,
        message: 'Isi semua kolom password',
        type: 'danger'
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setAlert({
        status: true,
        message: 'Password dan konfirmasi password tidak cocok',
        type: 'danger'
      });
      return;
    }

    const token = new URLSearchParams(window.location.search).get('token');
    setAlert({ status: false, message: '' }); // Reset alert before dispatching
    dispatch(changePassword(token, newPassword, confirmPassword));
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
        message: 'Password changed successfully!',
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
        <h1 className='text-title'>Ganti Password</h1>
        <div className='input'>
          <img src={passIcon} alt="ikon password" />
          <input
            type='password'
            placeholder='Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className='input'>
          <img src={passIcon} alt="ikon password" />
          <input
            type='password'
            placeholder='Konfirmasi Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

export default GantiPassword;
