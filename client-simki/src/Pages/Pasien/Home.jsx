import React from "react";
import '../../Style/Pasien/Home.css';
import TitleSection from "../../components/TitleSection";

const Home = () => {
  return (
    <div className='home_container'>
      <div className="desc-container">
        <TitleSection 
          title="Tentang Kami" 
        />
        <p className="desc-dipo">
          <strong>Klinik Pratama Diponegoro 1</strong> merupakan unit layanan kesehatan dari
          UNDIP MAJU. Klinik Pratama Diponegoro 1 menjadi Fasilitas Kesehatan
          Tingkat Pertama (FKTP) bagi civitas akademika Universitas Diponegoro
          dan masyarakat di sekitar wilayah Tembalang. Klinik Pratama
          Diponegoro 1 dilengkapi dengan Pelayanan Umum dan Pelayanan Gigi
          dan juga menerima pelayanan BPJS Kesehatan - JKN.
        </p>
      </div>
      <div className="addition-content">
        <div className="jam-homepage">
          <p><strong>Jam Operasional :</strong></p>
            <ul>
              <li>Senin - Sabtu (08:00 - 13.30)</li>
              <li>Senin - Sabtu (14:00 - 21:00)</li>
              <li>Minggu & Liburan Bersama</li>
            </ul>
        </div>
        <div className="jam-homepage">
        </div>
      </div>
      
    </div>
  );
};

export default Home;
