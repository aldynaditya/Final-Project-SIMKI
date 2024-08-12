import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchdetailEmr } from '../../redux/doctor/detailEmr/actions';
import { fetchVitalsign } from '../../redux/doctor/vitalSign/actions';
import { createNewEntry } from '../../redux/doctor/newEntry/actions';
import { updateActionEntry } from '../../redux/doctor/action/actions';
import { createOrder } from '../../redux/doctor/finishOrder/actions';
import Modal from 'react-modal';
import RiwayatEpisode from '../../components/RiwayatEps';
import '../../Style/Dokter/EntriBaru.css';

const EntriBaru = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getdetailEmr);
    const { data: datavs, loading: loadingvs, error: errorvs } = useSelector(state => state.getVital);
    const { error: errorForm, entry } = useSelector(state => state.createNewEntry);
    const { data: act, loading: erroract } = useSelector(state => state.updateAction);
    const { error: errorOrder, data: dataOrder } = useSelector(state => state.createOrder);
    
    const [formData, setFormData] = useState({
        alergi: '',
        riwayat_penyakit: '',
        subjective: '',
        TD: '', 
        indeks: '',
        detak: '',
        suhu: '',
        napas: '',
        objective: '',
        assessment: '',
        plan: '',
        tindakan: [],
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
                riwayat_penyakit: datavs.riwayat_penyakit || '',
                subjective: datavs.subjective || '',
                TD: datavs.td || '',
                indeks: datavs.indeks || '',
                detak: datavs.detak || '',
                suhu: datavs.suhu || '',
                napas: datavs.napas || '',
                objective: datavs.objective || '',
                assessment: datavs.assessment || '',
                plan: datavs.plan || '',
                tindakan: datavs.tindakan || [],
            });
        }
    }, [datavs]);

    useEffect(() => {
        if (errorForm) {
            setAlert({
                status: true,
                message: 'Isi seluruh Form Entry',
                type: 'danger'
            });
        } else if (errorOrder) {
            setAlert({
                status: true,
                message: 'Isi seluruh Form Entry',
                type: 'danger'
            });
        } else if (entry) {
            setAlert({
                status: true,
                message: 'Data berhasil disimpan!',
                type: 'success'
            });
        } else if (dataOrder) {
            setAlert({
                status: true,
                message: 'Order Berhasil Dibuat',
                type: 'success'
            });
            // dispatch(fetchdetailEmr(id));
            dispatch(fetchVitalsign(id));
        }
    }, [errorForm, entry, errorOrder, dataOrder, dispatch, id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const SimpanEntriBaru = () => {
        dispatch(createNewEntry(id, formData));
        setAlert({ status: false, message: '', type: '' });
    };

    const SelesaikanOrder = () => {
        dispatch(createOrder(datavs.id));
        setAlert({ status: false, message: '', type: '' }); 
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const DropdownOrder = async (event) => {
        const selectedOption = event.target.value;

        if (!datavs.id) {
            setAlert({
                status: true,
                message: 'CPPT masih belum terisi',
                type: 'danger'
            });
            return;
        }
    
        if (selectedOption) {
            const updatedTindakan = formData.tindakan.filter(item => item !== 'none');
            updatedTindakan.push(selectedOption);
            await dispatch(updateActionEntry(datavs.id, { tindakan: updatedTindakan }));

            switch (selectedOption) {
                case 'obat':
                    window.open(`/dokter/order-obat/${datavs.id}`, '_blank');
                    break;
                case 'prosedur':
                    window.open(`/dokter/order-prosedur/${datavs.id}`, '_blank');
                    break;
                case 'surat':
                    window.open(`/dokter/order-surat/${datavs.id}`, '_blank');
                    break;
                default:
                    break;
            }
        }
    };
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
                    <input type='text' className='kolom-ttl-rsp' name="tanggal_lahir" value={formatDate(data.tanggal_lahir)} readOnly></input>
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
                    <input type='text' className='kolom-tgl-detail' name="tanggal" value={formatDate(data.tanggal)} readOnly></input>
                </div>
                <div className='pemeriksa-detail'>
                    <span className='text-pemeriksa-detail'>Pemeriksa :</span>
                    <input type='text' className='kolom-pemeriksa-detail' name="pemeriksa" value={data.pemeriksa} readOnly></input>
                </div>
                <div className='poli-detail'>
                    <span className='text-poli-detail'>Poli :</span>
                    <input type='text' className='kolom-poli-detail' name="poli" value={data.poli} readOnly></input>
                </div>
                <div className='penyakit-detail'>
                    <span className='text-penyakit-detail'>Riwayat Penyakit :</span>
                    <input type='text' className='kolom-penyakit-detail' name="riwayat_penyakit" value={formData.riwayat_penyakit} onChange={handleChange}></input>
                </div>
                <div className='subjektif-detail'>
                    <span className='text-subjektif-detail'>Subjektif :</span>
                    <input type='text' className='kolom-subjektif-detail' name="subjective" value={formData.subjective} onChange={handleChange}></input>
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
                <div className='objektif-detail'>
                    <span className='text-objektif-detail'>Objektif :</span>
                    <input type='text' className='kolom-objektif-detail' name="objective" value={formData.objective} onChange={handleChange}></input>
                </div>
                <div className='diagnosis-detail'>
                    <span className='text-diagnosis-detail'>Diagnosis :</span>
                    <input type='text' className='kolom-diagnosis-detail' name="assessment" value={formData.assessment} onChange={handleChange}></input>
                </div>
                <div className='plan-detail'>
                    <span className='text-plan-detail'>Plan :</span>
                    <input type='text' className='kolom-plan-detail' name="plan" value={formData.plan} onChange={handleChange}></input>
                </div>
                <div className='tindakan-entri-baru'>
                    <span className='text-tindakan-entri-baru'>Tindakan :</span>
                    <select onChange={DropdownOrder} className='dropdown-entri-baru'>
                            <option value="">Order</option>
                            <option value="obat">Obat</option>
                            <option value="prosedur">Prosedur Medis</option>
                            <option value="surat">Buat Surat</option>
                        </select>
                </div>
            </div>
            <div className='button-entri-baru'>
                <button className="simpan-entri-baru" onClick={SimpanEntriBaru}>Simpan</button>
                <button className="selesaikan-order-baru" onClick={SelesaikanOrder}>Selesaikan Order</button>
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

export default EntriBaru;
