import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarPrivate from '../components/NavbarPrivate';
import FooterPrivate from '../components/FooterPrivate';
import './Resepsionis.css';
import HeaderRsp from './HeaderRsp';
import list from "../images/list.png";
import antrian from "../images/antrian.png";
import user from "../images/user.png";
import agenda from "../images/agenda.png";

const Resepsionis = () => {
  const navigate = useNavigate();

  const handlePendaftarBaru = () => {
    navigate('/pendaftar-baru');
  };

  const handleAntrian = () => {
    navigate('/antrian');
  };

  const handlePasien = () => {
    navigate('/pasien-resepsionis');
  };

  const handleAgenda = () => {
    navigate('/kelola-jadwal');
  };

  return (
    <div className='resepsionis-container'>
      <NavbarPrivate />
      <div className='main-content-resepsionis'>
        <HeaderRsp />
        <h1 className='text_resepsionis'>Dashboard</h1>
        <div className="klik_resepsionis">
          <div className='pendaftar-baru' onClick={handlePendaftarBaru}>
            <img src={list} alt='Pendaftar_Baru' className='icon' />
            <p>PENDAFTAR BARU</p>
          </div>
          <div className="antrian" onClick={handleAntrian}>
            <img src={antrian} alt='Antrian' className='icon' />
            <p>ANTRIAN</p>
          </div>
          <div className="pasien" onClick={handlePasien}>
            <img src={user} alt='pasien' className='icon' />
            <p>PASIEN</p>
          </div>
          <div className="kelola_jadwal" onClick={handleAgenda}>
            <img src={agenda} alt='kelola-jadwal' className='icon' />
            <p>KELOLA JADWAL</p>
          </div>
        </div>
      </div>
      <FooterPrivate className='footer'/>
    </div>
  );
};

export default Resepsionis;
