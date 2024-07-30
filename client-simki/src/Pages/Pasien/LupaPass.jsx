import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import emailIcon from '../../images/email.png';
import { forgotPassword } from '../../redux/forgot/actions';
import '../../Style/Pasien/LupaPass.css';

const LupaPass = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.forgotPassword);

  const handleSubmit = () => {
    dispatch(forgotPassword(email));
  };

  const closeModal = () => {
    if (data) navigate('/login');
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? <p>Loading...</p> : <p>{error ? error : 'Email sent successfully!'}</p>}
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default LupaPass;
