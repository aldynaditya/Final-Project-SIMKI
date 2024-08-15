import React from 'react';
import '../../Style/Dokter/TemplateSakit.css';
import logoklinik from '../../images/logoklinik.png';

const TemplateSuratSakit = () => {
  return (
    <div className="template-surat-sakit-container">
      <div className="template-surat-sakit-header">
        <img src={logoklinik} alt='Logo Klinik' className='logo_klinik' />
        <div className='ket-header'>
            <h2>KLINIK PRATAMA DIPONEGORO I</h2>
            <p>Jln. Prof. H. Soedarto, S.H., Tembalang, Kota Semarang, Jawa Tengah</p>
            <p>Telp. (082) 242780601</p>
            <p>Email: klinikpratamadiponegoro@gmail.com</p>
        </div>
      </div>
      <div className="content-surat-sakit">
        <h3 className='judul-surat-sakit'>SURAT KETERANGAN SAKIT</h3>
        <p className='kal-pertama-sakit'>Yang bertanda tangan di bawah ini, menarangkan bahwa:</p>
        <div className='isian-surat-sakit'>
            <p>Nama Lengkap     :</p>
            <div className='ttl-umur-sakit'>
                <p className='ttl-surat-sakit'>Tanggal Lahir    :</p>
                <p className='umur-surat-sakit'>Umur    :</p>
            </div>
            <p>Jenis Kelamin    :</p>
            <p>Pekerjaan        :</p>
            <p>Alamat           :</p>
            <p>Diagnosis        :</p>
        </div>
        <p className='kal-kedua-sakit'>
          Berdasarkan hasil pemeriksaan yang telah dilakukan, pasien perlu diberikan ISTIRAHAT
          selama <input type="number" /> hari terhitung dari mulai tanggal
          <input type="date" /> s.d. <input type="date" />
        </p>
        <p className='kal-ketiga-sakit'>
          Demikan surat keterangan ini dibuat untuk dapat dipergunakan sebagai mestinya.
        </p>
      </div>
      <div className="footer-surat-sakit">
        <p>Semarang, <input type="date" /></p>
        <p>Dokter penanggung jawab</p>
        <p className='ttd-dokter'>(Nama Dokter)</p>
      </div>
    </div>
  );
};

export default TemplateSuratSakit;