import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../Style/Pasien/BuatJanji.css';

const BuatJanji = () => {
    const handleBuatJanji = () => {
        alert('Janji Anda Sedang Kami Proses');
    };

    const [selectedPoli, setSelectedPoli] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [penjamin, setPenjamin] = useState('');
    const [time, setTime] = useState(''); // State untuk menyimpan waktu

    const handlePoliChange = (event) => {
        const selectedPoli = event.target.value;
        setSelectedPoli(selectedPoli);

        if (selectedPoli === 'umum') {
            setDoctors([
                'dr. Akhmad Ismail, Senin & Selasa (08.30-12.30 WIB)', 
                'dr. Neni Susilaningsih, Rabu (08.30-12.30 WIB)',
                'dr. Farmaditya Eka Putra, Kamis (08.30-12.30 WIB), Jumat & Sabtu (18.00-21.00 WIB)',
                'dr. Dea Amarilisa Adespin, Jumat (08.30-12.30 WIB)',
                'dr. Budi Laksono, Sabtu (08.30-12.30 WIB)',
                'dr. Nur Asri, Senin & Selasa (14.00-18.00 WIB)',
                'dr. Della Rimawati, Rabu-Sabtu (14.00-18.00 WIB)',
                'dr. Citra Hutami Saraswati, Senin & Selasa (18.00-21.00 WIB)',
                'dr. Amalian Puswitasari, Rabu & Kamis (18.00-21.00 WIB)'
            ]);
        } else if (selectedPoli === 'gigi') {
            setDoctors([
                'drg. Tyas Prihatiningsih, Senin & Selasa (08.30-11.30 WIB)', 
                'drg. Ahmad Fahmi Fahrobi, Senin (16.00-20.00 WIB) & Kamis (08.30-11.30 WIB)',
                'drg. Eghia Laditra Ambarani, Rabu (08.30-11.30 WIB), Jumat (08.30-11.30 WIB), Sabtu (08.30-11.30 WIB)'
            ]);
        } else {
            setDoctors([]);
        }
    };

    return (
        <div className='BuatJanji_container'>
            <Navbar />
            <h1 className='text_buatjanji'>Buat Janji</h1>
            <div className='form_container'>
                <div className='form_group'>
                    <label htmlFor="poli">Poli :</label>
                    <select id="poli" value={selectedPoli} onChange={handlePoliChange}>
                        <option value="">Poli</option>
                        <option value="umum">Umum</option>
                        <option value="gigi">Gigi</option>
                    </select>
                </div>

                <div className='form_group'>
                    <label htmlFor="dokter">Dokter :</label>
                    <select id="dokter">
                        <option value="">Dokter</option>
                        {doctors.map((doctor, index) => (
                            <option key={index} value={doctor}>{doctor}</option>
                        ))}
                    </select>
                </div>

                <div className='form_group'>
                    <label htmlFor="tanggal">Tanggal :</label>
                    <input type="date" id="tanggal" />
                </div>

                <div className='form_group'>
                    <label htmlFor="jam">Jam :</label>
                    <input type="time" id="jam" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>

                <div className='form_group'>
                    <label htmlFor="penjamin">Penjamin :</label>
                    <select id="penjamin" value={penjamin} onChange={(e) => setPenjamin(e.target.value)}>
                        <option value="umum">Umum</option>
                        <option value="asuransi">Asuransi</option>
                        <option value="bpjs">BPJS</option>
                    </select>
                </div>

                <div className='keluhan'>
                    <input type="text" placeholder="Keluhan Umum" />
                </div>

                <button className='klik_buatjanji' onClick={handleBuatJanji}>Buat Janji</button>
            </div>
            <Footer />
        </div>
    );
};

export default BuatJanji;
