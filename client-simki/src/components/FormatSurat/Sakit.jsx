import React from 'react';
import '../../Style/Dokter/TemplateSakit.css';
import logoklinik from '../../images/logoklinik.png';
import { formatDateStrip } from '../../utils/dateUtils';
import { differenceInDays } from 'date-fns';

const TemplateSuratSakit = ({ orderInfo, orderDetails }) => {
  const jumlahHariIstirahat = differenceInDays(new Date(orderDetails.periode_end), new Date(orderDetails.periode_start)) + 1;
  const formattedDiagnosis = orderDetails.diagnosis_suratsakit.match(/.{1,50}/g).join('\n');

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
        <p className='kal-pertama-sakit'>Yang bertanda tangan di bawah ini, menerangkan bahwa:</p>
        <div className='isian-surat-sakit'>
          <p><span>Nama Lengkap</span><span>: {orderInfo.namaPasien}</span></p>
          <p><span>Tanggal Lahir</span><span>: {formatDateStrip(orderInfo.tanggalLahir)}</span></p>
          <p><span>Umur</span><span>: {orderDetails.umur}</span></p>
          <p><span>Jenis Kelamin</span><span>: {orderInfo.jenisKelamin}</span></p>
          <p><span>Pekerjaan</span><span>: {orderDetails.pekerjaan}</span></p>
          <p><span>Alamat</span><span>: {orderInfo.alamat}</span></p>
          <p><span>Diagnosis</span><span>: {formattedDiagnosis}</span></p>
        </div>
        <p className='kal-kedua-sakit'>
          Berdasarkan hasil pemeriksaan yang telah dilakukan, pasien perlu diberikan <b>ISTIRAHAT</b> selama {jumlahHariIstirahat} hari terhitung dari mulai tanggal {formatDateStrip(orderDetails.periode_start)} s.d. {formatDateStrip(orderDetails.periode_end)}
        </p>
        <p className='kal-ketiga-sakit'>
          Demikan surat keterangan ini dibuat untuk dapat dipergunakan sebagai mestinya.
        </p>
      </div>
      <div className="footer-surat-sakit">
        <p>Semarang, {formatDateStrip(orderDetails.tanggal)}</p>
        <p>Dokter penanggung jawab</p>
        <p className='ttd-dokter'>{orderInfo.pemeriksa}</p>
      </div>
    </div>
  );
};

export default TemplateSuratSakit;