import React from 'react';
import './NavbarPrivate.css';
import logoklinik from '../images/logoklinik.png';
import undip from '../images/undip.png';
import simki from '../images/simki.png';

const NavbarPrivate = () => {
    return (
        <div className='navbar_private_container'>
            <div className="logo_private_container">
                <img src={simki} alt='Logo Simki' className='logo_simki' />
                <img src={logoklinik} alt='Logo Klinik' className='logo_klinik' />
                <img src={undip} alt='Undip' className='undip' />
            </div>
        </div>
    );
};

export default NavbarPrivate;
