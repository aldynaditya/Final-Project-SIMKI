import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderSpv.css';
import profil from "../images/profil.png";
import dropdown from "../images/dropdown.png";

const HeaderKeuangan = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

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

    const handleMenu = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        if (dropdownVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownVisible]);

    const SigninPrivate = () => {
        navigate('/signin-private');
    };

    const navigateTo = (path) => {
        navigate(path);
        setDropdownVisible(false);
    };

    const Menukeuangan = [
        { name: "Transaksi", path: "/transaksi-keuangan" },
        { name: "Notifikasi", path: "/notifikasi-keuangan" }
    ];

    return (
        <header className='headerkeuangan-container'>
            <div className='info-keuangan'>
                <img src={profil} alt='Profil' className='profil_keuangan' />
                <span className='nama_keuangan'>Nama Akun SPV Keuangan</span>
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
            <div className='button-container-keuangan'>
                <div className='menu-dropdown-keuangan'>
                    <button className='tombol_menu_keuangan_container' onClick={handleMenu}>
                        <p className='text_menu_keuangan' style={{ marginRight: '10px' }}>Menu</p>
                        <img src={dropdown} alt='Dropdown' className='icon_dropdown_keuangan' style={{ width: '20px', height: '20px' }} />
                    </button>
                    {dropdownVisible && (
                        <div className="dropdown-keuangan" ref={dropdownRef}>
                            <ul>
                                {Menukeuangan.map((menu) => (
                                    <li key={menu.name} onClick={() => navigateTo(menu.path)}>{menu.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <button className="tombol_keluar" onClick={SigninPrivate}>Keluar</button>
            </div>
        </header>
    );
};

export default HeaderKeuangan;
