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
      </Routes>
    </Router>
  );
}

export default App;
