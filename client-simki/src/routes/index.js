import React from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute';
import GuestOnlyRoute from '../components/GuestOnlyRoute';

import Login from '../Pages/signin/login';
import SigninPrivate from '../Pages/signin/SigninPrivate';
import { PatientRoute } from './patientRoutes';
import { DoctorsRoute } from './doctorRoutes';
import { NursesRoute } from './nurseRoutes';
import { PharmacyRoute } from './pharmacyRoutes';
import { ReceptionistRoute } from './receptionistRoutes';
import { SupervisorRoute } from './supervisorRoutes';
import { LeaderRoute } from './leaderRoutes';
import { CashierRoute } from './cashierRoutes';
import Navbar from '../components/Navbar';
import NavbarPrivate from '../components/NavbarPrivate';
import Footer from '../components/Footer';
import FooterPrivate from '../components/FooterPrivate';

export function AppRoutes() {
    return (
        <Routes>
            {/* Routes for public access */}
            <Route
                path="login"
                element={
                    <GuestOnlyRoute>
                        <Navbar />
                        <Login />
                        <Footer />
                    </GuestOnlyRoute>
                }
            />
            <Route
                path="signin"
                element={
                    <GuestOnlyRoute>
                        <SigninPrivate />
                    </GuestOnlyRoute>
                }
            />
            <Route
                path="/"
                element={
                    <>
                        <NavbarPrivate />
                        <GuardRoute>
                            <Outlet />
                        </GuardRoute>
                        <FooterPrivate />
                    </>
                }
            >
                <Route path="pasien/*" element={<PatientRoute />} />
                <Route path="dokter/*" element={<DoctorsRoute />} />
                <Route path="perawat/*" element={<NursesRoute />} />
                <Route path="farmasi/*" element={<PharmacyRoute />} />
                <Route path="resepsionis/*" element={<ReceptionistRoute />} />
                <Route path="spvkeuangan/*" element={<SupervisorRoute />} />
                <Route path="pimpinan/*" element={<LeaderRoute />} />
                <Route path="kasir/*" element={<CashierRoute />} />
                <Route path="" element={<Navigate to="/pasien" replace={true} />} />
            </Route>
        </Routes>
    );
}
