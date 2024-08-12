import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchorderInfo } from '../../redux/doctor/orderInfo/actions';
import TambahObat from './TambahObat';
import '../../Style/Dokter/OrderObat.css';

const OrderObat = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getorderInfo);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchorderInfo(id));
    }, [dispatch, id]);

    const handlePopUpTambahObat = () => {
        setIsPopupVisible(true);
    };

    const handleCloseTambahObat = () => {
        setIsPopupVisible(false);
    };

    const handleTambahObatComplete = () => {
        setIsPopupVisible(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
    
        const utcOffset = 7 * 60;
        const localDate = new Date(date.getTime() + utcOffset * 60 * 1000);

        const hours = String(localDate.getUTCHours()).padStart(2, '0');
        const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
    
        return `${hours}:${minutes}`;
    };

    const SimpanObat = () => {
        alert('Data Tersimpan'); 
    };

    return (
        <div className='order-obat-container'>
            <h1 className='text-order-obat'>Order Obat</h1>
            <div className='kolom-order-obat'>
                <div className='baris-satu'>
                    <div className='nemr-order-obat'>
                        <span className='text-nemr-obat'>No. EMR :</span>
                        <input type='text' className='kolom-nemr-obat' name="noEMR" value={data.noEMR} readOnly/>
                    </div>
                    <div className='nama-order-obat'>
                        <span className='text-nama-obat'>Nama Pasien :</span>
                        <input type='text' className='kolom-nama-obat' name="namaPasien" value={data.namaPasien} readOnly/>
                    </div>
                </div>
                <div className='baris-dua'>
                    <div className='tanggal-order-obat'>
                        <span className='text-tanggal-obat'>Tanggal :</span>
                        <input type="date" className='kolom-tanggal-obat' name="tanggal" value={formatDate(data.tanggal)} readOnly/>
                    </div>
                    <div className='nfaktur-order-obat'>
                        <span className='text-nfaktur-obat'>Nomor Faktur :</span>
                        <input type='text' className='kolom-nfaktur-obat' name="nomorFaktur" value={data.nomorFaktur} readOnly/>
                    </div>
                </div>
                <div className='baris-tiga'>
                    <div className='jam-order-obat'>
                        <span className='text-jam-obat'>Jam :</span>
                        <input type="text" className='kolom-jam-obat' name="jam" value={formatTime(data.jam)} readOnly/>
                    </div>
                    <div className='poli-order-obat'>
                        <span className='text-poli-obat'>Poli :</span>
                        <input type='text' className='kolom-poli-obat' name="poli" value={data.poli} readOnly/>
                    </div>
                </div>
                <div className='pemeriksa-order-obat'>
                    <span className='text-pemeriksa-obat'>Pemeriksa :</span>
                    <input type='text' className='kolom-pemeriksa-obat' name="pemeriksa" value={data.pemeriksa} readOnly/>
                </div>
            </div>
            <div className='input-order-obat'>
                <button 
                    className='tambah-obat-dokter' 
                    onClick={handlePopUpTambahObat}
                    >
                        Tambah Obat
                </button>
            </div>
            {isPopupVisible &&
                <TambahObat
                    id={id}
                    onClose={handleCloseTambahObat} 
                    onComplete={handleTambahObatComplete} 
                />
            }
            <div className="tabel-order-obat">
                <table>
                    <thead>
                        <tr>
                            <th>Nama Obat</th>
                            <th>Kode Obat</th>
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
                        {/* {rows.map((_, index) => ( */}
                            <tr>
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
                        {/* ))} */}
                    </tbody>
                </table>
            </div>
            <button className="simpan-obat" onClick={SimpanObat}>Simpan</button>
        </div>
    );
};

export default OrderObat;
