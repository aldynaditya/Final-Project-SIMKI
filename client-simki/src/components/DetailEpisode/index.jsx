import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RiwayatEpisode from '../RiwayatEps/index';
import CetakSuratPopup from '../../Pages/Resepsionis/CetakSuratPopup';
import HasilKuisionerPopup from '../../Pages/Dokter/HasilKuisionerPopup'; // Assuming you have this component
import '../../Style/Resepsionis/EmrResepsionis.css';
import '../../Style/components/DetailEpisode.css';

const DetailEpisode = () => {
    const { role } = useSelector((state) => state.auth);
    const [showCetakSuratPopup, setShowCetakSuratPopup] = useState(false);
    const [showHasilKuisionerPopup, setShowHasilKuisionerPopup] = useState(false);

    const CetakSurat = () => {
        setShowCetakSuratPopup(true);
    };

    const HasilKuisioner = () => {
        setShowHasilKuisionerPopup(true);
    };

    const closeCetakSuratPopup = () => {
        setShowCetakSuratPopup(false);
    };

    const closeHasilKuisionerPopup = () => {
        setShowHasilKuisionerPopup(false);
    };

    return (
        <div className='emr-resepsionis-container'>
            <h1 className='text-emr-resepsionis'>EMR Pasien</h1>
            <div className='kolom-emr-resepsionis'>
                <div className='no-emr-rsp'>
                    <span className='text-nemr-rsp'>No. EMR :</span>
                    <input type='text' className='kolom-nemr-rsp'></input>
                </div>
                <div className='nama-pasien-rsp'>
                    <span className='text-npasien-rsp'>Nama Pasien :</span>
                    <input type='text' className='kolom-npasien-rsp'></input>
                </div>
                <div className='tgl-lahir-rsp'>
                    <span className='text-ttl-rsp'>Tanggal Lahir :</span>
                    <input type='date' className='kolom-ttl-rsp'></input>
                </div>
                <div className='gender-goldar-rsp'>
                    <div className='gender-emr-rsp'>
                        <span className='text-gender-rsp'>Jenis Kelamin :</span>
                        <input type='text' className='kolom-gender-rsp'></input>
                    </div>
                    <div className='goldar-emr-rsp'>
                        <span className='text-goldar-rsp'>Golongan Darah :</span>
                        <input type='text' className='kolom-goldar-rsp'></input>
                    </div>
                </div>
                <div className='alergi-rsp'>
                    <span className='text-alergi-rsp'>Alergi :</span>
                    <input type='text' className='kolom-alergi-rsp'></input>
                </div>
            </div>
            <h2 className='text-riwayat-episode'>Detail Episode :</h2>
            <div className='kolom-detail-eps'>
                <div className='tgl-detail'>
                    <span className='text-tgl-detail'>Tanggal :</span>
                    <input type='date' className='kolom-tgl-detail'></input>
                </div>
                <div className='penjamin-detail'>
                    <span className='text-penjamin-detail'>Penjamin :</span>
                    <input type='text' className='kolom-penjamin-detail'></input>
                </div>
                <div className='pemeriksa-detail'>
                    <span className='text-pemeriksa-detail'>Pemeriksa :</span>
                    <input type='text' className='kolom-pemeriksa-detail'></input>
                </div>
                <div className='poli-detail'>
                    <span className='text-poli-detail'>Poli :</span>
                    <input type='text' className='kolom-poli-detail'></input>
                </div>
                <div className='penyakit-detail'>
                    <span className='text-penyakit-detail'>Riwayat Penyakit :</span>
                    <input type='text' className='kolom-penyakit-detail'></input>
                </div>
                <div className='subjektif-detail'>
                    <span className='text-subjektif-detail'>Subjektif :</span>
                    <input type='text' className='kolom-subjektif-detail'></input>
                </div>
                <div className='vital-detail'>
                    <span className='text-vital-detail'>Tanda Vital :</span>
                    <div className='isian-detail-eps'>
                        <div className='atas-vital-detail'>
                            <div className='td-detail'>
                                <span className='text-td-detail'>TD :</span>
                                <input type='text' className='kolom-td-detail'></input>
                            </div>
                            <div className='suhu-detail'>
                                <span className='text-suhu-detail'>Suhu :</span>
                                <input type='text' className='kolom-suhu-detail'></input>
                            </div>
                        </div>
                        <div className='bawah-vital-detail'>
                            <div className='indeks-detail'>
                                <span className='text-indeks-detail'>Indeks :</span>
                                <input type='text' className='kolom-indeks-detail'></input>
                            </div>
                            <div className='napas-detail'>
                                <span className='text-napas-detail'>Napas :</span>
                                <input type='text' className='kolom-napas-detail'></input>
                            </div>
                        </div>
                        <div className='detak-detail'>
                            <span className='text-detak-detail'>Detak :</span>
                            <input type='text' className='kolom-detak-detail'></input>
                        </div>
                    </div>
                    
                </div>
                <div className='objektif-detail'>
                    <span className='text-objektif-detail'>Objektif :</span>
                    <input type='text' className='kolom-objektif-detail'></input>
                </div>
                <div className='diagnosis-detail'>
                    <span className='text-diagnosis-detail'>Diagnosis :</span>
                    <input type='text' className='kolom-diagnosis-detail'></input>
                </div>
                <div className='plan-detail'>
                    <span className='text-plan-detail'>Plan :</span>
                    <input type='text' className='kolom-plan-detail'></input>
                </div>
                <div className='tindakan-detail'>
                    <span className='text-tindakan-detail'>Tindakan :</span>
                    <input type='text' className='kolom-tindakan-detail'></input>
                </div>
            </div>
            <div className='button-detail'>
                {role === 'resepsionis' && (
                    <button className="cetak-surat" onClick={CetakSurat}>Cetak Surat</button>
                )}
                {role === 'dokter' && (
                    <button className="hasil-kuisioner" onClick={HasilKuisioner}>Hasil Kuisioner</button>
                )}
            </div>
            <RiwayatEpisode />
            {showCetakSuratPopup && <CetakSuratPopup onClose={closeCetakSuratPopup} />}
            {showHasilKuisionerPopup && <HasilKuisionerPopup onClose={closeHasilKuisionerPopup} />}
        </div>
    );
};

export default DetailEpisode;
