import { Route, Routes } from 'react-router-dom';

import Farmasi from '../Pages/Farmasi';
import OrderMasuk from '../Pages/Farmasi/OrderMasuk';
import KelolaObat from '../Pages/Farmasi/KelolaObat';

export function PharmacyRoute() {
    return (
        <Routes>
            <Route path="" element={<Farmasi />} />
            <Route path="order-masuk" element={<OrderMasuk />} />
            <Route path="kelola-obat" element={<KelolaObat />} />
        </Routes>
    );
}
