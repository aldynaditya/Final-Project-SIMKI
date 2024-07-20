// Profile.js
import React from 'react';
import NavbarPrivate from '../../components/NavbarPrivate';
import FooterPrivate from '../../components/FooterPrivate';
import HeaderRsp from './HeaderRsp';
import '../../Style/Resepsionis/IdentitasPasien.css';


const IdentitasPasien = () => {

    return (
        <div className='identitas_pasien_container'>
            <NavbarPrivate />
            <HeaderRsp />
            <div className="content-identitas-pasien">
                <h1 className='text_identitas_pasien'>Identitas Pasien</h1>
                <div className='biodata-pasien-perawat'>
                    <div className='nama-nik-perawat'>
                        <input type='text' className='kolom-npasien-perawat' placeholder='Nama Lengkap'/>
                        <input type='text' className='kolom-nik-perawat' placeholder='NIK'/>
                    </div>
                    <div className='ttl-perawat'>
                        <input type='text' className='kolom-ttl-perawat' placeholder='Tempat, Tanggal Lahir'/>
                    </div>
                    <div className='gender-perawat'>
                        <input type='text' className='kolom-gender-perawat' placeholder='Jenis Kelamin'/>
                    </div>
                    <div className='blood-perawat'>
                        <input type='text' className='kolom-blood-perawat' placeholder='Golongan Darah'/>
                    </div>
                    <div className='suku-perawat'>
                        <input type='text' className='kolom-suku-perawat' placeholder='Suku Bangsa'/>
                    </div>
                    <div className='alamat-perawat'>
                        <input type='text' className='kolom-alamat-perawat' placeholder='Alamat Lengkap'/>
                    </div>
                    <div className='email-perawat'>
                        <input type='email' className='kolom-email-perawat' placeholder='Email'/>
                    </div>
                </div>
            </div>
            <FooterPrivate />
        </div>
    );
};

export default IdentitasPasien;
