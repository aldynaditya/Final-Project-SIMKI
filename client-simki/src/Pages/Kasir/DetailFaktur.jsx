import React, { useState } from 'react';
import '../../Style/Kasir/DetailFaktur.css';

const DetailFaktur = ({ onClose }) => {
    const [metodePembayaran, setMetodePembayaran] = useState('');

    const handleMetodePembayaran = (event) => {
        setMetodePembayaran(event.target.value);
    };

    const SimpanFaktur = () => {
        alert(`Data Tersimpan dengan metode pembayaran: ${metodePembayaran}`);
        onClose();
    };

    return (
        <div className='modal-overlay'>
            <div className='detail-faktur-popup-container'>
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-detail-faktur'>Detail Faktur</h1>
                <div className='kolom-detail-faktur'>
                    <div className='metode-pembayaran'>
                        <span className='text-metode-pembayaran'>Metode Pembayaran:</span>
                        <select onChange={handleMetodePembayaran} className='dropdown-pembayaran'>
                            <option value="">Pilih Pembayaran</option>
                            <option value="Cash">Cash</option>
                            <option value="Bank">Bank</option>
                        </select>
                    </div>
                    <div className='diskon-faktur'>
                        <span className='text-diskon-faktur'>Diskon:</span>
                        <input type='text' className='kolom-diskon-faktur' />
                    </div>
                    <div className='keterangan-faktur'>
                        <span className='text-keterangan-faktur'>Keterangan:</span>
                        <input type='text' className='kolom-keterangan-faktur' />
                    </div>
                </div>
                <div className='simpan-faktur-container'>
                    <button className="simpan-faktur" onClick={SimpanFaktur}>Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default DetailFaktur;
