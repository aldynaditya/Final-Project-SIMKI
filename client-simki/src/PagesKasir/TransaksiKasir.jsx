import React, { useState } from "react";
import NavbarPrivate from '../components/NavbarPrivate';
import FooterPrivate from '../components/FooterPrivate';
import './TransaksiKasir.css';
import HeaderKasir from './HeaderKasir';
import SearchBar from "../components/SearchBar";
import { useNavigate } from 'react-router-dom'; 

const TransaksiKasir = () => {
    const [rows] = useState(Array.from({ length: 20 }));
    const navigate = useNavigate();

    const DetailFaktur = () => {
        navigate('/detail-faktur');
    };

    return (
        <div className="transaksi-wrapper">
            <div className="navbar-header-transaksi">
                <NavbarPrivate />
                <HeaderKasir />
            </div>
            <div className="transaksi-container">
                <div className="content-wrapper-transaksi">
                    <div className="header-transaksi">
                        <h1 className="text_transaksi">Transaksi</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel_transaksi">
                        <table>
                            <thead>
                                <tr>
                                    <th>No. Faktur</th>
                                    <th>Tanggal</th>
                                    <th>No. EMR</th>
                                    <th>Nama Pasien</th>
                                    <th>Penjamin</th>
                                    <th>Metode Bayar</th>
                                    <th>Total</th>
                                    <th>Petugas</th>
                                    <th>Status</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((_, index) => (
                                    <tr key={index}>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="detail-faktur-cell">
                                            <button className="detail-faktur" onClick={DetailFaktur}>Detail Faktur</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <FooterPrivate />
        </div>
    );
};

export default TransaksiKasir;
