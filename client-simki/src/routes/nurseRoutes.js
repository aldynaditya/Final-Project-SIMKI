import { Route, Routes } from 'react-router-dom';

import Perawat from '../Pages/Perawat';
import JadwalDokter from '../Pages/Perawat/JadwalDokter';
import EmrPerawat from '../Pages/Perawat/EmrPerawat';
import PasienPerawat from '../Pages/Perawat/PasienPerawat';
import KelolaItem from '../Pages/Perawat/KelolaItem';
import DetailEpsPer from '../components/DetailEpisode';

export function NursesRoute() {
    return (
        <Routes>
            <Route path="/" element={<Perawat />} />
            <Route path="pasien-perawat" element={<PasienPerawat />} />
            <Route path="jadwal-dokter" element={<JadwalDokter />} />
            <Route path="kelola-item" element={<KelolaItem />} />
            <Route path="/pasien-perawat/emr-perawat/:id" element={<EmrPerawat />} />
            <Route path="/detail-episode" element={<DetailEpsPer />} />
        </Routes>
    );
}
