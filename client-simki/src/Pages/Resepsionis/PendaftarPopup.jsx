import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { createPendaftar } from '../../redux/resepsionis/creatependaftar/actions';
import '../../Style/Resepsionis/PendaftarPopup.css';


const TambahPendaftar = ({ onClose , onSuccess} ) => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.createPendaftar);

  const [formData, setFormData] = useState({
    nama_lengkap: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    gol_darah: '',
    kewarganegaraan: '',
    alamat: '',
    nik: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const SimpanPendaftar = () => {
    dispatch(createPendaftar(formData));
  };

  useEffect(() => {
    if (data || error) {
      onSuccess();
      onClose();
    }
  }, [data, error, onClose]);

  const closeModal = () => {
    onClose();
  };


  return (
    <div className='tambah-pendaftar-container'>
      <div className='tambah-pendaftar-content'>
        <div className='cancel-x' onClick={onClose}>Cancel X</div>
        <h1 className='text-tambah-pendaftar'>Pendaftar Baru</h1>
        <div className='kolom-pendaftar-baru'>
          <div className='npasien-pendaftar-baru'>
            <input name='nama_lengkap' className='kolom-npasien-pendaftar-baru' value={formData.nama_lengkap} onChange={handleChange} placeholder='Nama Lengkap (Sesuai KTP)' />
          </div>
          <div className='ttl-pendaftar-baru'>
            <input name='tempat_lahir' className='kolom-tempat-pendaftar-baru' value={formData.tempat_lahir} onChange={handleChange} placeholder='Tempat' />
            <input type='date' className='kolom-tanggal-pendaftar-baru' name='tanggal_lahir' value={formData.tanggal_lahir} onChange={handleChange} placeholder='Tanggal Lahir' />
          </div>
          <div className='gender-pendaftar-baru'>
            <select name='jenis_kelamin' value={formData.jenis_kelamin} onChange={handleChange} className='kolom-blood-pendaftar-baru'>
              <option value=''>Pilih Jenis Kelamin</option>
              <option value='laki-laki'>laki-laki</option>
              <option value='perempuan'>perempuan</option>
            </select>
          </div>
          <div className='blood-pendaftar-baru'>
            <select name='gol_darah' value={formData.gol_darah} onChange={handleChange} className='kolom-blood-pendaftar-baru'>
              <option value=''>Pilih Golongan Darah</option>
              <option value='O'>O</option>
              <option value='A'>A</option>
              <option value='B'>B</option>
              <option value='AB'>AB</option>
            </select>
          </div>

          <div className='suku-pendaftar-baru'>
            <select name='kewarganegaraan' value={formData.kewarganegaraan} onChange={handleChange} className='kolom-bangsa-pendaftar-baru' >
              <option value=''>Pilih Kewarganegaraan</option>
              <option value='WNI'>WNI</option>
              <option value='WNA'>WNA</option>
            </select>
          </div>
          <div className='alamat-pendaftar-baru'>
            <input name='alamat' value={formData.alamat} onChange={handleChange} placeholder='Alamat Lengkap' className='kolom-alamat-pendaftar-baru' />
          </div>
          <div className='nik-pendaftar-baru'>
            <input name='nik' value={formData.nik} onChange={handleChange} placeholder='NIK'  className='kolom-nik-pendaftar-baru'/>
          </div>
        </div>
        <div className='tambahpendaftar-container'>
          <button className='button-tambahpendaftar' onClick={SimpanPendaftar} disabled={loading}>Simpan</button>
        </div>
        <Modal isOpen={!!error} onRequestClose={closeModal}>
          <div className="modal-content">
            <p>{error}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>  
      </div>
    </div>
  );
};

export default TambahPendaftar;