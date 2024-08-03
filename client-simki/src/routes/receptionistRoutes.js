import { Route, Routes } from 'react-router-dom';

import Resepsionis from '../Pages/Resepsionis/Resepsionis';
import PendaftarBaru from '../Pages/Resepsionis/PendaftarBaru';
import Antrian from '../Pages/Resepsionis/Antrian';
import BuatJanjiPopup from '../Pages/Resepsionis/BuatJanjiPopup';
import IdentitasPasien from '../Pages/Resepsionis/IdentitasPasien';
import EmrResepsionis from '../Pages/Resepsionis/EmrResepsionis';
import PasienResepsionis from '../Pages/Resepsionis/PasienResepsionis';
import DetailEpsResep from '../components/DetailEpisode';
import CetakSuratPopup from '../Pages/Resepsionis/CetakSuratPopup';
import KelolaJadwal from '../Pages/Resepsionis/KelolaJadwal';
import JadwalPopup from '../Pages/Resepsionis/JadwalPopup';
import PendaftarPopup from '../Pages/Resepsionis/PendaftarPopup';

export function ReceptionistRoute() {
    return (
        <Routes>
            <Route path="/" element={<Resepsionis />} />
            <Route path="pendaftar-baru" element={<PendaftarBaru />} />
            <Route path="antrian" element={<Antrian />} />
            <Route path="pasien-resepsionis" element={<PasienResepsionis />} />
            <Route path="kelola-jadwal" element={<KelolaJadwal />} />
            <Route path="antrian/buatjanji-popup" element={<BuatJanjiPopup />} />
            <Route path="identitas-pasien" element={<IdentitasPasien />} />
            <Route path="emr-resepsionis" element={<EmrResepsionis />} />
            <Route path="detail-episode" element={<DetailEpsResep />} />
            <Route path="cetaksurat-popup" element={<CetakSuratPopup />} />
            <Route path="kelola-jadwal/jadwal-popup" element={<JadwalPopup />} />
            <Route path="pendaftar-baru/pendaftar-popup" element={<PendaftarPopup />} />
        </Routes>
    );
}
