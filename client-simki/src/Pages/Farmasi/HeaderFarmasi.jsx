import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Farmasi/HeaderFarmasi.css';
import profil from "../../images/profil.png";
import dropdown from "../../images/dropdown.png";

const HeaderFarmasi = () => {
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

    const Menufarmasi = [
        { name: "Order Masuk", path: "/order-masuk" },
        { name: "Kelola Obat", path: "/kelola-obat" }
    ];

    return (
        <header className='headerfarmasi-container'>
            <div className='info-farmasi'>
                <img src={profil} alt='Profil' className='profil_farmasi' />
                <span className='nama_farmasi'>Nama Akun Farmasi</span>
                <div className='datetime-container'>
                    <div className='date'>Tanggal {currentTime.getDate()}/{currentTime.getMonth() + 1}/{currentTime.getFullYear()}</div>
                    <div className='clock'>
                        <span>Jam {formatTwoDigits(currentTime.getHours())}:</span>
                        <span>{formatTwoDigits(currentTime.getMinutes())}:</span>
                        <span>{formatTwoDigits(currentTime.getSeconds())}</span>
                    </div>
                </div>
            </div>
            <div className='button-container-farmasi'>
                <div className='menu-dropdown-farmasi'>
                    <button className='tombol_menu_farmasi_container' onClick={handleMenu}>
                        <p className='text_menu_farmasi' style={{ marginRight: '10px' }}>Menu</p>
                        <img src={dropdown} alt='Dropdown' className='icon_dropdown_farmasi' style={{ width: '20px', height: '20px' }} />
                    </button>
                    {dropdownVisible && (
                        <div className="dropdown-farmasi" ref={dropdownRef}>
                            <ul>
                                {Menufarmasi.map((menu) => (
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

export default HeaderFarmasi;
