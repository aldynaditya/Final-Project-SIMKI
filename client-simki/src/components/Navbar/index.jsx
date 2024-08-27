import React, { useState, useEffect } from 'react';
import '../../Style/components/Navbar.css';
import logoklinik from '../../images/logoklinik.png';
import undip from '../../images/undip.png';
import phone from '../../images/phone.png';
import pin from '../../images/pin.png';
import { Link } from 'react-router-dom';
import '../../Style/components/reset.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      try {
        const authData = JSON.parse(auth);
        setIsLoggedIn(!!authData.token);
      } catch (error) {
        console.error('Failed to parse auth data:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className='navbar'>
      <div className="logo_container">
        <img src={logoklinik} alt='Logo Klinik' className='logo_klinik' />
        <img src={undip} alt='Undip' className='undip' />
      </div>
      
      <div className="contact_container">
        <div className="contact_info">
          <img src={phone} alt='Phone' className='phone' />
          <span className="contact_text">+62 24 8630 2159</span>
        </div>
        <div className="contact_info">
          <img src={pin} alt='pin' className='pin' />
          <span className="contact_text">Jalan Prof. Sudarto, S.H Tembalang, Kota Semarang, Jawa Tengah</span>
        </div>
      </div>
      <nav>
        <ul>
              <li>
                <Link 
                  to="/" 
                  className={activeLink === 'home' ? 'active' : ''} 
                  onClick={() => handleLinkClick('home')}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/layanan" 
                  className={activeLink === 'layanan' ? 'active' : ''} 
                  onClick={() => handleLinkClick('layanan')}
                >
                  Layanan
                </Link>
              </li>
          <li>
            <Link 
              to="/jadwal" 
              className={activeLink === 'jadwal' ? 'active' : ''} 
              onClick={() => handleLinkClick('jadwal')}
            >
              Dokter
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link 
                to="/pasien" 
                className={activeLink === 'pasien' ? 'active' : ''} 
                onClick={() => handleLinkClick('pasien')}
              >
                Dashboard
              </Link>
            </li>
          ) : (
            <li>
              <Link 
                to="/login" 
                className={activeLink === 'login' ? 'active' : ''} 
                onClick={() => handleLinkClick('login')}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
