import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Style/Resepsionis/JadwalPopup.css';

const TambahJadwal = () => {
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate(); // Add useNavigate hook

    const handleLinkCancel = (link) => {
        setActiveLink(link);
    };

    const SimpanJadwal = () => {
        alert('Jadwal Ditambahkan');
        navigate('/kelola-jadwal'); // Navigate back to DetailEpisode page
    };

    return (
        <div className='tambah-jadwal-container'>
            <div className='tambah-jadwal-content'>
                <Link 
                    to="/kelola-jadwal" 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </Link>
                <h1 className='text-tambah-jadwal'>Tambah Jadwal</h1>
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
                        <input type='date' className='kolom-jam-tambahjadwal'></input>
                    </div>
                </div>
                <div className='tambahjadwal-container'>
                    <button className="button-tambahjadwal" onClick={SimpanJadwal}>Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default TambahJadwal;
