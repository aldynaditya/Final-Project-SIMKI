import React, { useState } from "react";
import NavbarPrivate from '../../components/NavbarPrivate';  // Pastikan jalurnya benar
import FooterPrivate from '../../components/FooterPrivate';  // Pastikan jalurnya benar
import '../../Style/Farmasi/OrderMasuk.css';
import Header from '../../components/Header';  // Pastikan jalurnya benar
import SearchBar from '../../components/SearchBar';  // Pastikan jalurnya benar

const OrderMasuk = () => {
    const [rows] = useState(Array.from({ length: 20 }));

    const Menufarmasi = [
        { name: "Order Masuk", path: "/order-masuk" },
        { name: "Kelola Obat", path: "/kelola-obat" }
    ];

    return (
        <div className="order-masuk-wrapper">
            <div className="navbar-header-masuk">
                <NavbarPrivate />
                <Header accountName="Nama Akun Farmasi" menuItems={Menufarmasi} />
            </div>
            <div className="order-masuk-container">
                <div className="content-wrapper">
                    <div className="header-order-masuk">
                        <h1 className="text_order-masuk">Order Masuk</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel_pendaftar_baru">
                        <table>
                            <thead>
                                <tr>
                                    <th>No. Faktur</th>
                                    <th>Tanggal</th>
                                    <th>Jam</th>
                                    <th>No. EMR</th>
                                    <th>Nama Pasien</th>
                                    <th>Pemeriksa</th>
                                    <th>Poli</th>
                                    <th>Obat</th>
                                    <th>Kuantitas</th>
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

export default OrderMasuk;
