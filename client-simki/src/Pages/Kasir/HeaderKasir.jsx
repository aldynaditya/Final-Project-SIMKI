import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Kasir/HeaderKasir.css';
import profil from "../../images/profil.png";

const HeaderKasir = () => {
    const navigate = useNavigate();

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTwoDigits = (num) => (num < 10 ? `0${num}` : num);

    const SigninPrivate = () => {
        navigate('/signin-private');
    };

    return (
        <header className='headerkasir-container'>
            <div className='info-kasir'>
                <img src={profil} alt='Profil' className='profil_kasir' />
                <span className='nama_kasir'>Nama Akun Kasir</span>
                <div className='datetime-container'>
                    <div className='date'>
                        Tanggal {formatTwoDigits(currentTime.getDate())}/{formatTwoDigits(currentTime.getMonth() + 1)}/{currentTime.getFullYear()}
                    </div>
                    <div className='clock'>
                        <span>Jam {formatTwoDigits(currentTime.getHours())}:</span>
                        <span>{formatTwoDigits(currentTime.getMinutes())}:</span>
                        <span>{formatTwoDigits(currentTime.getSeconds())}</span>
                    </div>
                </div>
            </div>
            <div className='button-container-kasir'>
                <button className="tombol_keluar" onClick={SigninPrivate}>Keluar</button>
            </div>
        </header>
    );
};

export default HeaderKasir;
