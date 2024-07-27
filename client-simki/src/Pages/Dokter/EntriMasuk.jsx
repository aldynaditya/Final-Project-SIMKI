import React from 'react';
import { useNavigate } from 'react-router-dom';
import RiwayatEpisode from '../../components/RiwayatEps';
import '../../Style/Resepsionis/EmrResepsionis.css';
import '../../Style/Resepsionis/DetailEpsResep.css';
import '../../Style/Dokter/EntriMasuk.css';

const EntriMasuk = () => {
    const navigate = useNavigate();

    const IsiCppt = () => {
        navigate('isi-cppt');
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
            <h2 className='text-riwayat-episode'>Entri Masuk :</h2>
            <div className='kolom-detail-eps'>
                <div className='tgl-detail'>
                    <span className='text-tgl-detail'>Tanggal :</span>
                    <input type='date' className='kolom-tgl-detail'></input>
                </div>
                <div className='poli-detail'>
                    <span className='text-poli-detail'>Poli :</span>
                    <input type='text' className='kolom-poli-detail'></input>
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
            </div>
            <div className='button-entri-masuk'>
                <button type="isi" className="simpan-entri-masuk" onClick={IsiCppt}>Isi CPPT</button>
            </div>
            <RiwayatEpisode />
        </div>
    );
};

export default EntriMasuk;
