import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarPrivate from '../../components/NavbarPrivate';
import FooterPrivate from '../../components/FooterPrivate';
import '../../Style/Perawat/Perawat.css';
import Header from '../../components/Header'; // Import the reusable Header component
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

  const Menuperawat = [
    { name: "Jadwal perawat", path: "/jadwal-perawat" },
    { name: "Pasien", path: "/pasien-perawat" },
    { name: "Kelola Item", path: "/kelola-item" }
  ];

  return (
    <div className='perawat-container'>
      <NavbarPrivate />
      <div className='main-content-perawat'>
        <Header accountName="Nama Akun Perawat" menuItems={Menuperawat} /> {/* Use the reusable Header component */}
        <h1 className='text_perawat'>Dashboard</h1>
        <div className="klik_perawat">
          <div className="jadwal_dokter" onClick={JadwalDokter}>
            <img src={agenda} alt='jadwal_dokter' className='icon' />
            <p>JADWAL DOKTER</p>
          </div>
          <div className="pasien" onClick={handlePasien}>
            <img src={user} alt='pasien' className='icon' />
            <p>PASIEN</p>
          </div>
          <div className="notifikasi" onClick={KelolaItem}>
            <img src={item} alt='pasien' className='icon' />
            <p>NOTIFIKASI</p>
          </div>
        </div>
      </div>
      <FooterPrivate className='footerprivate'/>
    </div>
  );
};

export default Perawat;
