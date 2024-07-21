import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Keuangan/Keuangan.css';
import Header from '../../components/Header';
import list from "../../images/list.png";
import item from "../../images/item.png";

const SpvKeuangan = () => {
    const navigate = useNavigate();

    const OrderMasuk = () => {
        navigate('/order-masuk');
    };

    const KelolaObat = () => {
        navigate('/kelola-obat');
    };

    const Menuspv = [
        { name: "Transaksi", path: "/transaksi-keuangan" },
        { name: "Laporan", path: "/notifikasi-keuangan" }
    ];

    return (
        <div className='keuangan-container'>
            <div className='main-content-keuangan'>
            <Header accountName="Nama Akun keuangan" menuItems={Menuspv} />
            <h1 className='text_keuangan'>Dashboard</h1>
                <div className="klik_keuangan">
                    <div className="order-masuk" onClick={OrderMasuk}>
                        <img src={list} alt='order-masuk' className='icon' />
                        <p>TRANSAKSI</p>
                    </div>
                    <div className="kelola_obat" onClick={KelolaObat}>
                        <img src={item} alt='kelola_obat' className='icon' />
                        <p>LAPORAN</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpvKeuangan;
