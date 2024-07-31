import React from 'react';
import klinikdipo from "../../images/klinikdipo.png";
import '../../Style/Pasien/jadwal.css';

const Jadwal = () => {
  return (
    <div className='jadwal_container'>
      <h1 className="jadwal_kami">Jadwal</h1>
      <div className="klinik_dipo">
        <img src={klinikdipo} alt='Klinik Diponegoro' />
      </div>
      <div className="desc-jadwal">
        <p>
          tabel jadwal
        </p>
      </div>
    </div>
  );
}

export default Jadwal;
