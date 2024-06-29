// Profile.js
import React from 'react';
import NavbarPrivate from '../components/NavbarPrivate';
import FooterPrivate from '../components/FooterPrivate';
import HeaderRsp from './HeaderRsp';
import './IdentitasPasien.css';
import profil from '../images/profil.png';

const IdentitasPasien = () => {

    return (
        <div className='identitas_pasien_container'>
            <NavbarPrivate />
            <HeaderRsp />
            <div className="content">
                <h1 className='text_identitas_pasien'>Identitas Pasien</h1>
                <div className="foto_biodata">
                    <div className="foto_profile">
                        <img src={profil} alt='Profil' className='profil' />
                    </div>
                    <div className="biodata-container">
                        <div className="biodata-fields">
                            <div className='nama-nik'>
                                <input type="text" placeholder="Nama Lengkap" />
                                <input type="text" placeholder="NIK" pattern="\d{16}" maxLength="16" />
                            </div>
                            <div className='ttl'>
                                <input type="text" placeholder="Tempat, Tanggal Lahir" />
                            </div>
                            <div className='gender'>
                                <input type="text" placeholder="Jenis Kelamin" />
                            </div>
                            <div className='blood'>
                                <input type="text" placeholder="Golongan Darah" />
                            </div>
                            <div className='suku'>
                                <input type="text" placeholder="Suku Bangsa" />
                            </div>
                            <div className='alamat'>
                                <input type="text" placeholder="Alamat" />
                            </div>
                            <div className='email'>
                                <input type="email" placeholder="Email" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterPrivate />
        </div>
    );
};

export default IdentitasPasien;
