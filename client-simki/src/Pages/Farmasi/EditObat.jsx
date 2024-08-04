import React, { useState } from 'react';
import '../../Style/Perawat/TambahitemPopup.css';

const EditObat = ({ onClose }) => {
    const [activeLink, setActiveLink] = useState('');

    const handleLinkCancel = () => {
        setActiveLink('cancel');
        onClose();
    };

    const SimpanObat = () => {
        alert('Data Tersimpan');
        onClose();
    };

    return (
        <div className='tambahitem-popup-container'>
            <div className='tambahitem-popup-content'>
                <button 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={handleLinkCancel}
                >
                    Cancel X
                </button>
                <h1 className='text-tambahitem-popup'>Edit Obat</h1>
                <div className='kolom-tambah-item'>
                    <div className='nama-item'>
                        <span className='text-nama-item'>Nama Obat :</span>
                        <input type='text' className='kolom-nama-item' />
                    </div>
                    <div className='kode-item'>
                        <span className='text-kode-item'>Kode Obat :</span>
                        <input type='text' className='kolom-kode-item' />
                    </div>
                    <div className='harga-item'>
                        <span className='text-harga-item'>Harga Satuan :</span>
                        <input type='text' className='kolom-harga-item' />
                    </div>
                    <div className='satuan-item'>
                        <span className='text-satuan-item'>Satuan :</span>
                        <input type='text' className='kolom-satuan-item' />
                    </div>
                    <div className='stok-item'>
                        <span className='text-stok-item'>Stok/Kuantitas :</span>
                        <input type='text' className='kolom-stok-item' />
                    </div>
                </div>
                <div className='tambah-item-container'>
                    <button className="simpan-item" onClick={SimpanObat}>Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default EditObat;
