import React, { useState } from 'react';
import '../../Style/Resepsionis/PendaftarPopup.css';

const TambahPendaftar = ({ onClose }) => {
    const [activeLink, setActiveLink] = useState('');

    const handleLinkCancel = (link) => {
        setActiveLink(link);
        if (onClose) {
            onClose(); // Close the popup
        }
    };

    const Simpanpendaftar = () => {
        alert('Pendaftar Ditambahkan');
        if (onClose) {
            onClose(); // Close the popup
        }
    };

    return (
        <div className='tambah-pendaftar-container'>
            <div className='tambah-pendaftar-content'>
                <div 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </div>
                <h1 className='text-tambah-pendaftar'>Pendaftar Baru</h1>
                <div className='kolom-pendaftar-baru'>
                    <div className='npasien-pendaftar-baru'>
                        <input type='text' className='kolom-npasien-pendaftar-baru' placeholder='Nama Lengkap (Sesuai KTP)'/>
                    </div>
                    <div className='ttl-pendaftar-baru'>
                        <input type='text' className='kolom-tempat-pendaftar-baru' placeholder='Tempat'/>
                        <input type='date' className='kolom-tanggal-pendaftar-baru' placeholder='Tanggal Lahir'/>
                    </div>
                    <div className='gender-pendaftar-baru'>
                        <input type='text' className='kolom-gender-pendaftar-baru' placeholder='Jenis Kelamin'/>
                    </div>
                    <div className='blood-pendaftar-baru'>
                        <input type='text' className='kolom-blood-pendaftar-baru' placeholder='Golongan Darah'/>
                    </div>
                    <div className='suku-pendaftar-baru'>
                        <input type='text' className='kolom-suku-pendaftar-baru' placeholder='Suku Bangsa'/>
                    </div>
                    <div className='alamat-pendaftar-baru'>
                        <input type='text' className='kolom-alamat-pendaftar-baru' placeholder='Alamat Lengkap'/>
                    </div>
                    <div className='nik-pendaftar-baru'>
                        <input type='text' className='kolom-nik-pendaftar-baru' placeholder='NIK'/>
                    </div>
                </div>
                <div className='tambahpendaftar-container'>
                    <button className="button-tambahpendaftar" onClick={Simpanpendaftar}>Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default TambahPendaftar;
