import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Perawat/Perawat.css';
import item from "../../images/item.png";
import user from "../../images/user.png";
import agenda from "../../images/agenda.png";

const Perawat = () => {
    const navigate = useNavigate();

    const JADWAL_PATH = 'jadwal-dokter';
    const PASIEN_PATH = 'pasien-perawat';
    const ITEM_PATH = 'kelola-item';

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className='perawat-container'>
        <div className='main-content-perawat'>
            <h1 className='text_perawat'>Dashboard</h1>
            <div className="klik_perawat">
            <div className="jadwal_dokter" onClick={() => handleNavigation('jadwal-dokter')}>
                <img src={agenda} alt='jadwal_dokter' className='icon' />
                <p>JADWAL DOKTER</p>
            </div>
            <div className="pasien" onClick={() => handleNavigation('antrian-perawat')}>
                <img src={user} alt='pasien' className='icon' />
                <p>ANTRIAN</p>
            </div>
            <div className="pasien" onClick={() => handleNavigation('pasien-dokter')}>
                <img src={user} alt='pasien' className='icon' />
                <p>PASIEN</p>
                </div>
            <div className="notifikasi" onClick={() => handleNavigation('kelola-item')}>
                <img src={item} alt='pasien' className='icon' />
                <p>KELOLA ITEM</p>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default Perawat;
