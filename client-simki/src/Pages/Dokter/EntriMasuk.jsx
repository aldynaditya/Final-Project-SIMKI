import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchdetailEmr } from '../../redux/doctor/detailEmr/actions';
import { fetchVitalsign } from '../../redux/doctor/vitalSign/actions';
import { formatDateStrip } from '../../utils/dateUtils';
import RiwayatEpisode from '../../components/RiwayatEps';
import '../../Style/Dokter/EntriMasuk.css';

const EntriMasuk = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, error } = useSelector(state => state.getdetailEmr);
    const { data: datavs, loading: loadingvs, error: errorvs } = useSelector(state => state.getVital);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [TD1, setTD1] = useState('');
    const [TD2, setTD2] = useState('');
    
    useEffect(() => {
        dispatch(fetchdetailEmr(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(fetchVitalsign(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (datavs) {
            const [systolic, diastolic] = (datavs.td|| '').split('/');
    
            setTD1(systolic || '');
            setTD2(diastolic || '');
        }
    }, [datavs]);

    const handleCPPT = () => {
        navigate(`/dokter/entri-masuk-cppt/${id}`);
    };

    return (
        <div className='emr-resepsionis-container'>
            <h1 className='text-emr-resepsionis'>CPPT</h1>
            <div className='kolom-emr-resepsionis'>
                <div className='no-emr-rsp'>
                    <span className='text-nemr-rsp'>No. EMR :</span>
                    <input type='text' className='kolom-nemr-rsp' name="noEMR" value={data.noEMR} readOnly></input>
                </div>
                <div className='nama-pasien-rsp'>
                    <span className='text-npasien-rsp'>Nama Pasien :</span>
                    <input type='text' className='kolom-npasien-rsp' name="nama_pasien" value={data.nama_pasien} readOnly></input>
                </div>
                <div className='tgl-lahir-rsp'>
                    <span className='text-ttl-rsp'>Tanggal Lahir :</span>
                    <input type='text' className='kolom-ttl-rsp' name="tanggal_lahir" value={formatDateStrip(data.tanggal_lahir)} readOnly></input>
                </div>
                <div className='gender-goldar-rsp'>
                    <div className='gender-emr-rsp'>
                        <span className='text-gender-rsp'>Jenis Kelamin :</span>
                        <input type='text' className='kolom-gender-rsp' name="jenis_kelamin" value={data.jenis_kelamin} readOnly></input>
                    </div>
                    <div className='goldar-emr-rsp'>
                        <span className='text-goldar-rsp'>Golongan Darah :</span>
                        <input type='text' className='kolom-goldar-rsp' name="gol_darah" value={data.gol_darah} readOnly></input>
                    </div>
                </div>
                <div className='alergi-rsp'>
                    <span className='text-alergi-rsp'>Alergi :</span>
                    <input type='text' className='kolom-alergi-rsp' name="alergi" value={datavs.alergi} readOnly></input>
                </div>
            </div>
            <h2 className='text-riwayat-episode'>Entri Masuk :</h2>
            <div className='kolom-detail-eps'>
                <div className='tgl-detail'>
                    <span className='text-tgl-detail'>Tanggal :</span>
                    <input type='text' className='kolom-tgl-detail' name="tanggal" value={formatDateStrip(data.tanggal)} readOnly></input>
                </div>
                <div className='pemeriksa-detail'>
                    <span className='text-pemeriksa-detail'>Pemeriksa :</span>
                    <input type='text' className='kolom-pemeriksa-detail' name="pemeriksa" value={data.pemeriksa} readOnly></input>
                </div>
                <div className='poli-detail'>
                    <span className='text-poli-detail'>Poli :</span>
                    <input type='text' className='kolom-poli-detail' name="poli" value={data.poli} readOnly></input>
                </div>
                <div className='vital-detail'>
                    <span className='text-vital-detail'>Tanda Vital :</span>
                    <div className='isian-detail-eps'>
                        <div className='atas-vital-detail'>
                            <div className='td-detail'>
                                <span className='text-td-detail'>TD :</span>
                                <input
                                    type='text'
                                    className='kolom-td-detail'
                                    name="TD1"
                                    value={TD1}
                                    readOnly
                                />  / <input
                                    type='text'
                                    className='kolom-td-detail'
                                    name="TD2"
                                    value={TD2}
                                    readOnly
                                />
                            </div>
                            <div className='suhu-detail'>
                                <span className='text-suhu-detail'>Suhu :</span>
                                <input type='text' className='kolom-suhu-detail' name="suhu" value={datavs.suhu} readOnly></input>
                            </div>
                        </div>
                        <div className='bawah-vital-detail'>
                            <div className='indeks-detail'>
                                <span className='text-indeks-detail'>Indeks :</span>
                                <input type='text' className='kolom-indeks-detail' name="indeks" value={datavs.indeks} readOnly></input>
                            </div>
                            <div className='napas-detail'>
                                <span className='text-napas-detail'>Napas :</span>
                                <input type='text' className='kolom-napas-detail' name="napas" value={datavs.napas} readOnly></input>
                            </div>
                        </div>
                        <div className='detak-detail'>
                            <span className='text-detak-detail'>Detak :</span>
                            <input type='text' className='kolom-detak-detail' name="detak" value={datavs.detak} readOnly></input>
                        </div>
                    </div> 
                </div>
                    <div className='button-entri-masuk'>
                <button 
                    className="simpan-entri-masuk" 
                    onClick={handleCPPT}
                >
                    Isi CPPT
                </button>
                </div>
            </div>
            <RiwayatEpisode noEMR={data.noEMR}/>
        </div>
    );
};

export default EntriMasuk;
