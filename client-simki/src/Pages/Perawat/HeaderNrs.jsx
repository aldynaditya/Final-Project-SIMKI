import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Perawat/HeaderNrs.css';
import profil from "../../images/profil.png";
import dropdown from "../../images/dropdown.png";

const HeaderNrs = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(new Date());
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
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

    const Menuperawat = [
        { name: "Jadwal Dokter", path: "/jadwal-dokter" },
        { name: "Pasien", path: "/pasien-perawat" },
        { name: "Kelola Item", path: "/kelola-item" }
    ];

    return (
        <header className='headernrs-container'>
            <div className='info-perawat'>
                <img src={profil} alt='Profil' className='profil_perawat' />
                <span className='nama_perawat'>Nama Akun Perawat</span>
                <div className='datetime-container'>
                    <div className='date'>
                        Tanggal {currentTime.getDate()}/{currentTime.getMonth() + 1}/{currentTime.getFullYear()}
                    </div>
                    <div className='clock'>
                        <span>Jam: </span>
                        <span>{formatTwoDigits(currentTime.getHours())}:</span>
                        <span>{formatTwoDigits(currentTime.getMinutes())}:</span>
                        <span>{formatTwoDigits(currentTime.getSeconds())}</span>
                    </div>
                </div>
            </div>
            <div className='button-container-perawat'>
                <div className='menu-dropdown-perawat'>
                    <button className='tombol_menu_perawat_container' onClick={handleMenu}>
                        <p className='text_menu_perawat' style={{ marginRight: '10px' }}>Menu</p>
                        <img src={dropdown} alt='Dropdown' className='icon_dropdown_perawat' style={{ width: '20px', height: '20px' }} />
                    </button>
                    {dropdownVisible && (
                        <div className="dropdown-perawat" ref={dropdownRef}>
                            <ul>
                                {Menuperawat.map((menu) => (
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

export default HeaderNrs;
