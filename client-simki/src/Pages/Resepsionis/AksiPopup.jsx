import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Resepsionis/AksiPopup.css';

const UpdateStatus = ({ onClose }) => {
    const [activeLink, setActiveLink] = useState('');
    const [aksi, setAksi] = useState('');
    const navigate = useNavigate();

    const handleLinkCancel = (link) => {
        setActiveLink(link);
        if (onClose) {
            onClose(); // Close the popup
        }
    };

    const SimpanAksi = () => {
        alert('Status Sudah Diperbarui');
        if (onClose) {
            onClose(); // Close the popup
        }
    };

    return (
        <div className='update-status-container'>
            <div className='update-status-content'>
                <div 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </div>
                <h1 className='text-update-status'>Update Status</h1>
                <div className='kolom-update-status'>
                    <div className='status-aksi'>
                        <span className='text-status-aksi'>Status :</span>
                        <select 
                            className='kolom-status-aksi' 
                            value={aksi} 
                            onChange={(e) => setAksi(e.target.value)}
                        >
                            <option value=''>Pilih Aksi</option>
                            <option value='terima'>Terima</option>
                            <option value='tolak'>Tolak</option>
                        </select>
                    </div>
                    <div className='keterangan-aksi'>
                        <span className='text-keterangan-aksi'>Keterangan :</span>
                        <textarea 
                            className='kolom-keterangan-aksi' 
                            placeholder='Masukkan keterangan'
                        />
                    </div>
                </div>
                <div className='updateaksi-container'>
                    <button className="button-updatestatus" onClick={SimpanAksi}>Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateStatus;
