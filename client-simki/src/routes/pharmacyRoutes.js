import { Route, Routes } from 'react-router-dom';

import Farmasi from '../Pages/Farmasi';
import OrderMasuk from '../Pages/Farmasi/OrderMasuk';
import KelolaObat from '../Pages/Farmasi/KelolaObat';
import TambahObat from '../Pages/Farmasi/TambahObat';
import EditObat from '../Pages/Farmasi/EditObat';

export function PharmacyRoute() {
    return (
        <Routes>
            <Route path="" element={<Farmasi />} />
            <Route path="order-masuk" element={<OrderMasuk />} />
            <Route path="kelola-obat" element={<KelolaObat />} />
            <Route path="/kelola-obat/tambah-obat" element={<TambahObat />} />
            <Route path="/kelola-obat/edit-obat" element={<EditObat />} />
        </Routes>
    );
}
