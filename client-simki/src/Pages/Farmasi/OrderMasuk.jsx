import React, { useState } from "react";
import '../../Style/Farmasi/OrderMasuk.css';
import SearchBar from '../../components/SearchBar';  // Pastikan jalurnya benar

const OrderMasuk = () => {
    const [rows, setRows] = useState(Array.from({ length: 20 }, () => ({ status: 'Proses' })));

    const handleProsesClick = (index) => {
        const updatedRows = rows.map((row, i) => 
            i === index ? { ...row, status: 'Diproses' } : row
        );
        setRows(updatedRows);
    };

    return (
        <div className="order-masuk-wrapper">
            <div className="navbar-header-masuk">
            </div>
            <div className="order-masuk-container">
                <div className="content-wrapper">
                    <div className="header-order-masuk">
                        <h1 className="text_order-masuk">Order Masuk</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel-pendaftar-baru-wrapper">
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
                                        <th>Total</th>
                                        <th>Penjamin</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => (
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
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <div 
                                                    className="proses-obat" 
                                                    onClick={() => handleProsesClick(index)}
                                                >
                                                    {row.status}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderMasuk;
