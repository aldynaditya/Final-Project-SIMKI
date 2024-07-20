import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Style/Resepsionis/CetakSuratPopup.css';

const SuratSakit = () => {
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate(); // Add useNavigate hook

    const handleLinkCancel = (link) => {
        setActiveLink(link);
    };

    const handleSuratSakit = () => {
        alert('Data Tersimpan');
        navigate('/order-surat'); // Navigate back to DetailEpisode page
    };

    return (
        <div className='cetaksurat-popup-container'>
            <div className='cetaksurat-popup-content'>
                <Link 
                    to="/order-surat" 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </Link>
                <h1 className='text-cetaksurat-popup'>Perpanjang Surat Sakit</h1>
                <div className='kolom-cetak-surat'>
                    <div className='umur-cetaksurat'>
                        <span className='text-umur-cetaksurat'>Umur :</span>
                        <input type='text' className='kolom-umur-cetaksurat'></input>
                    </div>
                    <div className='job-surat'>
                        <span className='text-job-surat'>Pekerjaan :</span>
                        <input type='text' className='kolom-job-surat'></input>
                    </div>
                    <div className='diagnosis-surat'>
                        <span className='text-diagnosis-surat'>Diagnosis :</span>
                        <input type='text' className='kolom-diagnosis-surat'></input>
                    </div>
                    <div className='kadaluarsa-surat'>
                        <div className='periode-surat'>
                            <span className='text-periode-surat'>Periode :</span>
                            <input type='date' className='kolom-periode-surat'></input>
                        </div>
                        <div className='hingga-surat'>
                            <span className='text-hingga-surat'>Hingga :</span>
                            <input type='date' className='kolom-hingga-surat'></input>
                        </div>
                    </div>
                </div>
                <div className='perubahan-surat-container'>
                    <button className="perubahan-surat" onClick={handleSuratSakit}>Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default SuratSakit;
