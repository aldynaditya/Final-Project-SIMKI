import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Layanan from './Pages/layanan';
import Login from './Pages/login';
import KebijakanPrivasi from './Pages/KebijakanPrivasi';
import LupaPass from './Pages/LupaPass';
import Daftar from './Pages/Daftar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/KebijakanPrivasi" element={<KebijakanPrivasi />} />
        <Route path="/lupa-password" element={<LupaPass />} />
        <Route path="/daftar" element={<Daftar />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;