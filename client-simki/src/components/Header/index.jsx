import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/auth/actions';
import '../../Style/components/Header.css';
import profil from "../../images/profil.png";
import dropdown from "../../images/dropdown.png";

const Header = ({ menuItems }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(new Date());
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const userName = useSelector((state) => state.auth.nama);
    const userRole = useSelector((state) => state.auth.role);

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

    const handleLogout = () => {
        dispatch(userLogout());
        navigate('/signin');
    };

    const navigateTo = (path) => {
        navigate(path);
        setDropdownVisible(false);
    };

    const getRoleDisplayName = (role) => {
        switch (role) {
            case 'dokter':
                return 'Dokter';
            case 'perawat':
                return 'Perawat';
            case 'resepsionis':
                return 'Resepsionis';
            case 'farmasi':
                return 'Farmasi';
            case 'spvkeuangan':
                return 'Supervisor Keuangan';
            case 'kasir':
                return 'Kasir';
            case 'pimpinan':
                return 'Pimpinan';
            case 'superuser':
                return 'Superuser';
            default:
                return role;
        }
    };

    return (
        <header className='header-container'>
            <div className='info-account'>
                <img src={profil} alt='Profil' className='profil_account' />
                <div className='name-role'>
                    <span className='nama_account'>{userName}</span>
                    <span className='role_account'>{getRoleDisplayName(userRole)}</span>
                </div>
                <div className='datetime-container'>
                    <div className='date'>
                        Tanggal {currentTime.getDate()}/{currentTime.getMonth() + 1}/{currentTime.getFullYear()}
                    </div>
                    <div className='clock'>
                        Jam: {formatTwoDigits(currentTime.getHours())}:{formatTwoDigits(currentTime.getMinutes())}:{formatTwoDigits(currentTime.getSeconds())}
                    </div>
                </div>
            </div>
            <div className='button-container-container'>
                <div className='button-container'>
                    {!(userRole === 'pimpinan' || userRole === 'superuser' || userRole === 'kasir') && (
                        <div className='menu-dropdown'>
                            <button className='tombol_menu_container' onClick={handleMenu}>
                                <p className='text_menu' style={{ marginRight: '10px' }}>Menu</p>
                                <img src={dropdown} alt='Dropdown' className='icon_dropdown' style={{ width: '20px', height: '20px' }} />
                            </button>
                            {dropdownVisible && (
                                <div className="dropdown" ref={dropdownRef}>
                                    <ul>
                                        {menuItems.map((menu) => (
                                            <li key={menu.name} onClick={() => navigateTo(menu.path)}>{menu.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                    <button className="tombol_keluar" onClick={handleLogout}>Keluar</button>
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    })).isRequired
};

export default Header;
