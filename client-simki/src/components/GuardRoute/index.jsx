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
};

export default function GuardRoute({ allowedRoles = [] }) {
    const { token, role } = useSelector((state) => state.auth);

    // Check if the user is authenticated
    if (!token) {
        return <Navigate to="/" replace={true} />;
    }

    // Check if the user's role is allowed for this route
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        // Redirect to the default path for the current role or home if none is defined
        return <Navigate to={rolePaths[role] || '/'} replace={true} />;
    }

    // Render the route's component if the user has the correct role or if no specific role is required
    return <Outlet />;
}
