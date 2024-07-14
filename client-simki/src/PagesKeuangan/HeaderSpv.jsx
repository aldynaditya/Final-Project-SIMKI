import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderSpv.css';
import profil from "../images/profil.png";
import dropdown from "../images/dropdown.png";

const HeaderKeuangan = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [waktuSekarang, setWaktuSekarang] = useState(new Date());
    const [waktuStopwatch, setWaktuStopwatch] = useState({ jam: 0, menit: 0, detik: 0 });
    const [dropdownTerlihat, setDropdownTerlihat] = useState(false);
    const waktuMulai = useRef(new Date());

    const updateStopwatch = () => {
        const sekarang = new Date();
        const selisih = sekarang.getTime() - waktuMulai.current.getTime();
        const jam = Math.floor(selisih / (1000 * 60 * 60));
        const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
        const detik = Math.floor((selisih % (1000 * 60)) / 1000);
        setWaktuStopwatch({ jam, menit, detik });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setWaktuSekarang(new Date());
            updateStopwatch();
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
                    <div className='date'>Tanggal {waktuSekarang.getDate()}/{waktuSekarang.getMonth() + 1}/{waktuSekarang.getFullYear()}</div>
                    <div className='stopwatch'>
                        <span>Time Stamp </span>
                        <span>{formatDuaDigit(waktuStopwatch.jam)}:</span>
                        <span>{formatDuaDigit(waktuStopwatch.menit)}:</span>
                        <span>{formatDuaDigit(waktuStopwatch.detik)}</span>
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
