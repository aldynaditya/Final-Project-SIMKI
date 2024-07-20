import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Keuangan/HeaderSpv.css';
import profil from "../../images/profil.png";
import dropdown from "../../images/dropdown.png";

const HeaderKeuangan = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [waktuSekarang, setWaktuSekarang] = useState(new Date());
    const [dropdownTerlihat, setDropdownTerlihat] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setWaktuSekarang(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDuaDigit = (num) => {
        return num < 10 ? `0${num}` : num;
    };

    const handleMenu = () => {
        setDropdownTerlihat(!dropdownTerlihat);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownTerlihat(false);
        }
    };

    useEffect(() => {
        if (dropdownTerlihat) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownTerlihat]);

    const SigninPrivate = () => {
        navigate('/signin-private');
    };

    const navigateTo = (path) => {
        navigate(path);
        setDropdownTerlihat(false);
    };

    const MenuKeuangan = [
        { name: "Transaksi", path: "/transaksi-keuangan" },
        { name: "Notifikasi", path: "/notifikasi-keuangan" }
    ];

    return (
        <header className='headerkeuangan-container'>
            <div className='info-keuangan'>
                <img src={profil} alt='Profil' className='profil_keuangan' />
                <span className='nama_keuangan'>Nama Akun SPV Keuangan</span>
                <div className='datetime-container'>
                    <div className='date'>Tanggal {formatDuaDigit(waktuSekarang.getDate())}/{formatDuaDigit(waktuSekarang.getMonth() + 1)}/{waktuSekarang.getFullYear()}</div>
                    <div className='clock'>
                        <span>Jam {formatDuaDigit(waktuSekarang.getHours())}:</span>
                        <span>{formatDuaDigit(waktuSekarang.getMinutes())}:</span>
                        <span>{formatDuaDigit(waktuSekarang.getSeconds())}</span>
                    </div>
                </div>
            </div>
            <div className='button-container-keuangan'>
                <div className='menu-dropdown-keuangan'>
                    <button className='tombol_menu_keuangan_container' onClick={handleMenu}>
                        <p className='text_menu_keuangan' style={{ marginRight: '10px' }}>Menu</p>
                        <img src={dropdown} alt='Dropdown' className='icon_dropdown_keuangan' style={{ width: '20px', height: '20px' }} />
                    </button>
                    {dropdownTerlihat && (
                        <div className="dropdown-keuangan" ref={dropdownRef}>
                            <ul>
                                {MenuKeuangan.map((menu) => (
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
