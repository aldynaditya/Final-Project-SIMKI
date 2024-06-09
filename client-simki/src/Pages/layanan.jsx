import React from 'react';
import Navbar from "../components/Navbar";
import './layanan.css';
import Footer from '../components/Footer';
import klinikdipo from "../images/klinikdipo.png";

const Layanan = () => {
  return (
    <div className='container'>
      <Navbar />
      <h1 className="center_text">Layanan Kami</h1>
      <div className="klinik_dipo">
        <img src={klinikdipo} alt='Klinik Diponegoro' className='klinik_dipo' />
      </div>
      <div className="desc">
        <p>
          <span>
          Klinik Diponegoro 1 menyediakan berbagai fasilitas untuk memenuhi
          kebutuhan kesehatan masyarakat, termasuk poli umum dan poli gigi. Poli
          umum menawarkan pemeriksaan kesehatan rutin, diagnostik dengan alat
          canggih, pengobatan dan vaksinasi, konsultasi kesehatan, serta tindakan
          canggih, pengobatan dan vaksinasi, konsultasi kesehatan, serta tindakan
          Sementara itu, poli gigi menyediakan layanan pemeriksaan dan konsultasi
          gigi, perawatan preventif seperti pembersihan dan aplikasi fluoride,
          perawatan kuratif seperti penambalan dan pencabutan gigi, serta
          perawatan estetika termasuk ortodonti dan pemutihan gigi. Poli gigi juga
          melakukan tindakan bedah kecil dan menyediakan prostodonti untuk gigi
          tiruan dan penggantian gigi yang hilang. Dengan tenaga medis yang
          kompeten dan peralatan modern, kedua poli ini memastikan pasien
          mendapatkan perawatan kesehatan yang komprehensif dan berkualitas.
          </span>
        </p>
      </div>

      
      <Footer />
    </div>
  
  );
}

export default Layanan;
