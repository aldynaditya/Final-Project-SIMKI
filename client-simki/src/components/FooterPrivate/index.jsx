import React from 'react';
import '../../Style/components/FooterPrivate.css';

const FooterPrivate = () => {
    return (
        <footer className='footer_private_container'>
            <div className="footer_copyright_private">
                <p>© Copyright {new Date().getFullYear()} <b>Universitas Diponegoro</b>. All rights reserved</p>
            </div>
        </footer>
    );
};

export default FooterPrivate;
