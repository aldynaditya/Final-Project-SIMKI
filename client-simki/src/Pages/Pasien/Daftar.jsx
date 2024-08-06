import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../../Style/Pasien/Daftar.css';
import { daftarUser } from '../../redux/patient/daftar/actions';

const Daftar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.daftar);

  const [userData, setUserData] = useState({
    nama_lengkap: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    gol_darah: '',
    suku_bangsa: '',
    alamat: '',
    nik: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [userErrors, setUserErrors] = useState({
    nama_lengkap: 'nama harus diisi',
    tempat_lahir: 'tempat lahir harus diisi',
    tanggal_lahir: 'tanggal lahir harus diisi',
    jenis_kelamin: 'jenis kelamin harus diisi',
    gol_darah: 'golongan darah harus diisi',
    suku_bangsa: 'suku bangsa harus diisi',
    alamat: 'alamat harus diisi',
    nik: 'nik harus diisi',
    email: 'email harus diisi',
    password: 'password harus diisi',
    confirmPassword: 'password harus diisi'
  });

  const [alert, setAlert] = useState({
    status: false,
    message: '',
    type: ''
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
    setUserErrors({
      ...userErrors,
      [e.target.name]: e.target.value ? '' : `${e.target.name.charAt(0).toUpperCase() + e.target.name.slice(1)} harus diisi.`
    });
  };

  const handleDaftar = async () => {
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

    try {
      await dispatch(daftarUser(formattedUserData));
      navigate('/aktivasi-akun');
    } catch (err) {
      setAlert({
        status: true,
        message: error || 'Registration failed!',
        type: 'danger'
      });
    }
  };

  const closeModal = () => {
    setAlert({ status: false, message: '', type: '' });
  };

  const isFormValid = () => {
    return Object.values(userData).every(value => value.trim() !== '');
  };

  return (
    <div className="regist_container">
      <h1>Registrasi Akun</h1>
      <div className="form-container">
        <div className="form-fields">
        {userErrors.nama_lengkap && <p className="error_message">{userErrors.nama_lengkap}</p>}
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
              {userErrors.tempat_lahir && <p className="error_message">{userErrors.tempat_lahir}</p>}
              <input 
                type="text" 
                name="tempat_lahir" 
                placeholder="Tempat Lahir" 
                value={userData.tempat_lahir} 
                onChange={handleChange} 
              />
            </div>
            <div className='field-container'>
              {userErrors.tanggal_lahir && <p className="error_message">{userErrors.tanggal_lahir}</p>}
              <input 
                type="date" 
                name="tanggal_lahir" 
                placeholder="Tanggal Lahir" 
                value={userData.tanggal_lahir} 
                onChange={handleChange} 
              />
            </div>
          </div>
          {userErrors.jenis_kelamin && <p className="error_message">{userErrors.jenis_kelamin}</p>}
          <div className='gender'>
            <select 
              name="jenis_kelamin" 
              value={userData.jenis_kelamin} 
              onChange={handleChange}
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>
          {userErrors.gol_darah && <p className="error_message">{userErrors.gol_darah}</p>}
          <div className='blood'>
            <select 
              name="gol_darah" 
              value={userData.gol_darah} 
              onChange={handleChange}
            >
              <option value="">Pilih Golongan Darah</option>
              <option value="O">O</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
            </select>
          </div>
          {userErrors.suku_bangsa && <p className="error_message">{userErrors.suku_bangsa}</p>}
          <div className='suku'>
            <select 
              name="suku_bangsa" 
              value={userData.suku_bangsa} 
              onChange={handleChange}
            >
              <option value="">Pilih Suku Bangsa</option>
              <option value="WNI">WNI</option>
              <option value="WNA">WNA</option>
            </select>
          </div>
          {userErrors.alamat && <p className="error_message">{userErrors.alamat}</p>}
          <div className='alamat'>
            <input 
              type="text" 
              name="alamat" 
              placeholder="Alamat" 
              value={userData.alamat} 
              onChange={handleChange} 
            />
          </div>
          {userErrors.nik && <p className="error_message">{userErrors.nik}</p>}
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
          {userErrors.email && <p className="error_message">{userErrors.email}</p>}
          <div className='email'>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={userData.email} 
              onChange={handleChange} 
            />
          </div>
          {userErrors.password && <p className="error_message">{userErrors.password}</p>}
          <div className='password'>
            <input 
              type="password" 
              name="password" 
              placeholder="Kata Sandi" 
              value={userData.password} 
              onChange={handleChange} 
            />
          </div>
          {userErrors.confirmPassword && <p className="error_message">{userErrors.confirmPassword}</p>}
          <div className='password'>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Ulang Kata Sandi" 
              value={userData.confirmPassword} 
              onChange={handleChange} 
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
