import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Keuangan/UploadLaporan.css';

const UploadLaporan = ({ onClose }) => {
    const [activeLink, setActiveLink] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleLinkCancel = (link) => {
        setActiveLink(link);
        onClose();
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const TambahLaporan = () => {
        if (selectedFile) {
            alert(`Laporan ${selectedFile.name} Berhasil Diunggah`);
            onClose();
        } else {
            alert('Silakan unggah laporan terlebih dahulu.');
        }
    };

    return (
        <div className='tambahlaporan-popup-container'>
            <div className='tambahlaporan-popup-content'>
                <button 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </button>
                <h1 className='text-tambahlaporan-popup'>Tambah Laporan</h1>
                <div className='kolom-tambah-laporan'>
                    <div className='tgl-laporan'>
                        <span className='text-tgl-laporan'>Tanggal :</span>
                        <input type='date' className='kolom-tgl-laporan' />
                    </div>
                    <div className='no-laporan'>
                        <span className='text-no-laporan'>No. Laporan :</span>
                        <input type='text' className='kolom-no-laporan' />
                    </div>
                    <div className='periode-laporan'>
                        <span className='text-periode-laporan'>Periode :</span>
                        <input type='text' className='kolom-periode-laporan' />
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
