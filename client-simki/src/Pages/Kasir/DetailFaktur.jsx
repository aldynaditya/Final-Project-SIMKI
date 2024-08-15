import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveFactur } from '../../redux/kasir/create/actions'; 
import '../../Style/Kasir/DetailFaktur.css';

const DetailFaktur = ({ onClose }) => {
    const dispatch = useDispatch();
    const { loading, error, data } = useSelector(state => state.factur);

    const [metodePembayaran, setMetodePembayaran] = useState('');
    const [diskon, setDiskon] = useState('');
    const [keterangan, setKeterangan] = useState('');

    const handleMetodePembayaran = (event) => {
        setMetodePembayaran(event.target.value);
    };

    const handleDiskonChange = (event) => {
        setDiskon(event.target.value);
    };

    const handleKeteranganChange = (event) => {
        setKeterangan(event.target.value);
    };

    const SimpanFaktur = () => {
        dispatch(saveFactur({ metodePembayaran, diskon, keterangan }));
    };

    useEffect(() => {
        if (data || error) {
            alert(data ? `Data Tersimpan` : error);
            onClose();
        }
    }, [data, error, onClose]);

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
                        <input
                            type='text'
                            className='kolom-diskon-faktur'
                            value={diskon}
                            onChange={handleDiskonChange}
                        />
                    </div>
                    <div className='keterangan-faktur'>
                        <span className='text-keterangan-faktur'>Keterangan:</span>
                        <input
                            type='text'
                            className='kolom-keterangan-faktur'
                            value={keterangan}
                            onChange={handleKeteranganChange}
                        />
                    </div>
                </div>
                <div className='simpan-faktur-container'>
                    <button
                        className="simpan-faktur"
                        onClick={SimpanFaktur}
                        disabled={loading}
                    >
                        {loading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailFaktur;
