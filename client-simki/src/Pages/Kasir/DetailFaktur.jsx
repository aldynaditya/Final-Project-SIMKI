import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Style/Kasir/DetailFaktur.css';

const DetailFaktur = () => {
    const [activeLink, setActiveLink] = useState('');
    const [penjamin, setPenjamin] = useState('');
    const [metodePembayaran, setMetodePembayaran] = useState('');
    const navigate = useNavigate();

    const handleLinkCancel = (link) => {
        setActiveLink(link);
    };


    const handlePenjamin = (event) => {
        setPenjamin(event.target.value);
    };

    const handleMetodePembayaran = (event) => {
        setMetodePembayaran(event.target.value);
    };

    const SimpanFaktur = () => {
        alert(`Data Tersimpan dengan penjamin: ${penjamin} metode pembayaran: ${metodePembayaran} `) 
        navigate('/transaksi-kasir'); 
    };

    return (
        <div className='detail-faktur-container'>
            <div className='detail-faktur-content'>
                <Link 
                    to="/transaksi-kasir" 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </Link>
                <h1 className='text-detail-faktur'>Detail Faktur</h1>
                <div className='kolom-detail-faktur'>
                    <div className='penjamin-faktur'>
                        <span className='text-penjamin-faktur'>Penjamin :</span>
                        <select onChange={handlePenjamin} className='dropdown-penjamin'>
                            <option value="">Pilih Penjamin</option>
                            <option value="Umum">Umum</option>
                            <option value="Asuransi">Asuransi</option>
                            <option value="BPJS">BPJS</option>
                        </select>
                    </div>
                    <div className='metode-pembayaran'>
                        <span className='text-metode-pembayaran'>Metode Pembayaran :</span>
                        <select onChange={handleMetodePembayaran} className='dropdown-pembayaran'>
                            <option value="">Pilih Metode Pembayaran</option>
                            <option value="Cash">Cash</option>
                            <option value="Bank">Bank</option>
                        </select>
                    </div>
                    <div className='diskon-faktur'>
                        <span className='text-diskon-faktur'>Diskon :</span>
                        <input type='text' className='kolom-diskon-faktur'></input>
                    </div>
                    <div className='keterangan-faktur'>
                        <span className='text-keterangan-faktur'>Keterangan :</span>
                        <input type='text' className='kolom-keterangan-faktur'></input>
                    </div>          
                </div>
                <div className='simpan-faktur-container'>
                    <button className="simpan-faktur" onClick={SimpanFaktur}>Simpan/Cetak</button>
                </div>
            </div>
        </div>
    );
};

export default DetailFaktur;
