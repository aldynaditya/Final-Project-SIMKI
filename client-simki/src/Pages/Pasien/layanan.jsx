import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from '../../components/Footer';
import klinikdipo from "../../images/klinikdipo.png";
import '../../Style/Pasien/layanan.css';

const Layanan = () => {
  return (
    <div className='layanan_container'>
      <Navbar />
      <h1 className="layanan_kami">Layanan Kami</h1>
      <div className="klinik_dipo">
        <img src={klinikdipo} alt='Klinik Diponegoro' />
      </div>
      <div className="desc-layanan">
        <p>
          <strong>Klinik Diponegoro 1</strong> menyediakan berbagai fasilitas untuk memenuhi
          kebutuhan kesehatan masyarakat, termasuk poli umum dan poli gigi. Poli umum
          menawarkan pemeriksaan kesehatan rutin, diagnostik dengan alat canggih, pengobatan
          dan vaksinasi, konsultasi kesehatan, serta tindakan medis dasar seperti penanganan
          luka dan perawatan kondisi akut. Sementara itu, poli gigi menyediakan layanan
          pemeriksaan dan konsultasi gigi, perawatan preventif seperti pembersihan dan aplikasi
          fluoride, perawatan kuratif seperti penambalan dan pencabutan gigi, serta perawatan
          estetika termasuk ortodonti dan pemutihan gigi. Poli gigi juga melakukan tindakan
          bedah kecil dan menyediakan prostodonti untuk gigi tiruan dan penggantian gigi yang
          hilang. Dengan tenaga medis yang kompeten dan peralatan modern, kedua poli ini
          memastikan pasien mendapatkan perawatan kesehatan yang komprehensif dan berkualitas.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Layanan;
