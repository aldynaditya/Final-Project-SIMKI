import { Route, Routes } from 'react-router-dom';

import TransaksiKasir from '../Pages/Kasir/TransaksiKasir';
import DetailFaktur from '../Pages/Kasir/DetailFaktur';

export function CashierRoute() {
    return (
        <Routes>
            <Route path="/" element={<TransaksiKasir />} />
            <Route path="/detail-faktur" element={<DetailFaktur />} />
        </Routes>
    );
}
