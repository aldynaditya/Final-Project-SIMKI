import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderKasir.css';
import profil from "../images/profil.png";

const HeaderKasir = () => {
    const navigate = useNavigate();

    const [currentTime, setCurrentTime] = useState(new Date());
    const [stopwatchTime, setStopwatchTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const startTime = useRef(new Date());

    const updateStopwatch = () => {
        const now = new Date();
        const diff = now.getTime() - startTime.current.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setStopwatchTime({ hours, minutes, seconds });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            updateStopwatch();
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTwoDigits = (num) => {
        return num < 10 ? `0${num}` : num;
    };

    const SigninPrivate = () => {
        navigate('/signin-private');
    };


    return (
        <header className='headerkasir-container'>
            <div className='info-kasir'>
                <img src={profil} alt='Profil' className='profil_kasir' />
                <span className='nama_kasir'>Nama Akun Kasir</span>
                <div className='datetime-container'>
                    <div className='date'>Tanggal {currentTime.getDate()}/{currentTime.getMonth() + 1}/{currentTime.getFullYear()}</div>
                    <div className='stopwatch'>
                        <span>Time Stamp </span>
                        <span>{formatTwoDigits(stopwatchTime.hours)}:</span>
                        <span>{formatTwoDigits(stopwatchTime.minutes)}:</span>
                        <span>{formatTwoDigits(stopwatchTime.seconds)}</span>
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
