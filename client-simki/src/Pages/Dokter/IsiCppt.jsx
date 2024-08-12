import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { createCPPTEntry } from '../../redux/doctor/cpptEntry/actions';
import { fetchVitalsign } from '../../redux/doctor/vitalSign/actions';
import { updateActionEntry } from '../../redux/doctor/action/actions';
import { createOrder } from '../../redux/doctor/finishOrder/actions';
import '../../Style/Dokter/IsiCppt.css';

const IsiCppt = ({ onClose }) => {
    const dispatch = useDispatch();
    const { cppt, loading, error } = useSelector(state => state.createCpptEntry);
    const { data: act, loading: erroract } = useSelector(state => state.updateAction);
    const { data: datavs, loading: loadingvs, error: errorvs } = useSelector(state => state.getVital);
    const { error: errorOrder, data: dataOrder } = useSelector(state => state.createOrder);

    const [formData, setFormData] = useState({
        riwayatPenyakit: '',
        subjective: '',
        objective: '',
        assessment: '',
        plan: '',
        tindakan: [],
    });

    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    useEffect(() => {
        dispatch(fetchVitalsign(datavs.id));
    }, [dispatch, datavs.id]);

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
        if (error) {
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
        } else if (cppt) {
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
            dispatch(fetchVitalsign(datavs.id));
        }
    }, [error, cppt, errorOrder, dataOrder, dispatch, datavs.id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const SimpanCppt = () => {
        dispatch(createCPPTEntry(datavs.id, formData));
        setAlert({ status: false, message: '', type: '' });
    };

    const SelesaikanOrder = () => {
        dispatch(createOrder(datavs.id));
        setAlert({ status: false, message: '', type: '' }); 
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
    

    return (
        <div className='isicppt-popup-container'>
            <div className='isicppt-popup-content'>
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-isicppt-popup'>Isi CPPT</h1>
                <div className='kolom-isi-cppt'>
                    <div className='penyakit-cppt'>
                        <span className='text-penyakit-cppt'>Riwayat Penyakit :</span>
                        <input type='text' className='kolom-penyakit-cppt' name="riwayat_penyakit" value={formData.riwayat_penyakit} onChange={handleChange}></input>
                    </div>
                    <div className='subjektif-cppt'>
                        <span className='text-subjektif-cppt'>Subjektif:</span>
                        <input type='text' className='kolom-subjektif-cppt' name="subjective" value={formData.subjective} onChange={handleChange}></input>
                    </div>
                    <div className='objektif-cppt'>
                        <span className='text-objektif-cppt'>Objektif :</span>
                        <input type='text' className='kolom-objektif-cppt' name="objective" value={formData.objective} onChange={handleChange}></input>
                    </div>
                    <div className='diagnosis-cppt'>
                        <span className='text-diagnosis-cppt'>Diagnosis :</span>
                        <input type='text' className='kolom-diagnosis-cppt' name="assessment" value={formData.assessment} onChange={handleChange}></input>
                    </div>
                    <div className='plan-cppt'>
                        <span className='text-plan-cppt'>Plan :</span>
                        <input type='text' className='kolom-plan-cppt' name="plan" value={formData.plan} onChange={handleChange}></input>
                    </div>
                    <div className='tindakan-cppt'>
                        <span className='text-tindakan-cppt'>Tindakan :</span>
                        <select onChange={DropdownOrder} className='dropdown-entri-baru'>
                            <option value="">Order</option>
                            <option value="obat">Obat</option>
                            <option value="prosedur">Prosedur Medis</option>
                            <option value="surat">Buat Surat</option>
                        </select>
                    </div>
                </div>
                <div className='simpan-cppt-container'>
                    <button className="simpan-cppt" onClick={SimpanCppt}>Simpan</button>
                    <button className="selesaikan-order" onClick={SelesaikanOrder}>Selesaikan Order</button>
                </div>
            </div>
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

export default IsiCppt;
