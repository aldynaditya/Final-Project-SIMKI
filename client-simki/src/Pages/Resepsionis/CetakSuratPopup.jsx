import React, { useState } from 'react';
import jsPDF from 'jspdf';
import '../../Style/Resepsionis/CetakSuratPopup.css';

const CetakSuratPopup = ({ onClose, nama }) => {
    const [activeLink, setActiveLink] = useState('');
    const [umur, setUmur] = useState('');
    const [job, setJob] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [periode, setPeriode] = useState('');
    const [hingga, setHingga] = useState('');

    const handleLinkCancel = (link) => {
        setActiveLink(link);
        onClose(); // Close the popup
    };

    const handlePerubahan = () => {
        alert('Data Tersimpan');
        onClose(); // Close the popup
    };

    const handleCetakSurat = () => {
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text('KLINIK PRATAMA DIPONEGORO1', 20, 20);
        doc.text('Alamat : Tembalang, Kec. Tembalang, Kota Semarang, Jawa Tengah 50275', 20, 30);
        doc.setFontSize(14);
        doc.text('SURAT KETERANGAN DOKTER', 75, 40);

        doc.setFontSize(12);
        doc.text('Yang bertanda tangan di bawah ini menerangkan bahwa :', 20, 50);
        doc.text(`Nama : ${nama}`, 20, 60);
        doc.text(`Jenis Kelamin : ...........................................`, 20, 70);
        doc.text(`Tgl. Lahir : ......................................................`, 20, 80);
        doc.text(`Umur : ${umur}`, 20, 90);
        doc.text(`Pekerjaan : ${job}`, 20, 100);
        doc.text(`Alamat : .........................................................`, 20, 110);

        doc.text('Berdasarkan hasil pemeriksaan yang telah dilakukan, Pasien tersebut', 20, 120);
        doc.text('dalam keadaan sakit. Sehingga perlu beristirahat selama ......... hari,', 20, 130);
        doc.text(`dari tanggal ${periode} s/d ${hingga}`, 20, 140);

        doc.text(`Diagnosa : ${diagnosis}`, 20, 150);

        doc.text('Demikian surat keterangan ini diberikan untuk diketahui dan', 20, 160);
        doc.text('dipergunakan sebagaimana mestinya.', 20, 170);

        doc.text('Semarang, ..............................................', 140, 180);
        doc.text('Dokter,', 140, 190);
        doc.text('( Nama Dokter )', 140, 200);

        doc.save('Surat_Sakit.pdf');

        onClose(); // Close the popup
    };

    return (
        <div className='cetaksurat-popup-container'>
            <div className='cetaksurat-popup-content'>
                <span 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </span>
                <h1 className='text-cetaksurat-popup'>Perpanjang Surat Sakit</h1>
                <div className='kolom-cetak-surat'>
                    <div className='umur-cetaksurat'>
                        <span className='text-umur-cetaksurat'>Umur :</span>
                        <input 
                            type='text' 
                            className='kolom-umur-cetaksurat' 
                            value={umur} 
                            onChange={(e) => setUmur(e.target.value)}
                        />
                    </div>
                    <div className='job-surat'>
                        <span className='text-job-surat'>Pekerjaan :</span>
                        <input 
                            type='text' 
                            className='kolom-job-surat' 
                            value={job} 
                            onChange={(e) => setJob(e.target.value)}
                        />
                    </div>
                    <div className='diagnosis-surat'>
                        <span className='text-diagnosis-surat'>Diagnosis :</span>
                        <input 
                            type='text' 
                            className='kolom-diagnosis-surat' 
                            value={diagnosis} 
                            onChange={(e) => setDiagnosis(e.target.value)}
                        />
                    </div>
                    <div className='kadaluarsa-extendsurat'>
                        <div className='periode-surat'>
                            <span className='text-periode-extendsurat'>Periode :</span>
                            <input 
                                type='date' 
                                className='kolom-periode-extendsurat' 
                                value={periode} 
                                onChange={(e) => setPeriode(e.target.value)}
                            />
                        </div>
                        <div className='hingga-surat'>
                            <span className='text-hingga-surat'>Hingga :</span>
                            <input 
                                type='date' 
                                className='kolom-hingga-surat' 
                                value={hingga} 
                                onChange={(e) => setHingga(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className='perubahan-surat-container'>
                    <button className="perubahan-surat" onClick={handlePerubahan}>Simpan Perubahan</button>
                    <button className="cetak-surat-popup" onClick={handleCetakSurat}>Cetak</button>
                </div>
            </div>
        </div>
    );
};

export default CetakSuratPopup;
