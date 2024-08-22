import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const rolePaths = {
    pasien: '/pasien',
    dokter: '/dokter',
    perawat: '/perawat',
    resepsionis: '/resepsionis',
    farmasi: '/farmasi',
    spvkeuangan: '/spvkeuangan',
    pimpinan: '/pimpinan',
    kasir: '/kasir',
    superuser: '/admin',
};

export default function GuardRoute({ allowedRoles = [] }) {
    const { token, role } = useSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/" replace={true} />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to={rolePaths[role] || '/'} replace={true} />;
    }

    return <Outlet />;
}
