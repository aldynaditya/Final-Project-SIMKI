import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Dokter/Dokter.css';
import Header from '../../components/Header'; // Import the reusable Header component
import notif from "../../images/notif.png";
import user from "../../images/user.png";
import agenda from "../../images/agenda.png";

const Dokter = () => {
  const navigate = useNavigate();

  const JADWAL_PATH = 'schedule-dokter';
  const PASIEN_PATH = 'pasien-dokter';
  const NOTIFIKASI_PATH = 'notifikasi-dokter';

  const handleNavigation = (path) => {
    navigate(path);
  };

  const Menudokter = [
    { name: "Jadwal Dokter", path: JADWAL_PATH },
    { name: "Pasien", path: PASIEN_PATH },
    { name: "Notifikasi", path: NOTIFIKASI_PATH }
  ];

  return (
    <div className='dokter-container'>
      <div className='main-content-dokter'>
        <Header accountName="Nama Akun Dokter" menuItems={Menudokter} /> {/* Use the reusable Header component */}
        <h1 className='text_dokter'>Dashboard</h1>
        <div className="klik_dokter">
          <div className="jadwal_dokter" onClick={() => handleNavigation(JADWAL_PATH)}>
            <img src={agenda} alt='jadwal_dokter' className='icon' />
            <p>JADWAL DOKTER</p>
          </div>
          <div className="pasien" onClick={() => handleNavigation(PASIEN_PATH)}>
            <img src={user} alt='pasien' className='icon' />
            <p>PASIEN</p>
          </div>
          <div className="notifikasi" onClick={() => handleNavigation(NOTIFIKASI_PATH)}>
            <img src={notif} alt='notifikasi' className='icon' />
            <p>NOTIFIKASI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dokter;
