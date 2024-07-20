import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Style/Dokter/IsiCppt.css';
import '../../Style/Resepsionis/CetakSuratPopup.css';

const IsiCppt = () => {
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate();

    const handleLinkCancel = (link) => {
        setActiveLink(link);
    };

    const SimpanCppt = () => {
        alert('Data Tersimpan');
        navigate('/entri-masuk'); 
    };

    const SelesaikanOrder = () => {
        navigate('/entri-masuk'); 
    };

    const DropdownOrder = (event) => {
        const selectedOption = event.target.value;
        if (selectedOption) {
            window.open(selectedOption, '_blank');
        }
    };

    return (
        <div className='isicppt-popup-container'>
            <div className='isicppt-popup-content'>
                <Link 
                    to="/entri-masuk" 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </Link>
                <h1 className='text-isicppt-popup'>Isi CPPT</h1>
                <div className='kolom-isi-cppt'>
                    <div className='pemeriksa-cppt'>
                        <span className='text-pemeriksa-cppt'>Pemeriksa :</span>
                        <input type='text' className='kolom-pemeriksa-cppt'></input>
                    </div>
                    <div className='penyakit-cppt'>
                        <span className='text-penyakit-cppt'>Riwayat Penyakit :</span>
                        <input type='text' className='kolom-penyakit-cppt'></input>
                    </div>
                    <div className='subjektif-cppt'>
                        <span className='text-subjektif-cppt'>Subjektif:</span>
                        <input type='text' className='kolom-subjektif-cppt'></input>
                    </div>
                    <div className='objektif-cppt'>
                        <span className='text-objektif-cppt'>Objektif :</span>
                        <input type='text' className='kolom-objektif-cppt'></input>
                    </div>
                    <div className='diagnosis-cppt'>
                        <span className='text-diagnosis-cppt'>Diagnosis :</span>
                        <input type='text' className='kolom-diagnosis-cppt'></input>
                    </div>
                    <div className='plan-cppt'>
                        <span className='text-plan-cppt'>Plan :</span>
                        <input type='text' className='kolom-plan-cppt'></input>
                    </div>
                    <div className='tindakan-cppt'>
                        <span className='text-tindakan-cppt'>Tindakan :</span>
                        <select onChange={DropdownOrder} className='dropdown-entri-baru'>
                            <option value="">Order</option>
                            <option value="/order-obat">Obat</option>
                            <option value="/order-prosedur">Prosedur Medis</option>
                            <option value="/buat-surat">Buat Surat</option>
                        </select>
                    </div>
                </div>
                <div className='simpan-cppt-container'>
                    <button className="simpan-cppt" onClick={SimpanCppt}>Simpan</button>
                    <button className="selesaikan-order" onClick={SelesaikanOrder}>Selesaikan Order</button>
                </div>
            </div>
        </div>
    );
};

export default IsiCppt;
