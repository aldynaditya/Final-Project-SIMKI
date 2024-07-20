import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Pimpinan/HeaderLead.css';
import profil from "../../images/profil.png";

const HeaderPimpinan = () => {
    const navigate = useNavigate();

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTwoDigits = (num) => {
        return num < 10 ? `0${num}` : num;
    };

    const handleSignOut = () => {
        navigate('/signin-private');
    };

    return (
        <header className='headerpimpinan-container'>
            <div className='info-pimpinan'>
                <img src={profil} alt='Profil' className='profil_pimpinan' />
                <span className='nama_pimpinan'>Nama Akun Pimpinan</span>
                <div className='datetime-container'>
                    <div className='date'>Tanggal {currentTime.getDate()}/{currentTime.getMonth() + 1}/{currentTime.getFullYear()}</div>
                    <div className='clock'>
                        <span>Jam: </span>
                        <span>{formatTwoDigits(currentTime.getHours())}:</span>
                        <span>{formatTwoDigits(currentTime.getMinutes())}:</span>
                        <span>{formatTwoDigits(currentTime.getSeconds())}</span>
                    </div>
                </div>
            </div>
            <div className='button-container-pimpinan'>
                <button className="tombol_keluar" onClick={handleSignOut}>Keluar</button>
            </div>
        </header>
    );
};

export default HeaderPimpinan;
