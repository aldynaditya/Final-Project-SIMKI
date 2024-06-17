import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import './RiwayatKunjungan.css';

const RiwayatKunjungan = () => {
    const navigate = useNavigate();

    const handleSelengkapnya = () => {
        // Logika untuk menampilkan detail atau navigasi ke halaman lain
        navigate('/detail-kunjungan');
    };

    return (
        <div className="riwayat_kunjungan_container">
            <Navbar />
            <div className="text_riwayat">
                <h1>Riwayat Kunjungan</h1>
            </div>
            <div className="tabel_riwayat_kunjungan">
                <table>
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Dokter</th>
                            <th>Poli</th>
                            <th>Keterangan</th>
                            <th>    </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>    </td>
                            <td>    </td>
                            <td>    </td>
                            <td>    </td>
                            <td><button className="tombol_selengkapnya" onClick={handleSelengkapnya}>Selengkapnya</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default RiwayatKunjungan;
