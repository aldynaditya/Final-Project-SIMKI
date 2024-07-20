import { Route, Routes } from 'react-router-dom';

import Perawat from '../Pages/Perawat';
import JadwalDokter from '../Pages/Perawat/JadwalDokter';
import EmrPerawat from '../Pages/Perawat/EmrPerawat';
import PasienPerawat from '../Pages/Perawat/PasienPerawat';
import KelolaItem from '../Pages/Perawat/KelolaItem';
import TambahItemPopup from '../Pages/Perawat/TambahitemPopup';

export function DoctorsRoute() {
    return (
        <Routes>
            <Route path="/emr-perawat" element={<EmrPerawat />} />
            <Route path="/pasien-perawat" element={<PasienPerawat />} />
            <Route path="/perawat" element={<Perawat />} />
            <Route path="/jadwal-dokter" element={<JadwalDokter />} />
            <Route path="/kelola-item" element={<KelolaItem />} />
            <Route path="/tambahitem-popup" element={<TambahItemPopup />} />
        </Routes>
    );
}