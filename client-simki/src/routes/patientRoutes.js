import { Route, Routes } from 'react-router-dom';

import Home from '../Pages/Pasien/Home';
import Layanan from '../Pages/Pasien/layanan';
import KebijakanPrivasi from '../Pages/Pasien/KebijakanPrivasi';
import LupaPass from '../Pages/Pasien/LupaPass';
import Daftar from '../Pages/Pasien/Daftar';
import HalamanPasien from '../Pages/Pasien/HalamanPasien';
import Profile from '../Pages/Pasien/Profile';
import RiwayatKunjungan from '../Pages/Pasien/RiwayatKunjungan';
import BuatJanji from '../Pages/Pasien/BuatJanji';
import DetailKunjungan from '../Pages/Pasien/DetailKunjungan';
import QuestionnairePopup from '../Pages/Pasien/QuestionnairePopup';

export function PatientRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/layanan" element={<Layanan />} />
            <Route path="/kebijakan-privasi" element={<KebijakanPrivasi />} />
            <Route path="/lupa-password" element={<LupaPass />} />
            <Route path="/daftar" element={<Daftar />} />
            <Route path="/halaman-pasien" element={<HalamanPasien />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/riwayat-kunjungan" element={<RiwayatKunjungan />} />
            <Route path="/buat-janji" element={<BuatJanji />} />
            <Route path="/detail-kunjungan" element={<DetailKunjungan />} />
            <Route path="/questionnaire-popup" element={<QuestionnairePopup />} />
        </Routes>
    );
}
