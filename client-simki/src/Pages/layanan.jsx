import React from 'react';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import klinikdipo from "../images/klinikdipo.png";
import './layanan.css';

const Layanan = () => {
  return (
    <div className='layanan_container'>
      <Navbar />
      <h1 className="layanan_kami">Layanan Kami</h1>
      <div className="klinik_dipo">
        <img src={klinikdipo} alt='Klinik Diponegoro' />
      </div>
      <div className="desc">
        <p>
          Klinik Diponegoro 1 menyediakan berbagai fasilitas untuk memenuhi
          kebutuhan kesehatan masyarakat, termasuk poli umum dan poli gigi.
          Poli umum menawarkan pemeriksaan kesehatan rutin, diagnostik dengan
          alat canggih, pengobatan dan vaksinasi, serta tindakan canggih.
          Poli gigi menyediakan layanan pemeriksaan dan konsultasi gigi,
          perawatan preventif seperti pembersihan dan aplikasi fluoride, serta
          perawatan kuratif dan estetika. Dengan tenaga medis yang kompeten dan
          peralatan modern, kedua poli ini memastikan pasien mendapatkan
          perawatan kesehatan yang komprehensif dan berkualitas.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Layanan;
