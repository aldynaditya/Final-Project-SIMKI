import { Route, Routes } from 'react-router-dom';

import Dokter from '../Pages/Dokter';
import PasienDokter from '../Pages/Dokter/Pasien';
import NotifikasiDokter from '../Pages/Dokter/Notifikasi';
import ScheduleDr from '../Pages/Dokter/Schedule';
import EmrDokter from '../Pages/Dokter/Emr';
import EntriMasuk from '../Pages/Dokter/EntriMasuk';
import IsiCppt from '../Pages/Dokter/IsiCppt';
import EntriBaru from '../Pages/Dokter/EntriBaru';
import OrderObat from '../Pages/Dokter/OrderObat';
import OrderProsedur from '../Pages/Dokter/OrderProsedur';
import OrderSurat from '../Pages/Dokter/OrderSurat';
import SuratRujukan from '../Pages/Dokter/SuratRujukan';
import SuratSakit from '../Pages/Dokter/SuratSakit';
import TambahObatDr from '../Pages/Dokter/TambahObat';
import TambahProsedur from '../Pages/Dokter/TambahProsedur';
import HasilKuisionerPopup from './Pages/Dokter/HasilKuisionerPopup';

export function DoctorsRoute() {
    return (
        <Routes>
            <Route path="/dokter" element={<Dokter />} />
            <Route path="/pasien-dokter" element={<PasienDokter />} />
            <Route path="/notifikasi-dokter" element={<NotifikasiDokter/>} />
            <Route path="/schedule-dokter" element={<ScheduleDr/>} />
            <Route path="/emr-dokter" element={<EmrDokter />} />
            <Route path="/entri-masuk" element={<EntriMasuk />} />
            <Route path="/isi-cppt" element={<IsiCppt />} />
            <Route path="/entri-baru" element={<EntriBaru />} />
            <Route path="/surat-rujukan" element={<SuratRujukan />} />
            <Route path="/surat-sakit" element={<SuratSakit />} />
            <Route path="/tambahobat-dokter" element={<TambahObatDr />} />
            <Route path="/tambah-prosedur" element={<TambahProsedur />} />
            <Route path="/order-obat" element={<OrderObat />} />
            <Route path="/order-prosedur" element={<OrderProsedur />} />
            <Route path="/order-surat" element={<OrderSurat />} />
            <Route path="/hasilkuisioner-popup" element={<HasilKuisionerPopup />} />
        </Routes>
    );
}