import React from "react";
import '../../Style/Pasien/Home.css';
import TitleSection from "../../components/TitleSection";

const Layanan = () => {
  return (
    <div className='layanan_container'>
      <div className="desc-container">
        <TitleSection 
          title="Layanan Kami" 
        />
        <p className="desc-dipo">
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
    </div>
  );
}

export default Layanan;
