import React from "react";
import '../../Style/Pasien/Home.css';
import klinikdipo from "../../images/klinikdipo.png";

const Home = () => {
  return (
    <div className="page-container">
      <div className="homepage-content">
        <h1 className="tentang_kami">Tentang Kami</h1>
        <div className="klinik_dipo">
          <img src={klinikdipo} alt="Klinik Diponegoro" />
        </div>
        <div className="desc-jam-home-container">
          <div className="desc-homepage">
            <p>
              <strong>Klinik Pratama Diponegoro 1</strong> merupakan unit layanan kesehatan dari
              UNDIP MAJU. Klinik Pratama Diponegoro 1 menjadi Fasilitas Kesehatan
              Tingkat Pertama (FKTP) bagi civitas akademika Universitas Diponegoro
              dan masyarakat di sekitar wilayah Tembalang. Klinik Pratama
              Diponegoro 1 dilengkapi dengan Pelayanan Umum dan Pelayanan Gigi
              dan juga menerima pelayanan BPJS Kesehatan - JKN.
            </p>
          </div>
          <div className="jam-homepage">
            <p><strong>Jam Operasional :</strong></p>
            <ul className="jadwal-klinik">
              <li>Senin - Sabtu (08:00 - 13.30)</li>
              <li>Senin - Sabtu (14:00 - 21:00)</li>
              <li>Minggu & Liburan Bersama</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
