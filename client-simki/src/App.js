import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Layanan from './Pages/layanan';
import Login from './Pages/login';
import KebijakanPrivasi from './Pages/KebijakanPrivasi';
import LupaPass from './Pages/LupaPass';
import Daftar from './Pages/Daftar';
import HalamanPasien from './Pages/HalamanPasien';
import Profile from './Pages/Profile';
import RiwayatKunjungan from './Pages/RiwayatKunjungan';
import BuatJanji from './Pages/BuatJanji';
import DetailKujungan from './Pages/DetailKunjungan';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/layanan" element={<Layanan />} />
      <Route path="/login" element={<Login />} />
      <Route path="/KebijakanPrivasi" element={<KebijakanPrivasi />} />
      <Route path="/lupa-password" element={<LupaPass />} />
      <Route path="/daftar" element={<Daftar />} />
      <Route path="/halaman-pasien" element={<HalamanPasien />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/riwayat-kunjungan" element={<RiwayatKunjungan />} />
      <Route path="/buat-janji" element={<BuatJanji />} />
      <Route path="/detail-kunjungan" element={<DetailKujungan />} />
    </Routes>
  );
}

export default App;
