import { Route, Routes } from 'react-router-dom';

import Dokter from '../Pages/Dokter';
import PasienDokter from '../Pages/Dokter/Pasien';
import NotifikasiDokter from '../Pages/Dokter/Notifikasi';
import Schedule from '../Pages/Dokter/Schedule';
import EmrDokter from '../Pages/Dokter/Emr';
import EntriMasuk from '../Pages/Dokter/EntriMasuk';
import EntriBaru from '../Pages/Dokter/EntriBaru';
import OrderObat from '../Pages/Dokter/OrderObat';
import OrderProsedur from '../Pages/Dokter/OrderProsedur';
import OrderSurat from '../Pages/Dokter/OrderSurat';
import HasilKuisionerPopup from '../Pages/Dokter/HasilKuisionerPopup';
import DetailEpsDok from '../components/DetailEpisode';
import SuratSakit from '../Pages/Dokter/TemplateSakit';
import SuratRujukan from '../Pages/Dokter/TemplateRujukan';

export function DoctorsRoute() {
    return (
        <Routes>
            <Route path="/" element={<Dokter />} />
            <Route path="pasien-dokter" element={<PasienDokter />} />
            <Route path="notifikasi-dokter" element={<NotifikasiDokter/>} />
            <Route path="schedule-dokter" element={<Schedule/>} />
            <Route path="emr-dokter/:id" element={<EmrDokter />} />
            <Route path="entri-masuk/:id" element={<EntriMasuk />} />
            <Route path="entri-baru/:id" element={<EntriBaru />} />
            <Route path="order-obat/:id" element={<OrderObat />} />
            <Route path="order-prosedur/:id" element={<OrderProsedur />} />
            <Route path="order-surat/:id" element={<OrderSurat />} />
            <Route path="hasilkuisioner-popup" element={<HasilKuisionerPopup />} />
            <Route path="detail-episode/:id" element={<DetailEpsDok />} />
            <Route path="template-surat-sakit" element={<SuratSakit />} />
            <Route path="template-surat-rujukan" element={<SuratRujukan />} />
        </Routes>
    );
}