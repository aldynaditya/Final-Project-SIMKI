import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Keuangan/Keuangan.css';
import list from "../../images/list.png";
import item from "../../images/item.png";

const SpvKeuangan = () => {
    const navigate = useNavigate();

    const TransaksiKeuangan = () => {
        navigate('transaksi-keuangan');
    };

    const NotifikasiKeuangan = () => {
        navigate('notifikasi-keuangan');
    };


    return (
        <div className='keuangan-container'>
            <div className='main-content-keuangan'>
            <h1 className='text_keuangan'>Dashboard</h1>
                <div className="klik_keuangan">
                    <div className="order-masuk" onClick={TransaksiKeuangan}>
                        <img src={list} alt='order-masuk' className='icon' />
                        <p>TRANSAKSI</p>
                    </div>
                    <div className="kelola_obat" onClick={NotifikasiKeuangan}>
                        <img src={item} alt='kelola_obat' className='icon' />
                        <p>NOTIFIKASI</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpvKeuangan;
