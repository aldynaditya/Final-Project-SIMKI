import React from 'react';
import { useNavigate } from 'react-router-dom';
import RiwayatEpisode from '../../components/RiwayatEps';
import '../../Style/Resepsionis/EmrResepsionis.css';
import '../../Style/Dokter/EmrDokter.css';
import tambah from "../../images/tambah.png";
import masuk from "../../images/inbox.png";

const EmrDokter = () => {
    const navigate = useNavigate();

    const EntriMasuk = () => {
        navigate('entri-masuk');
    };

    const EntriBaru = () => {
        navigate('entri-baru');
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
            <div className='button-emr-dokter'>
                <div className="entri_masuk" onClick={EntriMasuk}>
                    <img src={masuk} alt='entri-masuk' className='icon-emr-dokter' />
                    <p>ENTRI MASUK</p>
                </div>
                <div className="entri-baru" onClick={EntriBaru}>
                    <img src={tambah} alt='entri-baru' className='icon-emr-dokter' />
                    <p>ENTRI BARU</p>
                </div>
            </div>
            <RiwayatEpisode />
        </div>
    );
};

export default EmrDokter;
