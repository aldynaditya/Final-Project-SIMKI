import { Route, Routes } from 'react-router-dom';

import KelolaUser from '../Pages/Admin/KelolaUser';

export function AdminRoute() {
    return (
        <Routes>
            <Route path="/" element={<KelolaUser />} />
        </Routes>
    );
}
