import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Dokter/Dokter.css';
import Header from '../../components/Header'; // Import the reusable Header component
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

  const Menudokter = [
    { name: "Jadwal Dokter", path: "/schedule-dokter" },
    { name: "Pasien", path: "/pasien-dokter" },
    { name: "Notifikasi", path: "/notifikasi-dokter" }
  ];

  return (
    <div className='dokter-container'>
      <div className='main-content-dokter'>
        <Header accountName="Nama Akun Dokter" menuItems={Menudokter} /> {/* Use the reusable Header component */}
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
    </div>
  );
};

export default Dokter;
