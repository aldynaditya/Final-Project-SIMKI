import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarPrivate from '../../components/NavbarPrivate';
import FooterPrivate from '../../components/FooterPrivate';
import '../../Style/Dokter/Dokter.css';
import HeaderDokter from './HeaderDokter';
import notif from "../../images/notif.png";
import user from "../../images/user.png";
import agenda from "../../images/agenda.png";

const Dokter = () => {
  const navigate = useNavigate();

  const NotifikasiDokter = () => {
    navigate('/notifikasi-dokter');
  };

  const handlePasien = () => {
    navigate('/pasien-dokter');
  };

  const JadwalDokter = () => {
    navigate('/jadwal-dokter');
  };

  return (
    <div className='dokter-container'>
      <NavbarPrivate />
      <div className='main-content-dokter'>
        <HeaderDokter />
        <h1 className='text_dokter'>Dashboard</h1>
        <div className="klik_dokter">
            <div className="jadwal_dokter" onClick={JadwalDokter}>
                <img src={agenda} alt='jadwal_dokter' className='icon' />
                <p>JADWAL DOKTER</p>
            </div>
            <div className="pasien" onClick={handlePasien}>
                <img src={user} alt='pasien' className='icon' />
                <p>PASIEN</p>
            </div>
            <div className="notifikasi" onClick={NotifikasiDokter}>
                <img src={notif} alt='pasien' className='icon' />
                <p>NOTIFIKASI</p>
            </div>
        </div>
      </div>
      <FooterPrivate className='footerprivate'/>
    </div>
  );
};

export default Dokter;
