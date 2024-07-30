import { Route, Routes } from 'react-router-dom';

import HalamanPasien from '../Pages/Pasien/HalamanPasien';
import Profile from '../Pages/Pasien/Profile';
import RiwayatKunjungan from '../Pages/Pasien/RiwayatKunjungan';
import BuatJanji from '../Pages/Pasien/BuatJanji';
import DetailKunjungan from '../Pages/Pasien/DetailKunjungan';
import QuestionnairePopup from '../Pages/Pasien/QuestionnairePopup';

export function PatientRoute() {
    return (
        <Routes>
            <Route path="/" element={<HalamanPasien />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/riwayat-kunjungan" element={<RiwayatKunjungan />} />
            <Route path="/buat-janji" element={<BuatJanji />} />
            <Route path="/riwayat-kunjungan/detail-kunjungan/:id" element={<DetailKunjungan />} />
            <Route path="/questionnaire-popup" element={<QuestionnairePopup />} />
        </Routes>
    );
}
