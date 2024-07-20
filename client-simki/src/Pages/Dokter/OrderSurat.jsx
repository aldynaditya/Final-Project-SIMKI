import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarPrivate from '../../components/NavbarPrivate';
import FooterPrivate from '../../components/FooterPrivate';
import Header from '../../components/Header';
import '../../Style/Dokter/OrderObat.css';
import '../../Style/Dokter/OrderProsedur.css';


const OrderSurat = () => {
    const [rows] = useState(Array.from({ length: 7 }));
    const navigate = useNavigate();

    const SuratRujukan = () => {
        navigate('/surat-rujukan');
    };
    const SuratSakit = () => {
        navigate('/surat-sakit');
    };

    const Menudokter = [
        { name: "Jadwal Dokter", path: "/schedule-dokter" },
        { name: "Pasien", path: "/pasien-dokter" },
        { name: "Notifikasi", path: "/notifikasi-dokter" }
      ];


    return (
        <div className='order-obat-container'>
            <NavbarPrivate />
            <Header accountName="Nama Akun Dokter" menuItems={Menudokter} />

            <h1 className='text-order-obat'>Order Obat</h1>
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
            <div className='button-order-surat'>
                <button className="surat-rujukan" onClick={SuratRujukan}>Surat Rujukan</button>
                <button className="surat-sakit" onClick={SuratSakit}>Surat Sakit</button>
            </div>
            <div className="tabel-order-obat">
                <table>
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Jenis Surat</th>
                            <th>Tujuan</th>
                            <th>Versi Surat</th>
                            <th>Status</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <FooterPrivate />
        </div>
    );
};

export default OrderSurat;
