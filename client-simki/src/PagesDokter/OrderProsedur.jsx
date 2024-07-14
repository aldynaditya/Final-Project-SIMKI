import React, { useState } from 'react';
import NavbarPrivate from '../components/NavbarPrivate';
import FooterPrivate from '../components/FooterPrivate';
import HeaderDokter from './HeaderDokter';
import { useNavigate } from 'react-router-dom';
import './OrderObat.css';
import './OrderProsedur.css';

const OrderProsedur = () => {
    const [rows] = useState(Array.from({ length: 7 }));

    const navigate = useNavigate();

    const SimpanProsedur = () => {
        alert('Data Tersimpan'); 
    };

    const TambahProsedur = () => {
        navigate('/tambah-prosedur');
    };

    return (
        <div className='order-obat-container'>
            <NavbarPrivate />
            <HeaderDokter />

            <h1 className='text-order-obat'>Order Prosedur</h1>
            <div className='kolom-order-obat'>
                <div className='baris-satu'>
                    <div className='nemr-order-obat'>
                        <span className='text-nemr-obat'>No. EMR :</span>
                        <input type='text' className='kolom-nemr-obat' />
                    </div>
                    <div className='nama-order-obat'>
                        <span className='text-nama-obat'>Nama Pasien :</span>
                        <input type='text' className='kolom-nama-obat' />
                    </div>
                </div>
                <div className='baris-dua'>
                    <div className='tanggal-order-obat'>
                        <span className='text-tanggal-obat'>Tanggal :</span>
                        <input type="date" className='kolom-tanggal-obat' />
                    </div>
                    <div className='nfaktur-order-obat'>
                        <span className='text-nfaktur-obat'>Nomor Faktur :</span>
                        <input type='text' className='kolom-nfaktur-obat' />
                    </div>
                </div>
                <div className='baris-tiga'>
                    <div className='jam-order-obat'>
                        <span className='text-jam-obat'>Jam :</span>
                        <input type="time" className='kolom-jam-obat' />
                    </div>
                    <div className='poli-order-obat'>
                        <span className='text-poli-obat'>Poli :</span>
                        <input type='text' className='kolom-poli-obat' />
                    </div>
                </div>
                <div className='pemeriksa-order-obat'>
                    <span className='text-pemeriksa-obat'>Pemeriksa :</span>
                    <input type='text' className='kolom-pemeriksa-obat' />
                </div>
            </div>
            <div className='input-order-obat'>
                <button className='tambah-prosedur' onClick={TambahProsedur}>Tambah Prosedur</button>
            </div>
            <div className="tabel-order-obat">
                <table>
                    <thead>
                        <tr>
                            <th>Nama Item</th>
                            <th>Kode Item</th>
                            <th>Satuan</th>
                            <th>@Harga</th>
                            <th>Kuantitas</th>
                            <th>Stok</th>
                            <th>Dosis</th>
                            <th>Catatan</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((_, index) => (
                            <tr key={index}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="simpan-prosedur" onClick={SimpanProsedur}>Simpan</button>
            <FooterPrivate />
        </div>
    );
};

export default OrderProsedur;
