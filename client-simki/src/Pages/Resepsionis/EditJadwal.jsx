import React, { useState } from 'react';
import '../../Style/Resepsionis/JadwalPopup.css';

const EditJadwal = ({ onClose, title }) => {
    const [activeLink, setActiveLink] = useState('');

    const handleLinkCancel = (link) => {
        setActiveLink(link);
        if (onClose) {
            onClose(); // Close the popup
        }
    };

    const SimpanJadwal = () => {
        alert('Jadwal Sudah Diperbarui');
        if (onClose) {
            onClose(); // Close the popup
        }
    };

    return (
        <div className='tambah-jadwal-container'>
            <div className='tambah-jadwal-content'>
                <div 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </div>
                <h1 className='text-tambah-jadwal'>{title}</h1>
                <div className='kolom-dokter-jadwal'>
                    <div className='ndokter-tambahjadwal'>
                        <span className='text-ndokter-tambahjadwal'>Nama Dokter :</span>
                        <input type='text' className='kolom-ndokter-tambahjadwal'></input>
                    </div>
                    <div className='poli-tambahjadwal'>
                        <span className='text-poli-tambahjadwal'>Poli :</span>
                        <input type='text' className='kolom-poli-tambahjadwal'></input>
                    </div>
                    <div className='hari-tambahjadwal'>
                        <span className='text-hari-tambahjadwal'>Hari :</span>
                        <input type='text' className='kolom-hari-tambahjadwal'></input>
                    </div>
                    <div className='jam-tambahjadwal'>
                        <span className='text-jam-tambahjadwal'>Jam :</span>
                        <input type='time' className='kolom-jam-tambahjadwal'></input>
                    </div>
                </div>
                <div className='tambahjadwal-container'>
                    <button className="button-tambahjadwal" onClick={SimpanJadwal}>Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default EditJadwal;
