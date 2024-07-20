import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Style/Keuangan/UploadLaporan.css';

const UploadLaporan = () => {
    const [activeLink, setActiveLink] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleLinkCancel = (link) => {
        setActiveLink(link);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const TambahLaporan = () => {
        if (selectedFile) {
            // Lakukan logika unggah file di sini, misalnya, kirim file ke server
            alert(`Laporan ${selectedFile.name} Berhasil Diunggah`);
            navigate('/notifikasi-keuangan'); 
        } else {
            alert('Silakan unggah laporan terlebih dahulu.');
        }
    };

    return (
        <div className='tambahlaporan-popup-container'>
            <div className='tambahlaporan-popup-content'>
                <Link 
                    to="/notifikasi-keuangan" 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </Link>
                <h1 className='text-tambahlaporan-popup'>Tambah Laporan</h1>
                <div className='kolom-tambah-laporan'>
                    <div className='tgl-laporan'>
                        <span className='text-tgl-laporan'>Tanggal :</span>
                        <input type='date' className='kolom-tgl-laporan'></input>
                    </div>
                    <div className='no-laporan'>
                        <span className='text-no-laporan'>No. Laporan :</span>
                        <input type='text' className='kolom-no-laporan'></input>
                    </div>
                    <div className='periode-laporan'>
                        <span className='text-periode-laporan'>Periode :</span>
                        <input type='text' className='kolom-periode-laporan'></input>
                    </div>
                    <div className='unggah-laporan'>
                        <span className='text-unggah-laporan'>Unggah Laporan:</span>
                        <input 
                            type='file' 
                            className='kolom-unggah-laporan' 
                            accept='application/pdf' 
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className='tambah-laporan-container'>
                    <button className="tambah-laporan" onClick={TambahLaporan}>Tambahkan Laporan</button>
                </div>
            </div>
        </div>
    );
};

export default UploadLaporan;
