import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderRsp.css';
import profil from "../images/profil.png";
import dropdown from "../images/dropdown.png";

const HeaderRsp = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(new Date());
    const [stopwatchTime, setStopwatchTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [startTime, setStartTime] = useState(() => new Date());
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const updateStopwatch = useCallback(() => {
        const now = new Date();
        const diff = now.getTime() - startTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setStopwatchTime({ hours, minutes, seconds });
    }, [startTime]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            updateStopwatch();
        }, 1000);

        return () => clearInterval(timer);
    }, [updateStopwatch]);

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

    const MenuResepsionis = [
        { name: "Pendaftar Baru", path: "/pendaftar-baru" },
        { name: "Antrian", path: "/antrian" },
        { name: "Pasien", path: "/pasien-resepsionis" },
        { name: "Kelola Jadwal", path: "/kelola-jadwal" }
    ];

    return (
        <header className='headerrsp-container'>
            <div className='info-resepsionis'>
                <img src={profil} alt='Profil' className='profil_resepsionis' />
                <span className='nama_resepsionis'>Nama Akun Resepsionis</span>
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
            <div className='button-container-resepsionis'>
                <div className='menu-dropdown-resepsionis'>
                    <button className='tombol_menu_container' onClick={handleMenu}>
                        <p className='text_menu' style={{ marginRight: '10px' }}>Menu</p>
                        <img src={dropdown} alt='Dropdown' className='icon_dropdown' style={{ width: '20px', height: '20px' }} />
                    </button>
                    {dropdownVisible && (
                        <div className="dropdown-resepsionis" ref={dropdownRef}>
                            <ul>
                                {MenuResepsionis.map((menu) => (
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

export default HeaderRsp;
