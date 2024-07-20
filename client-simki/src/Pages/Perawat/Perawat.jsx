import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarPrivate from '../../components/NavbarPrivate';
import FooterPrivate from '../../components/FooterPrivate';
import '../../Style/Perawat/Perawat.css';
import HeaderNrs from './HeaderNrs';
import item from "../../images/item.png";
import user from "../../images/user.png";
import agenda from "../../images/agenda.png";

const Perawat = () => {
  const navigate = useNavigate();

  const KelolaItem = () => {
    navigate('/kelola-item');
  };

  const handlePasien = () => {
    navigate('/pasien-resepsionis');
  };

  const JadwalDokter = () => {
    navigate('/jadwal-dokter');
  };

  return (
    <div className='perawat-container'>
      <NavbarPrivate />
      <div className='main-content-perawat'>
        <HeaderNrs />
        <h1 className='text_perawat'>Dashboard</h1>
        <div className="klik_perawat">
            <div className="jadwal_dokter" onClick={JadwalDokter}>
                <img src={agenda} alt='jadwal_dokte' className='icon' />
                <p>JADWAL DOKTER</p>
            </div>
            <div className="pasien" onClick={handlePasien}>
                <img src={user} alt='pasien' className='icon' />
                <p>PASIEN</p>
            </div>
            <div className="kelola_item" onClick={KelolaItem}>
                <img src={item} alt='pasien' className='icon' />
                <p>KELOLA ITEM</p>
            </div>
        </div>
      </div>
      <FooterPrivate className='footerprivate'/>
    </div>
  );
};

export default Perawat;
