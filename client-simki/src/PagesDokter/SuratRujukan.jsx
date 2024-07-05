import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SuratRujukan.css';

const SuratRujukan = () => {
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate();

    const handleLinkCancel = (link) => {
        setActiveLink(link);
    };

    const SimpanRujukan = () => {
        alert('Data Tersimpan');
        navigate('/order-surat'); 
    };

    return (
        <div className='suratrujukan-container'>
            <div className='suratrujukan-content'>
                <Link 
                    to="/order-surat" 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </Link>
                <h1 className='text-suratrujukan'>Surat Rujukan</h1>
                <div className='kolom-surat-rujukan'>
                    <div className='tujuan-rujukan'>
                        <span className='text-tujuan-rujukan'>Tujuan :</span>
                        <input type='text' className='kolom-tujuan-rujukan'></input>
                    </div>
                    <div className='tempat-rujukan'>
                        <span className='text-tempat-rujukan'>Tempat Tujuan :</span>
                        <input type='text' className='kolom-tempat-rujukan'></input>
                    </div>
                    <div className='diagnosis-rujukan'>
                        <span className='text-diagnosis-rujukan'>Diagnosis :</span>
                        <input type='text' className='kolom-diagnosis-rujukan'></input>
                    </div>
                    <div className='tindakan-rujukan'>
                        <p className='text-tindakan-rujukan-satu'>Tindakan yang Diberikan :</p>
                        <input type='text' className='kolom-tindakan-rujukan'></input>
                    </div>
                    <div className='keterangan-rujukan'>
                        <span className='text-keterangan-rujukan'>Keterangan :</span>
                        <input type='text' className='kolom-keterangan-rujukan'></input>
                    </div>
                    
                </div>
                <div className='button-surat-rujukan'>
                    <button className="simpan-rujukan" onClick={SimpanRujukan}>Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default SuratRujukan;
