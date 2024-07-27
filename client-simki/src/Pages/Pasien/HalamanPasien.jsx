import React from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../Style/Pasien/HalamanPasien.css';
import { userLogout } from '../../redux/auth/actions';
import user from "../../images/user.png";
import buatjanji from "../../images/buatjanji.png";
import riwayat from "../../images/riwayat.png";

const HalamanPasien = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const PROFILE_PATH = 'profile';
    const BUATJANJI_PATH = 'buat-janji';
    const RIWAYAT_PATH = 'riwayat-kunjungan';

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        dispatch(userLogout());
        navigate('/login');
    };

    return (
        <div className="halaman_pasien_container">
            <h1 className="center_text">
                <span className="nama_pasien">Hai, (nama pasien) </span>
                <button className="keluar" onClick={handleLogout}>Keluar</button>
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
                <div className='profile' onClick={() => handleNavigation(PROFILE_PATH)}>
                    <img src={user} alt='Profil' className='user' />
                    <p>PROFIL</p>
                </div>
                <div className="buat_janji" onClick={() => handleNavigation(BUATJANJI_PATH)}>
                    <img src={buatjanji} alt='Buat_Janji' className='buatjanji' />
                    <p>BUAT JANJI</p>
                </div>
                <div className="riwayat_kunjungan" onClick={() => handleNavigation(RIWAYAT_PATH)}>
                    <img src={riwayat} alt='riwayat' className='riwayat' />
                    <p>RIWAYAT KUNJUNGAN</p>
                </div>
            </div>
        </div>
    );
}

export default HalamanPasien;
