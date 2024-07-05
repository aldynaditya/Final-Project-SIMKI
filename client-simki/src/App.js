import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Layanan from './Pages/layanan';
import Login from './Pages/login';
import KebijakanPrivasi from './Pages/KebijakanPrivasi';
import LupaPass from './Pages/LupaPass';
import Daftar from './Pages/Daftar';
import HalamanPasien from './Pages/HalamanPasien';
import Profile from './Pages/Profile';
import RiwayatKunjungan from './Pages/RiwayatKunjungan';
import BuatJanji from './Pages/BuatJanji';
import DetailKunjungan from './Pages/DetailKunjungan';
import QuestionnairePopup from './Pages/QuestionnairePopup';
import SigninPrivate from './Pages/SigninPrivate';
import Resepsionis from './PagesResepsionis/Resepsionis';
import PendaftarBaru from './PagesResepsionis/PendaftarBaru';
import Antrian from './PagesResepsionis/Antrian';
import BuatJanjiPopup from './PagesResepsionis/BuatJanjiPopup';
import IdentitasPasien from './PagesResepsionis/IdentitasPasien';
import EmrResepsionis from './PagesResepsionis/EmrResepsionis';
import PasienResepsionis from './PagesResepsionis/PasienResepsionis';
import DetailEpsResep from './PagesResepsionis/DetailEpsResep';
import CetakSuratPopup from './PagesResepsionis/CetakSuratPopup';
import HasilKuisionerPopup from './PagesDokter/HasilKuisionerPopup';
import Perawat from './PagesPerawat/Perawat';
import JadwalDokter from './PagesPerawat/JadwalDokter';
import EmrPerawat from './PagesPerawat/EmrPerawat';
import PasienPerawat from './PagesPerawat/PasienPerawat';
import KelolaItem from './PagesPerawat/KelolaItem';
import TambahItemPopup from './PagesPerawat/TambahitemPopup';
import Dokter from './PagesDokter/Dokter';
import PasienDokter from './PagesDokter/PasienDokter';
import NotifikasiDokter from './PagesDokter/Notifikasi';
import ScheduleDr from './PagesDokter/ScheduleDr';
import EmrDokter from './PagesDokter/EmrDokter';
import EntriMasuk from './PagesDokter/EntriMasuk';
import IsiCppt from './PagesDokter/IsiCppt';
import EntriBaru from './PagesDokter/EntriBaru';
import OrderObat from './PagesDokter/OrderObat';
import OrderProsedur from './PagesDokter/OrderProsedur';
import OrderSurat from './PagesDokter/OrderSurat';
import SuratRujukan from './PagesDokter/SuratRujukan';
import SuratSakit from './PagesDokter/SuratSakit';
import Farmasi from './PagesFarmasi/Farmasi';
import OrderMasuk from './PagesFarmasi/OrderMasuk';
import KelolaObat from './PagesFarmasi/KelolaObat';
import TambahObat from './PagesFarmasi/TambahObat';
import TransaksiKasir from './PagesKasir/TransaksiKasir';
import DetailFaktur from './PagesKasir/DetailFaktur';
import TransaksiKeuangan from './PagesKeuangan/TransaksiSpv';
import NotifikasiKeuangan from './PagesKeuangan/NotifikasiSpv';
import NotifikasiPimpinan from './PagesPimpinan/NotifikasiLead';




function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
