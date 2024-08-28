import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute';
import GuestOnlyRoute from '../components/GuestOnlyRoute';
import Navbar from '../components/Navbar';
import NavbarPrivate from '../components/NavbarPrivate';
import Footer from '../components/Footer';
import FooterPrivate from '../components/FooterPrivate';
import Header from '../components/Header';

import Home from '../Pages/Pasien/Home';
import Invoice from '../components/Receipt';
import Layanan from '../Pages/Pasien/layanan';
import KebijakanPrivasi from '../Pages/Pasien/KebijakanPrivasi';
import LupaPass from '../Pages/Pasien/LupaPass';
import Daftar from '../Pages/Pasien/Daftar';
import AktivasiAkun from '../Pages/Pasien/AktivasiAkun';
import GantiPassword from '../Pages/Pasien/GantiPassword';
import Jadwal from '../Pages/Pasien/jadwal';

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
import { AdminRoute } from './adminRoutes';

export function AppRoutes() {
    const Menudokter = [
        { name: "Dashboard", path: '/dokter' },
        { name: "Jadwal Dokter", path: '/dokter/schedule-dokter' },
        { name: "Pasien", path: '/dokter/pasien-dokter' },
        { name: "Notifikasi", path: '/dokter/notifikasi-dokter' }
    ];

    const Menuperawat = [
        { name: "Dashboard", path: '/perawat' },
        { name: "Jadwal Dokter", path: "/perawat/jadwal-dokter" },
        { name: "Pasien", path: "/perawat/pasien-dokter" },
        { name: "Kelola Item", path: "/perawat/kelola-item" }
    ];

    const MenuResepsionis = [
        { name: "Dashboard", path: '/resepsionis' },
        { name: "Pendaftar", path: "/resepsionis/pendaftar-baru" },
        { name: "Antrian", path: "/resepsionis/antrian" },
        { name: "Pasien", path: "/resepsionis/pasien-dokter" },
        { name: "Kelola Jadwal", path: "/resepsionis/kelola-jadwal" }
    ];

    const Menufarmasi = [
        { name: "Dashboard", path: '/farmasi' },
        { name: "Order Masuk", path: "/farmasi/order-masuk" },
        { name: "Kelola Obat", path: "/farmasi/kelola-obat" }
    ];

    const Menuspv = [
        { name: "Dashboard", path: '/spvkeuangan' },
        { name: "Transaksi", path: "/spvkeuangan/transaksi-keuangan" },
        { name: "Laporan", path: "/spvkeuangan/notifikasi-keuangan" }
    ];

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
                path="/faktur"
                element={
                    <>
                        <Invoice />
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
                path="/ganti-password"
                element={
                    <>
                        <Navbar />
                        <GantiPassword />
                        <Footer />
                    </>
                }
            />
            <Route
                path="/aktivasi-akun"
                element={
                    <>
                        <Navbar />
                        <AktivasiAkun />
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
                path="/jadwal"
                element={
                    <>
                        <Navbar />
                        <Jadwal />
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
                path="/admin/*"
                element={
                    <>
                        <NavbarPrivate />
                        <Header />
                        <GuardRoute allowedRoles={['superuser']}>
                            <Outlet />
                        </GuardRoute>
                        <FooterPrivate />
                    </>
                }
            >
                <Route path="*" element={<AdminRoute />} />
            </Route>
            <Route
                path="/dokter/*"
                element={
                    <>
                        <NavbarPrivate />
                        <Header menuItems={Menudokter}/>
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
                        <Header menuItems={Menuperawat}/>
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
                        <Header menuItems={Menufarmasi} />
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
                        <Header menuItems={MenuResepsionis}/>
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
                        <Header menuItems={Menuspv} />
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
                        <Header />
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
                        <Header />
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
