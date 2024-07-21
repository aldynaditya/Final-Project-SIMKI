import { Route, Routes } from 'react-router-dom';

import NotifikasiPimpinan from '../Pages/Pimpinan/NotifikasiLead';

export function LeaderRoute() {
    return (
        <Routes>
            <Route path="/" element={<NotifikasiPimpinan />} />
        </Routes>
    );
}
