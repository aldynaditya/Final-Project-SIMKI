import React from "react";
import { Link } from "react-router-dom";
import './footer.css';
import instagram from "../images/instagram.png";
import wa from "../images/wa.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="sb__footer section_padding">
                <div className="sb__footer-links">
                    <div className="sb__footer-links-div">
                        <h4>LAINNYA</h4>
                        <Link to="/KebijakanPrivasi">
                            <p>Kebijakan Privasi</p>
                        </Link>
                    </div>
                    <div className="sb__footer-links-div">
                        <h4>IKUTI KAMI</h4>
                        <div className="socialmedia">
                            <a href="https://www.instagram.com/klinikpratamadiponegoro1" target="_blank" rel="noopener noreferrer">
                                <img src={instagram} alt="Instagram"/>
                            </a>
                            <a href="https://wa.me/+6282242780601" target="_blank" rel="noopener noreferrer">
                                <img src={wa} alt="WhatsApp"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="sb__footer-below">
                    <div className="sb__footer-copyright">
                        <p>
                            © copyright {new Date().getFullYear()} Universitas Diponegoro. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
