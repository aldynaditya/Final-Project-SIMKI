import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Pages/Pasien/Home';
import Layanan from './Pages/Pasien/layanan';
import Login from './Pages/Pasien/login';
import KebijakanPrivasi from './Pages/Pasien/KebijakanPrivasi';
import LupaPass from './Pages/Pasien/LupaPass';
import Daftar from './Pages/Pasien/Daftar';
import HalamanPasien from './Pages/Pasien/HalamanPasien';
import Profile from './Pages/Pasien/Profile';
import RiwayatKunjungan from './Pages/Pasien/RiwayatKunjungan';
import BuatJanji from './Pages/Pasien/BuatJanji';
import DetailKunjungan from './Pages/Pasien/DetailKunjungan';
import QuestionnairePopup from './Pages/Pasien/QuestionnairePopup';
import SigninPrivate from './Pages/signin/SigninPrivate';
import Resepsionis from './Pages/Resepsionis/Resepsionis';
import PendaftarBaru from './Pages/Resepsionis/PendaftarBaru';
import Antrian from './Pages/Resepsionis/Antrian';
import BuatJanjiPopup from './Pages/Resepsionis/BuatJanjiPopup';
import IdentitasPasien from './Pages/Resepsionis/IdentitasPasien';
import EmrResepsionis from './Pages/Resepsionis/EmrResepsionis';
import PasienResepsionis from './Pages/Resepsionis/PasienResepsionis';
import DetailEpsResep from './Pages/Resepsionis/DetailEpsResep';
import CetakSuratPopup from './Pages/Resepsionis/CetakSuratPopup';
import KelolaJadwal from './Pages/Resepsionis/KelolaJadwal';
import JadwalPopup from './Pages/Resepsionis/JadwalPopup';
import HasilKuisionerPopup from './Pages/Dokter/HasilKuisionerPopup';
import Perawat from './Pages/Perawat';
import JadwalDokter from './Pages/Perawat/JadwalDokter';
import EmrPerawat from './Pages/Perawat/EmrPerawat';
import PasienPerawat from './Pages/Perawat/PasienPerawat';
import KelolaItem from './Pages/Perawat/KelolaItem';
import TambahItemPopup from './Pages/Perawat/TambahitemPopup';
import Dokter from './Pages/Dokter';
import PasienDokter from './Pages/Dokter/Pasien';
import NotifikasiDokter from './Pages/Dokter/Notifikasi';
import ScheduleDr from './Pages/Dokter/Schedule';
import EmrDokter from './Pages/Dokter/Emr';
import EntriMasuk from './Pages/Dokter/EntriMasuk';
import IsiCppt from './Pages/Dokter/IsiCppt';
import EntriBaru from './Pages/Dokter/EntriBaru';
import OrderObat from './Pages/Dokter/OrderObat';
import OrderProsedur from './Pages/Dokter/OrderProsedur';
import OrderSurat from './Pages/Dokter/OrderSurat';
import SuratRujukan from './Pages/Dokter/SuratRujukan';
import SuratSakit from './Pages/Dokter/SuratSakit';
import TambahObatDr from './Pages/Dokter/TambahObat';
import TambahProsedur from './Pages/Dokter/TambahProsedur';
import Farmasi from './Pages/Farmasi/Farmasi';
import OrderMasuk from './Pages/Farmasi/OrderMasuk';
import KelolaObat from './Pages/Farmasi/KelolaObat';
import TambahObat from './Pages/Farmasi/TambahObat';
import TransaksiKasir from './Pages/Kasir/TransaksiKasir';
import DetailFaktur from './Pages/Kasir/DetailFaktur';
import TransaksiKeuangan from './Pages/Keuangan/TransaksiSpv';
import NotifikasiKeuangan from './Pages/Keuangan/NotifikasiSpv';
import NotifikasiPimpinan from './Pages/Pimpinan/NotifikasiLead';
import UploadLaporan from './Pages/Keuangan/UploadLaporan';
import { listen } from './redux/listener';

function App() {
  useEffect(() => {
    listen();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kebijakan-privasi" element={<KebijakanPrivasi />} />
        <Route path="/lupa-password" element={<LupaPass />} />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/halaman-pasien" element={<HalamanPasien />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/riwayat-kunjungan" element={<RiwayatKunjungan />} />
        <Route path="/buat-janji" element={<BuatJanji />} />
        <Route path="/detail-kunjungan" element={<DetailKunjungan />} />
        <Route path="/questionnaire-popup" element={<QuestionnairePopup />} />
        <Route path="/signin-private" element={<SigninPrivate />} />
        <Route path="/resepsionis" element={<Resepsionis />} />
        <Route path="/pendaftar-baru" element={<PendaftarBaru />} />
        <Route path="/antrian" element={<Antrian />} />
        <Route path="/buatjanji-popup" element={<BuatJanjiPopup />} />
        <Route path="/identitas-pasien" element={<IdentitasPasien />} />
        <Route path="/emr-resepsionis" element={<EmrResepsionis />} />
        <Route path="/pasien-resepsionis" element={<PasienResepsionis />} />
        <Route path="/detail-episode" element={<DetailEpsResep />} />
        <Route path="/cetaksurat-popup" element={<CetakSuratPopup />} />
        <Route path="/kelola-jadwal" element={<KelolaJadwal />} />
        <Route path="/jadwal-popup" element={<JadwalPopup />} />
        <Route path="/hasilkuisioner-popup" element={<HasilKuisionerPopup />} />
        <Route path="/perawat" element={<Perawat />} />
        <Route path="/jadwal-dokter" element={<JadwalDokter />} />
        <Route path="/emr-perawat" element={<EmrPerawat />} />
        <Route path="/pasien-perawat" element={<PasienPerawat />} />
        <Route path="/kelola-item" element={<KelolaItem />} />
        <Route path="/tambahitem-popup" element={<TambahItemPopup />} />
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/pasien-dokter" element={<PasienDokter />} />
        <Route path="/notifikasi-dokter" element={<NotifikasiDokter/>} />
        <Route path="/schedule-dokter" element={<ScheduleDr/>} />
        <Route path="/emr-dokter" element={<EmrDokter />} />
        <Route path="/entri-masuk" element={<EntriMasuk />} />
        <Route path="/isi-cppt" element={<IsiCppt />} />
        <Route path="/entri-baru" element={<EntriBaru />} />
        <Route path="/order-obat" element={<OrderObat />} />
        <Route path="/order-prosedur" element={<OrderProsedur />} />
        <Route path="/order-surat" element={<OrderSurat />} />
        <Route path="/surat-rujukan" element={<SuratRujukan />} />
        <Route path="/surat-sakit" element={<SuratSakit />} />
        <Route path="/farmasi" element={<Farmasi />} />
        <Route path="/order-masuk" element={<OrderMasuk />} />
        <Route path="/kelola-obat" element={<KelolaObat />} />
        <Route path="/tambah-obat" element={<TambahObat />} />
        <Route path="/transaksi-kasir" element={<TransaksiKasir />} />
        <Route path="/detail-faktur" element={<DetailFaktur />} />
        <Route path="/transaksi-keuangan" element={<TransaksiKeuangan />} />
        <Route path="/notifikasi-keuangan" element={<NotifikasiKeuangan />} />
        <Route path="/notifikasi-pimpinan" element={<NotifikasiPimpinan />} />
        <Route path="/tambahobat-dokter" element={<TambahObatDr />} />
        <Route path="/tambah-prosedur" element={<TambahProsedur />} />
        <Route path="/laporan-popup" element={<UploadLaporan />} />
      </Routes>
    </Router>
  );
}

export default App;
