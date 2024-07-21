import { Route, Routes } from 'react-router-dom';

import Keuangan from '../Pages/Keuangan';
import TransaksiKeuangan from '../Pages/Keuangan/TransaksiSpv';
import NotifikasiKeuangan from '../Pages/Keuangan/NotifikasiSpv';
import UploadLaporan from '../Pages/Keuangan/UploadLaporan';

export function SupervisorRoute() {
    return (
        <Routes>
            <Route path="/" element={<Keuangan />} />
            <Route path="/transaksi-keuangan" element={<TransaksiKeuangan />} />
            <Route path="/notifikasi-keuangan" element={<NotifikasiKeuangan />} />
            <Route path="/laporan-popup" element={<UploadLaporan />} />
        </Routes>
    );
}
