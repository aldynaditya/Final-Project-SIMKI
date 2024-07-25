import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute';
import GuestOnlyRoute from '../components/GuestOnlyRoute';
import Navbar from '../components/Navbar';
import NavbarPrivate from '../components/NavbarPrivate';
import Footer from '../components/Footer';
import FooterPrivate from '../components/FooterPrivate';

import Home from '../Pages/Pasien/Home';
import Layanan from '../Pages/Pasien/layanan';
import KebijakanPrivasi from '../Pages/Pasien/KebijakanPrivasi';
import LupaPass from '../Pages/Pasien/LupaPass';
import Daftar from '../Pages/Pasien/Daftar';

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

export function AppRoutes() {
    return (
        <Routes>
            {/* Public Access Routes */}
            <Route
                path="/"
                element={<Navigate to="/home" replace={true} />}
            />
            <Route
                path="/home"
                element={
                    <>
                        <Navbar />
                        <Home />
                        <Footer />
                    </>
                }
            />
            <Route
                path="/layanan"
                element={
                    <>
                        <Navbar />
                        <Layanan />
                        <Footer />
                    </>
                }
            />
            <Route
                path="/kebijakan-privasi"
                element={
                    <>
                        <Navbar />
                        <KebijakanPrivasi />
                        <Footer />
                    </>
                }
            />
            <Route
                path="/lupa-password"
                element={
                    <>
                        <Navbar />
                        <LupaPass />
                        <Footer />
                    </>
                }
            />
            <Route
                path="/daftar"
                element={
                    <>
                        <Navbar />
                        <Daftar />
                        <Footer />
                    </>
                }
            />
            <Route
                path="/login"
                element={
                    <GuestOnlyRoute>
                        <Navbar />
                        <Login />
                        <Footer />
                    </GuestOnlyRoute>
                }
            />
            <Route
                path="/signin"
                element={
                    <GuestOnlyRoute>
                        <SigninPrivate />
                    </GuestOnlyRoute>
                }
            />

            {/* Private Access Routes */}
            <Route
                path="/dokter/*"
                element={
                    <>
                        <NavbarPrivate />
                        <GuardRoute allowedRoles={['dokter']}>
                            <Outlet />
                        </GuardRoute>
                        <FooterPrivate />
                    </>
                }
            >
                <Route path="*" element={<DoctorsRoute />} />
            </Route>
            <Route
                path="/perawat/*"
                element={
                    <>
                        <NavbarPrivate />
                        <GuardRoute allowedRoles={['perawat']}>
                            <Outlet />
                        </GuardRoute>
                        <FooterPrivate />
                    </>
                }
            >
                <Route path="*" element={<NursesRoute />} />
            </Route>
            <Route
                path="/farmasi/*"
                element={
                    <>
                        <NavbarPrivate />
                        <GuardRoute allowedRoles={['farmasi']}>
                            <Outlet />
                        </GuardRoute>
                        <FooterPrivate />
                    </>
                }
            >
                <Route path="*" element={<PharmacyRoute />} />
            </Route>
            <Route
                path="/resepsionis/*"
                element={
                    <>
                        <NavbarPrivate />
                        <GuardRoute allowedRoles={['resepsionis']}>
                            <Outlet />
                        </GuardRoute>
                        <FooterPrivate />
                    </>
                }
            >
                <Route path="*" element={<ReceptionistRoute />} />
            </Route>
            <Route
                path="/spvkeuangan/*"
                element={
                    <>
                        <NavbarPrivate />
                        <GuardRoute allowedRoles={['spvkeuangan']}>
                            <Outlet />
                        </GuardRoute>
                        <FooterPrivate />
                    </>
                }
            >
                <Route path="*" element={<SupervisorRoute />} />
            </Route>
            <Route
                path="/pimpinan/*"
                element={
                    <>
                        <NavbarPrivate />
                        <GuardRoute allowedRoles={['pimpinan']}>
                            <Outlet />
                        </GuardRoute>
                        <FooterPrivate />
                    </>
                }
            >
                <Route path="*" element={<LeaderRoute />} />
            </Route>
            <Route
                path="/kasir/*"
                element={
                    <>
                        <NavbarPrivate />
                        <GuardRoute allowedRoles={['kasir']}>
                            <Outlet />
                        </GuardRoute>
                        <FooterPrivate />
                    </>
                }
            >
                <Route path="*" element={<CashierRoute />} />
            </Route>

            {/* Routes for Public Access with different Navbar and Footer */}
            <Route
                path="/pasien/*"
                element={
                    <>
                        <Navbar />
                        <GuardRoute allowedRoles={['pasien']}>
                            <Outlet />
                        </GuardRoute>
                        <Footer />
                    </>
                }
            >
                <Route path="*" element={<PatientRoute />} />
            </Route>
        </Routes>
    );
}
