import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import passIcon from '../../images/pass.png';
import { changePassword } from '../../redux/change/actions';
import '../../Style/Pasien/GantiPassword.css';

const GantiPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.changePassword);

  const handleSubmit = () => {
    const token = new URLSearchParams(window.location.search).get('token');
    dispatch(changePassword(token, newPassword, confirmPassword));
  };

  const closeModal = () => {
    if (data) navigate('/login');
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
        <div className='submit' onClick={handleSubmit}>Kirim</div>
        <Modal
          isOpen={!!error || !!data}
          onRequestClose={closeModal}
          contentLabel="Alert Message"
          className="Modal"
          overlayClassName="Overlay"
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <div className="modal-content">
            {loading ? <p>Loading...</p> : <p>{error ? error : 'Password changed successfully!'}</p>}
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default GantiPassword;
