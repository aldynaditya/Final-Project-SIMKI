import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import '../../Style/Pasien/HalamanPasien.css';
import { useNavigate } from 'react-router-dom';
import user from "../../images/user.png";
import buatjanji from "../../images/buatjanji.png";
import riwayat from "../../images/riwayat.png";

const HalamanPasien = () => {
    const navigate = useNavigate();

    const Home = () => {
        navigate('/');
    };

    const handleProfil = () => {
        navigate('/profile');
    };

    const handleBuatjanji = () => {
        navigate('/buat-janji');
    };

    const handleRiwayatkunjungan = () => {
        navigate('/riwayat-kunjungan');
    };

    return (
        <div className="halaman_pasien_container">
            <Navbar />
            <h1 className="center_text">
                <span className="nama_pasien">Hai, (nama pasien) </span>
                <button className="keluar" onClick={Home}>Keluar</button>
            </h1>
            <div className="transaksi">
                <p>Transaksi Berlangsung :</p>
            </div>
            <div className="tabel_transaksi">
                <table>
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Dokter</th>
                            <th>Poli</th>
                            <th>Jam</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><div className="tombol_pending">Pending</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="klik_pasien">
                <div className='profile' onClick={handleProfil}>
                    <img src={user} alt='Profil' className='user' />
                    <p>PROFIL</p>
                </div>
                <div className="buat_janji" onClick={handleBuatjanji}>
                    <img src={buatjanji} alt='Buat_Janji' className='buatjanji' />
                    <p>BUAT JANJI</p>
                </div>
                <div className="riwayat_kunjungan" onClick={handleRiwayatkunjungan}>
                    <img src={riwayat} alt='riwayat' className='riwayat' />
                    <p>RIWAYAT KUNJUNGAN</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HalamanPasien;
