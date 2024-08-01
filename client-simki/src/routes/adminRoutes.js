import { Route, Routes } from 'react-router-dom';

import KelolaUser from '../Pages/Admin/KelolaUser';
import TambahUser from '../Pages/Admin/TambahUser';

export function AdminRoute() {
    return (
        <Routes>
            <Route path="/" element={<KelolaUser />} />
            <Route path="tambah-user" element={<TambahUser />} />
        </Routes>
    );
}
