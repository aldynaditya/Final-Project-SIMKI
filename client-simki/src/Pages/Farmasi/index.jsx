import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Farmasi/Farmasi.css';
import list from "../../images/list.png";
import item from "../../images/item.png";

const Farmasi = () => {
  const navigate = useNavigate();

  const OrderMasuk = () => {
    navigate('order-masuk');
  };

  const KelolaObat = () => {
    navigate('kelola-obat');
  };


  return (
    <div className='farmasi-container'>
      <div className='main-content-farmasi'>
        <h1 className='text_farmasi'>Dashboard</h1>
        <div className="klik_farmasi">
            <div className="order-masuk" onClick={OrderMasuk}>
                <img src={list} alt='order-masuk' className='icon' />
                <p>ORDER MASUK</p>
            </div>
            <div className="kelola_obat" onClick={KelolaObat}>
                <img src={item} alt='kelola_obat' className='icon' />
                <p>KELOLA OBAT</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Farmasi;
