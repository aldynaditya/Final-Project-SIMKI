import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { createCPPTEntry } from '../../redux/doctor/cpptEntry/actions';
import '../../Style/Dokter/IsiCppt.css';

const IsiCppt = ({ episodeId, onClose}) => {
    const dispatch = useDispatch();
    const { cppt, loading, error } = useSelector(state => state.createCpptEntry);

    const [formData, setFormData] = useState({
        riwayatPenyakit: '',
        subjective: '',
        objective: '',
        assessment: '',
        plan: '',
    });

    const [alert, setAlert] = useState({ status: false, message: '', type: '' });
    
    useEffect(() => {
        if (error) {
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
        }
    }, [error, cppt]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const SimpanCppt = () => {
        dispatch(createCPPTEntry(episodeId, formData));
        setAlert({ status: false, message: '', type: '' });
    };

    const SelesaikanOrder = () => {
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
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-isicppt-popup'>Isi CPPT</h1>
                <div className='kolom-isi-cppt'>
                    {/* <div className='pemeriksa-cppt'>
                        <span className='text-pemeriksa-cppt'>Pemeriksa :</span>
                        <input type='text' className='kolom-pemeriksa-cppt'></input>
                    </div> */}
                    <div className='penyakit-cppt'>
                        <span className='text-penyakit-cppt'>Riwayat Penyakit :</span>
                        <input type='text' className='kolom-penyakit-cppt' name="riwayatPenyakit" value={formData.riwayatPenyakit} onChange={handleChange}></input>
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
                            <option value="order-obat">Obat</option>
                            <option value="order-prosedur">Prosedur Medis</option>
                            <option value="order-surat">Buat Surat</option>
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
