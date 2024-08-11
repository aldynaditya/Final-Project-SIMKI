import React, { useState } from 'react';
import '../../Style/Resepsionis/BuatJanjiPopup.css';

const BuatJanjiPopup = ({ onClose }) => {
    const [namaPasien, setNamaPasien] = useState('');
    const [poli, setPoli] = useState('');
    const [dokter, setDokter] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [jam, setJam] = useState('');
    const [penjamin, setPenjamin] = useState('Umum');

    const dokterOptions = {
        Umum: ['dr. Akhmad Ismail', 'dr. Neni Susilaningsih', 'dr. Farmaditya Eka Putra', 'dr. Dea Amarilisa Adespin', 'dr. Budi Laksono', 'dr. Nur Asri', 'dr. Della Rimawati', 'dr. Citra Hutami Saraswati', 'dr. Amalian Puswitasari'],
        Gigi: ['drg. Tyas Prihatiningsih', 'drg. Ahmad Fahmi Fahrobi', 'drg. Eghia Laditra Ambarani']
    };

    const handleSimpan = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ namaPasien, dokter, poli, tanggal, jam, penjamin });
        handleSimpan();
    };

    const handlePoliChange = (e) => {
        const selectedPoli = e.target.value;
        setPoli(selectedPoli);
        setDokter('');
    };



    return (
        <div className="popup-container">
            <div className="popup-content">
                <h1 className='text-popup-buatjanji'>Buat Janji</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nama Pasien:
                        <input
                            type="text"
                            value={namaPasien}
                            onChange={(e) => setNamaPasien(e.target.value)}
                        />
                    </label>
                    <label>
                        Poli:
                        <select value={poli} onChange={handlePoliChange}>
                            <option value="">Pilih Poli</option>
                            <option value="Umum">Umum</option>
                            <option value="Gigi">Gigi</option>
                        </select>
                    </label>
                    {!poli || (
                        <label>
                            Dokter:
                            <select value={dokter} onChange={(e) => setDokter(e.target.value)}>
                                <option value="">Pilih Dokter</option>
                                {dokterOptions[poli].map((dokterName, index) => (
                                    <option key={index} value={dokterName}>
                                        {dokterName}
                                    </option>
                                ))}
                            </select>
                        </label>
                    )}
                    <label>
                        Tanggal:
                        <input
                            type="date"
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                        />
                    </label>
                    <label>
                        Jam:
                        <input
                            type="time"
                            value={jam}
                            onChange={(e) => setJam(e.target.value)}
                        />
                    </label>
                    <label>
                        Penjamin:
                        <select value={penjamin} onChange={(e) => setPenjamin(e.target.value)}>
                            <option value="Umum">Umum</option>
                            <option value="Asuransi">Asuransi</option>
                            <option value="BPJS">BPJS</option>
                        </select>
                    </label>
                    <button type="submit" className="submit-buatjanji">Simpan</button>
                </form>
            </div>
        </div>
    );
};

export default BuatJanjiPopup;
