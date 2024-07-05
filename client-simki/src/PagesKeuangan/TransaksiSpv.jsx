import React, { useState } from "react";
import NavbarPrivate from '../components/NavbarPrivate';
import FooterPrivate from '../components/FooterPrivate';
import './TransaksiSpv.css';
import HeaderKeuangan from './HeaderSpv';

const TransaksiKeuangan = () => {
    const [rows] = useState(Array.from({ length: 20 }));


    return (
        <div className="transaksi-keuangan-wrapper">
            <div className="navbar-header-transaksi-keuangan">
                <NavbarPrivate />
                <HeaderKeuangan />
            </div>
            <div className="transaksi-keuangan-container">
                <div className="content-wrapper-transaksi-keuangan">
                    <div className="header-transaksi-keuangan">
                        <h1 className="text_transaksi-keuangan">Transaksi</h1>
                        <div className='periode-surat'>
                            <span className='text-periode-surat'>Periode :</span>
                            <input type='date' className='kolom-periode-surat'></input>
                        </div>
                        <div className='hingga-surat'>
                            <span className='text-hingga-surat'>Hingga :</span>
                            <input type='date' className='kolom-hingga-surat'></input>
                        </div>
                    </div>
                    <div className="tabel_transaksi-keuangan">
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

export default TransaksiKeuangan;
