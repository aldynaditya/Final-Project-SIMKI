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
                    <div className='nama-tambahpendaftar'>
                        <input type='text' className='kolom-ndokter-tambahpendaftar'></input>
                    </div>
                    <div className='poli-tambahpendaftar'>
                        <span className='text-poli-tambahpendaftar'>Poli :</span>
                        <input type='text' className='kolom-poli-tambahpendaftar'></input>
                    </div>
                    <div className='hari-tambahpendaftar'>
                        <span className='text-hari-tambahpendaftar'>Hari :</span>
                        <input type='text' className='kolom-hari-tambahpendaftar'></input>
                    </div>
                    <div className='jam-tambahpendaftar'>
                        <span className='text-jam-tambahpendaftar'>Jam :</span>
                        <input type='date' className='kolom-jam-tambahpendaftar'></input>
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
