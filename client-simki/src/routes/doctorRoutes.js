import { Route, Routes } from 'react-router-dom';

import Dokter from '../Pages/Dokter';
import PasienDokter from '../Pages/Dokter/Pasien';
import NotifikasiDokter from '../Pages/Dokter/Notifikasi';
import Schedule from '../Pages/Dokter/Schedule';
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
import HasilKuisionerPopup from '../Pages/Dokter/HasilKuisionerPopup';
import DetailEpsDok from '../components/DetailEpisode';

export function DoctorsRoute() {
    return (
        <Routes>
            <Route path="/" element={<Dokter />} />
            <Route path="pasien-dokter" element={<PasienDokter />} />
            <Route path="notifikasi-dokter" element={<NotifikasiDokter/>} />
            <Route path="schedule-dokter" element={<Schedule/>} />
            <Route path="/pasien-dokter/emr-dokter" element={<EmrDokter />} />
            <Route path="/pasien-dokter/emr-dokter/:entri/isi-cppt" element={<IsiCppt />} />
            <Route path="/pasien-dokter/emr-dokter/:entri/order-obat" element={<OrderObat />} />
            <Route path="/pasien-dokter/emr-dokter/:entri/order-obat/tambah-obat" element={<TambahObatDr />} />
            <Route path="/pasien-dokter/emr-dokter/:entri/order-prosedur" element={<OrderProsedur />} />
            <Route path="/pasien-dokter/emr-dokter/:entri/order-prosedur/tambah-prosedur" element={<TambahProsedur />} />
            <Route path="/pasien-dokter/emr-dokter/:entri/order-surat" element={<OrderSurat />} />
            <Route path="/pasien-dokter/emr-dokter/:entri/order-surat/surat-rujukan" element={<SuratRujukan />} />
            <Route path="/pasien-dokter/emr-dokter/:entri/order-surat/surat-sakit" element={<SuratSakit />} />
            <Route path="/pasien-dokter/emr-dokter/entri-masuk" element={<EntriMasuk />} />
            <Route path="/pasien-dokter/emr-dokter/entri-baru" element={<EntriBaru />} />
            <Route path="hasilkuisioner-popup" element={<HasilKuisionerPopup />} />
            <Route path="/detail-episode" element={<DetailEpsDok />} />
        </Routes>
    );
}