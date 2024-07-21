import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function GuardRoute({ children }) {
    const { token, role } = useSelector((state) => state.auth);

    if (!token) {
        if (role === 'pasien') {
            return <Navigate to="/login" replace={true} />;
        }
        return <Navigate to="/signin" replace={true} />;
    }

    if (role === 'pasien') {
        return <Navigate to="/login" replace={true} />;
    }

    if (!['dokter', 'perawat', 'resepsionis', 'farmasi', 'kasir', 'pimpinan', 'spvkeuangan'].includes(role)) {
        return <Navigate to="/signin" replace={true} />;
    }

    return children || <Outlet />;
}
