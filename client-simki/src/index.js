import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Impor komponen utama Anda
import './index.css'; // Impor gaya Anda



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> {/* Konteks Router Tunggal */}
      <App /> {/* Komponen utama Anda */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') // Ini harus menjadi elemen di HTML tempat React dimuat
);
