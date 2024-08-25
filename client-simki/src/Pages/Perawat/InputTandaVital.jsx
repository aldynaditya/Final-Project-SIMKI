import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchdetailEmr } from '../../redux/doctor/detailEmr/actions';
import { createVital } from '../../redux/nurse/vital/actions';
import { fetchVitalsign } from '../../redux/doctor/vitalSign/actions';
import { formatDateStrip } from '../../utils/dateUtils';
import Modal from 'react-modal';
import RiwayatEpisode from '../../components/RiwayatEps';
import '../../Style/Perawat/EmrPerawat.css';

const EmrPerawat = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getdetailEmr);
    const { error: errorForm, vital } = useSelector(state => state.createVital);
    const { data: datavs, loading: loadingvs, error: errorvs } = useSelector(state => state.getVital);
    
    const [formData, setFormData] = useState({
        alergi: '',
        TD: '',
        indeks: '',
        detak: '',
        suhu: '',
        napas: '',
    });
    
    const [alert, setAlert] = useState({ status: false, message: '', type: '' });
    
    useEffect(() => {
        dispatch(fetchdetailEmr(id));
        dispatch(fetchVitalsign(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (datavs) {
            setFormData({
                alergi: datavs.alergi || '',
                TD: datavs.td || '',
                indeks: datavs.indeks || '',
                detak: datavs.detak || '',
                suhu: datavs.suhu || '',
                napas: datavs.napas || '',
            });
        }
    }, [datavs]);

    useEffect(() => {
        if (errorForm) {
            setAlert({
                status: true,
                message: 'Isi seluruh Form Tanda Vital',
                type: 'danger'
            });
        } else if (vital) {
            setAlert({
                status: true,
                message: 'Data berhasil disimpan!',
                type: 'success'
            });
        }
    }, [errorForm, vital]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSimpan = () => {
        dispatch(createVital(id, formData));
        setAlert({ status: false, message: '', type: '' });
    };

    return (
        <div className='emr-resepsionis-container'>
            <h1 className='text-emr-resepsionis'>EMR Pasien</h1>
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
                    <input type='text' className='kolom-alergi-rsp' name="alergi" value={formData.alergi} onChange={handleChange}></input>
                </div>
            </div>
            <h2 className='text-riwayat-episode'>Entri Baru :</h2>
            <div className='kolom-detail-eps'>
                <div className='tgl-detail'>
                    <span className='text-tgl-detail'>Tanggal :</span>
                    <input type='text' className='kolom-tgl-detail' name="tanggal" value={formatDateStrip(data.tanggal)} readOnly></input>
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
                                <input type='text' className='kolom-td-detail' name="TD" value={formData.TD} onChange={handleChange}></input>
                            </div>
                            <div className='suhu-detail'>
                                <span className='text-suhu-detail'>Suhu :</span>
                                <input type='text' className='kolom-suhu-detail' name="suhu" value={formData.suhu} onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='bawah-vital-detail'>
                            <div className='indeks-detail'>
                                <span className='text-indeks-detail'>Indeks :</span>
                                <input type='text' className='kolom-indeks-detail' name="indeks" value={formData.indeks} onChange={handleChange}></input>
                            </div>
                            <div className='napas-detail'>
                                <span className='text-napas-detail'>Napas :</span>
                                <input type='text' className='kolom-napas-detail' name="napas" value={formData.napas} onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='detak-detail'>
                            <span className='text-detak-detail'>Detak :</span>
                            <input type='text' className='kolom-detak-detail' name="detak" value={formData.detak} onChange={handleChange}></input>
                        </div>
                    </div> 
                </div>
            </div>
            <div className='button-emr-perawat'>
                <button type="submit" className="simpan-emr-perawat" onClick={handleSimpan}>Simpan</button>
            </div>
            <RiwayatEpisode />

            <Modal
                isOpen={alert.status}
                onRequestClose={() => setAlert({ status: false, message: '', type: '' })}
                contentLabel="Alert Message"
                className="Modal"
                overlayClassName="Overlay"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
            >
                <div className="modal-content">
                    <p>{alert.message}</p>
                    <button onClick={() => setAlert({ status: false, message: '', type: '' })}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default EmrPerawat;
