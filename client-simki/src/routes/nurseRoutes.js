import { Route, Routes } from 'react-router-dom';

import Perawat from '../Pages/Perawat';
import JadwalDokter from '../Pages/Perawat/JadwalDokter';
import PasienDokter from '../Pages/Dokter/Pasien';
import EmrPerawat from '../Pages/Perawat/InputTandaVital';
import Emr from '../Pages/Dokter/Emr';
import AntrianPerawat from '../Pages/Perawat/AntrianPerawat';
import KelolaItem from '../Pages/Perawat/KelolaItem';
import DetailEpsPer from '../components/DetailEpisode';

export function NursesRoute() {
    return (
        <Routes>
            <Route path="/" element={<Perawat />} />
            <Route path="antrian-perawat" element={<AntrianPerawat />} />
            <Route path="pasien-dokter" element={<PasienDokter />} />
            <Route path="jadwal-dokter" element={<JadwalDokter />} />
            <Route path="emr-pasien/:id" element={<Emr />} />
            <Route path="kelola-item" element={<KelolaItem />} />
            <Route path="emr-perawat/:id" element={<EmrPerawat />} />
            <Route path="detail-episode/:id" element={<DetailEpsPer />} />
        </Routes>
    );
}
