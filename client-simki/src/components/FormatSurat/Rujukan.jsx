import React from 'react';
import '../../Style/Dokter/TemplateSakit.css';
import '../../Style/Dokter/TemplateRujukan.css';
import logoklinik from '../../images/logoklinik.png';
import { 
  formatDateStrip,
  calculateAge
} from '../../utils/dateUtils';

const TemplateSuratRujukan = ({ orderInfo, orderDetails }) => {
  const age = calculateAge(orderInfo.tanggalLahir);

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
            <p className='kepada-yth'>Kepada Yth. {orderDetails.tujuan}</p>
            <p className=''>Di {orderDetails.tempat_tujuan}</p>
        </div>
        <p className='kal-satu-rujukan'>Mohon pemeriksaan dan penanganan lebih lanjut pasien :</p>
        <div className='isian-surat-sakit'>
            <p><span>Nama Lengkap</span><span>: {orderInfo.namaPasien}</span></p>
            <p><span>Tanggal Lahir</span><span>: {formatDateStrip(orderInfo.tanggalLahir)}</span></p>
            <p><span>Umur</span><span>: {age}</span></p>
            <p><span>Jenis Kelamin</span><span>: {orderInfo.jenisKelamin}</span></p>
        </div>

        <div className='isian-surat-sakit'>
            <p><span>Diagnosis</span><span>: {orderDetails.diagnosis_suratrujukan}</span></p>
            <p><span>Tindakan</span><span>: {orderDetails.tindakan}</span></p>
            <p><span>Keterangan</span><span>: {orderDetails.keterangan}</span></p>
        </div>
        <p className='kal-dua-rujukan'>
            Demikian rujukan ini kami sampaikan atas perhatian dan kerjasamanya kami ucapkan terima 
            kasih banyak.
        </p>
      </div>
      <div className="footer-surat-rujukan">
        <p>Hormat kami</p>
        <p>Semarang, {formatDateStrip(orderDetails.tanggal)}</p>
        <p>Dokter penanggung jawab</p>
        <p className='ttd-dokter-rujukan'>{orderInfo.pemeriksa}</p>
      </div>
    </div>
  );
};

export default TemplateSuratRujukan;