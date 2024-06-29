import React, { useState, useEffect } from "react";
import './SigninPrivate.css';
import simki_login from '../images/simki login.png';
import logoklinik from '../images/logoklinik.png';
import undip from '../images/undip.png';

const Signin_Private = () => {
    const [waktuSaatIni, setWaktuSaatIni] = useState(new Date());
    const [elapsedTime, setElapsedTime] = useState({ minutes: 0, seconds: 0 });

    useEffect(() => {
        const updateStopwatch = () => {
            let minutes = Math.floor((Date.now() - waktuSaatIni.getTime()) / 1000 / 60);
            let seconds = Math.floor((Date.now() - waktuSaatIni.getTime()) / 1000) % 60;
            setElapsedTime({ minutes, seconds });
        };

        const timer = setInterval(() => {
            setWaktuSaatIni(new Date());
            updateStopwatch();
        }, 1000);

        return () => clearInterval(timer);
    }, [waktuSaatIni]);

    const formatWaktu = (tanggal) => {
        const optionsDate = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const formattedDate = tanggal.toLocaleDateString('id-ID', optionsDate);
        return formattedDate;
    };

    const handleSignIn = () => {
        // Tambahkan logika untuk sign in di sini
    };

    return (
        <div className='kontainer-signin'>
            <nav className='navbar_signin_nakes'>
                <div className="konten-navbar">
                    <div className="tanggal">
                        {formatWaktu(waktuSaatIni)}
                    </div>
                    <div className="stopwatch_signin">
                        Time {elapsedTime.minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })}:{elapsedTime.seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
                    </div>
                </div>
            </nav>
            <h1 className="text_sign_in">Sign In</h1>
            <div className="logo_simki_private">
                <img src={simki_login} alt="Simki" className="simki" />
            </div>
            <div className="input-container">
                <div className="input-email">
                    <input type='email' placeholder='Email' />
                </div>
                <div className="input-password">
                    <input type='password' placeholder='Password' />
                </div>
            </div>
            <div className="button-container">
                <button className='klik_sign_in' onClick={handleSignIn}>Sign In</button>
            </div>
            <footer className="footer_signin_nakes">
                <div className="logo_footer">
                    <img src={logoklinik} alt='Logo Klinik' className='logo_klinik' />
                    <img src={undip} alt='Undip' className='undip' />
                </div>
                <div className="footer-copyright">
                    <p>© copyright {new Date().getFullYear()} Universitas Diponegoro. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Signin_Private;
