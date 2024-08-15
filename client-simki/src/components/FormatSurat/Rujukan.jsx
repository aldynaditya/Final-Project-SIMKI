import React from 'react';
import '../../Style/Dokter/TemplateSakit.css';
import '../../Style/Dokter/TemplateRujukan.css';
import logoklinik from '../../images/logoklinik.png';

const TemplateSuratRujukan = ({ data }) => {
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
        <h3 className='judul-surat-sakit'>SURAT RUJUKAN</h3>
        <div className='isian-rujukan-satu'>
            <p className='kepada-yth'>Kepada Yth. :</p>
            <p className=''>Di :</p>
        </div>
        <p className='kal-satu-rujukan'>Mohon pemeriksaan dan penanganan lebih lanjut pasien :</p>
        <div className='isian-surat-sakit'>
            <p>Nama Lengkap     :</p>
            <div className='ttl-umur-sakit'>
                <p className='ttl-surat-sakit'>Tanggal Lahir    :</p>
                <p className='umur-surat-sakit'>Umur    :</p>
            </div>
            <p>Jenis Kelamin    :</p>
        </div>

        <div className='isian-surat-rujukan'>
            <p>Diagnosis    :</p>
            <p>Tindakan yang</p>
            <p>telah diberikan  :</p>
            <p>Keterangan        :</p>
        </div>
        <p className='kal-dua-rujukan'>
            Demikian rujukan ini kami sampaikan atas perhatian dan kerjasamanya kami ucapkan terima 
            kasih banyak.
        </p>
      </div>
      <div className="footer-surat-rujukan">
        <p>Hormat kami</p>
        <p>Semarang, <input type="date" /></p>
        <p>Dokter penanggung jawab</p>
        <p className='ttd-dokter-rujukan'>(Nama Dokter)</p>
      </div>
    </div>
  );
};

export default TemplateSuratRujukan;