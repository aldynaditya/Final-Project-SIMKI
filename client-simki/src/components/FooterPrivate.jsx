// src/components/FooterPrivate.jsx

import React from 'react';
import './FooterPrivate.css';

const FooterPrivate = () => {
    return (
        <footer className='footer_private_container'>
            <div className="footer_copyright_private">
                    <p>© copyright {new Date().getFullYear()} Universitas Diponegoro. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default FooterPrivate;
