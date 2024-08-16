import { Route, Routes } from 'react-router-dom';

import Resepsionis from '../Pages/Resepsionis/Resepsionis';
import PendaftarBaru from '../Pages/Resepsionis/DataPasien';
import Antrian from '../Pages/Resepsionis/Antrian';
import IdentitasPasien from '../Pages/Resepsionis/IdentitasPasien';
import Emr from '../Pages/Dokter/Emr';
import PasienDokter from '../Pages/Dokter/Pasien';
import DetailEpsResep from '../components/DetailEpisode';
import CetakSuratPopup from '../Pages/Resepsionis/CetakSuratPopup';
import KelolaJadwal from '../Pages/Resepsionis/KelolaJadwal';

export function ReceptionistRoute() {
    return (
        <Routes>
            <Route path="/" element={<Resepsionis />} />
            <Route path="pendaftar-baru" element={<PendaftarBaru />} />
            <Route path="antrian" element={<Antrian />} />
            <Route path="pasien-dokter" element={<PasienDokter />} />
            <Route path="kelola-jadwal" element={<KelolaJadwal />} />
            <Route path="identitas-pasien/:id" element={<IdentitasPasien />} />
            <Route path="emr-pasien/:id" element={<Emr />} />
            <Route path="detail-episode/:id" element={<DetailEpsResep />} />
            <Route path="cetaksurat-popup" element={<CetakSuratPopup />} />
        </Routes>
    );
}
