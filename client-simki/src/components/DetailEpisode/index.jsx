import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEpisodeById } from '../../redux/doctor/DetailEpisodeById/actions';
import { fetchResponseById } from '../../redux/doctor/indexResponse/actions';
import { fetchOrderSurat } from '../../redux/doctor/indexLetter/actions';
import CetakSuratPopup from '../../Pages/Resepsionis/CetakSuratPopup';
import HasilKuisionerPopup from '../../Pages/Dokter/KuisionerPopUp'; 
import { formatDateStrip } from '../../utils/dateUtils';
import '../../Style/Resepsionis/EmrResepsionis.css';
import '../../Style/components/DetailEpisode.css';

const DetailEpisode = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { role } = useSelector((state) => state.auth);
    const { data, loading, error } = useSelector(state => state.getoneEpisode);
    const { data: Rdata, loading: Rloading, error: Rerror } = useSelector(state => state.getResponse);
    const { data: orderData, loading: orderloading, error: orderError } = useSelector((state) => state.getorderSurat);
    const [showCetakSuratPopup, setShowCetakSuratPopup] = useState(false);
    const [showHasilKuisionerPopup, setShowHasilKuisionerPopup] = useState(false);
    const [TD1, setTD1] = useState('');
    const [TD2, setTD2] = useState('');

    useEffect(() => {
        dispatch(fetchEpisodeById(id));
        dispatch(fetchOrderSurat(data.id));
        dispatch(fetchResponseById(id));
    }, [dispatch, id, data.id]);

    useEffect(() => {
        if (data) {
            const [systolic, diastolic] = (data.td|| '').split('/');
    
            setTD1(systolic || '');
            setTD2(diastolic || '');
        }
    }, [data]);

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

    const handleCetakSuratComplete = () => {
        setShowHasilKuisionerPopup(false);
    };

    const handleHasilKuisionerComplete = () => {
        setShowHasilKuisionerPopup(false);
    };

    return (
        <div className='emr-resepsionis-container'>
            <h1 className='text-emr-resepsionis'>EMR Pasien</h1>
            <div className='kolom-emr-resepsionis'>
                <div className='no-emr-rsp'>
                    <span className='text-nemr-rsp'>No. EMR :</span>
                    <input type='text' className='kolom-nemr-rsp' name="noEMR" value={data.noEMR} readOnly/>
                </div>
                <div className='nama-pasien-rsp'>
                    <span className='text-npasien-rsp'>Nama Pasien :</span>
                    <input type='text' className='kolom-npasien-rsp'  name="nama_pasien" value={data.nama_pasien}/>
                </div>
                <div className='tgl-lahir-rsp'>
                    <span className='text-ttl-rsp'>Tanggal Lahir :</span>
                    <input type='text' className='kolom-ttl-rsp' name="tanggal_lahir" value={formatDateStrip(data.tanggal_lahir)}/>
                </div>
                <div className='gender-goldar-rsp'>
                    <div className='gender-emr-rsp'>
                        <span className='text-gender-rsp'>Jenis Kelamin :</span>
                        <input type='text' className='kolom-gender-rsp' name="jenis_kelamin" value={data.jenis_kelamin}/>
                    </div>
                    <div className='goldar-emr-rsp'>
                        <span className='text-goldar-rsp'>Golongan Darah :</span>
                        <input type='text' className='kolom-goldar-rsp' name="gol_darah" value={data.gol_darah}/>
                    </div>
                </div>
                <div className='alergi-rsp'>
                    <span className='text-alergi-rsp'>Alergi :</span>
                    <input type='text' className='kolom-alergi-rsp' name="alergi" value={data.alergi}/>
                </div>
            </div>
            <h2 className='text-riwayat-episode'>Detail Episode :</h2>
            <div className='kolom-detail-eps'>
                <div className='tgl-detail'>
                    <span className='text-tgl-detail'>Tanggal :</span>
                    <input type='text' className='kolom-tgl-detail' name="tanggal" value={formatDateStrip(data.tanggal)}/>
                </div>
                <div className='penjamin-detail'>
                    <span className='text-penjamin-detail'>Penjamin :</span>
                    <input type='text' className='kolom-penjamin-detail' name="penjamin" value={data.penjamin}/>
                </div>
                <div className='pemeriksa-detail'>
                    <span className='text-pemeriksa-detail'>Pemeriksa :</span>
                    <input type='text' className='kolom-pemeriksa-detail' name="pemeriksa" value={data.pemeriksa}/>
                </div>
                <div className='poli-detail'>
                    <span className='text-poli-detail'>Poli :</span>
                    <input type='text' className='kolom-poli-detail' name="poli" value={data.poli}/>
                </div>
                <div className='penyakit-detail'>
                    <span className='text-penyakit-detail'>Riwayat Penyakit :</span>
                    <input type='text' className='kolom-penyakit-detail' name="riwayat_penyakit" value={data.riwayat_penyakit}/>
                </div>
                <div className='subjektif-detail'>
                    <span className='text-subjektif-detail'>Subjektif :</span>
                    <input type='text' className='kolom-subjektif-detail' name="subjective" value={data.subjective}/>
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
                                <input type='text' className='kolom-suhu-detail' name="suhu" value={data.suhu} readOnly></input>
                            </div>
                        </div>
                        <div className='bawah-vital-detail'>
                            <div className='indeks-detail'>
                                <span className='text-indeks-detail'>Indeks :</span>
                                <input type='text' className='kolom-indeks-detail' name="indeks" value={data.indeks} readOnly></input>
                            </div>
                            <div className='napas-detail'>
                                <span className='text-napas-detail'>Napas :</span>
                                <input type='text' className='kolom-napas-detail' name="napas" value={data.napas} readOnly></input>
                            </div>
                        </div>
                        <div className='detak-detail'>
                            <span className='text-detak-detail'>Detak :</span>
                            <input type='text' className='kolom-detak-detail' name="detak" value={data.detak} readOnly></input>
                        </div>
                    </div>
                </div>
                <div className='objektif-detail'>
                    <span className='text-objektif-detail'>Objektif :</span>
                    <input type='text' className='kolom-objektif-detail' name="objective" value={data.objective}/>
                </div>
                <div className='assestment-detail'>
                    <span className='text-assestment-detail'>Assestment :</span>
                    <input type='text' className='kolom-assestment-detail' name="assessment" value={data.assessment}/>
                </div>
                <div className='plan-detail'>
                    <span className='text-plan-detail'>Plan :</span>
                    <input type='text' className='kolom-plan-detail' name="plan" value={data.plan}/>
                </div>
                <div className='tindakan-detail'>
                    <span className='text-tindakan-detail'>Tindakan :</span>
                    <input type='text' className='kolom-tindakan-detail' name="tindakan" value={data.tindakan}/>
                </div>
            </div>
            <div className='button-detail'>
                {role === 'resepsionis' && (
                    <button
                    className="cetak-surat"
                    onClick={CetakSurat}
                    disabled={!orderData || orderData.length === 0}
                    title={!orderData || orderData.length === 0 ? "Tidak terdapat data surat" : ""}
                >
                    Cetak Surat
                </button>
                )}
                {role === 'dokter' && (
                    <button
                    className="hasil-kuisioner"
                    onClick={HasilKuisioner}
                    disabled={!Rdata || Rdata.length === 0}
                    title={!Rdata || Rdata.length === 0 ? "Response belum ada" : ""}
                >
                    Hasil Kuisioner
                </button>
                )}
            </div>
            {showCetakSuratPopup &&
                <CetakSuratPopup
                id={data.id} 
                onClose={closeCetakSuratPopup}
                onComplete={handleCetakSuratComplete} 
                />
            }
            {showHasilKuisionerPopup &&
                <HasilKuisionerPopup
                id={id} 
                onClose={closeHasilKuisionerPopup} 
                onComplete={handleHasilKuisionerComplete} 
                />
            }
        </div>
    );
};

export default DetailEpisode;
