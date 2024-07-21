import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function GuestOnlyRoute({ children }) {
    const { token, role } = useSelector((state) => state.auth);

    if (token) {
        switch (role) {
            case 'dokter':
                return <Navigate to="/dokter" replace={true} />;
            case 'perawat':
                return <Navigate to="/perawat" replace={true} />;
            case 'resepsionis':
                return <Navigate to="/resepsionis" replace={true} />;
            case 'farmasi':
                return <Navigate to="/farmasi" replace={true} />;
            case 'spvkeuangan':
                return <Navigate to="/spvkeuangan" replace={true} />;
            case 'pimpinan':
                return <Navigate to="/pimpinan" replace={true} />;
            case 'kasir':
                return <Navigate to="/kasir" replace={true} />;
            default:
                return <Navigate to="/" replace={true} />;
        }
    }

    return children || <Outlet />;
}
