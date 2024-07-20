import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Style/Perawat/TambahitemPopup.css';
import '../../Style/Resepsionis/CetakSuratPopup.css';

const TambahItemPopup = () => {
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate();

    const handleLinkCancel = (link) => {
        setActiveLink(link);
    };

    const SimpanItem = () => {
        alert('Data Tersimpan');
        navigate('/kelola-item'); 
    };

    return (
        <div className='tambahitem-popup-container'>
            <div className='tambahitem-popup-content'>
                <Link 
                    to="/kelola-item" 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </Link>
                <h1 className='text-tambahitem-popup'>Tambah Item</h1>
                <div className='kolom-tambah-item'>
                    <div className='nama-item'>
                        <span className='text-nama-item'>Nama Item :</span>
                        <input type='text' className='kolom-nama-item'></input>
                    </div>
                    <div className='kode-item'>
                        <span className='text-kode-item'>Kode Item :</span>
                        <input type='text' className='kolom-kode-item'></input>
                    </div>
                    <div className='harga-item'>
                        <span className='text-harga-item'>Harga Satuan :</span>
                        <input type='text' className='kolom-harga-item'></input>
                    </div>
                    <div className='satuan-item'>
                        <span className='text-satuan-item'>Satuan :</span>
                        <input type='text' className='kolom-satuan-item'></input>
                    </div>
                    <div className='stok-item'>
                        <span className='text-stok-item'>Stok/Kuantitas :</span>
                        <input type='text' className='kolom-stok-item'></input>
                    </div>
                    
                </div>
                <div className='tambah-item-container'>
                    <button className="simpan-item" onClick={SimpanItem}>Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default TambahItemPopup;
