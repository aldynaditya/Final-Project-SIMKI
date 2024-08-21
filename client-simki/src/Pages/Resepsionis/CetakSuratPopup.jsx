import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchorderInfo } from '../../redux/doctor/orderInfo/actions';
import { fetchOrderSurat } from '../../redux/doctor/indexLetter/actions';
import { editPeriode } from '../../redux/resepsionis/editPeriodSickLetter/actions'
import Modal from 'react-modal';
import { useReactToPrint } from 'react-to-print';
import FormatSurat from '../../components/FormatSurat';
import { formatDateToInput } from '../../utils/dateUtils';
import '../../Style/Resepsionis/CetakSuratPopup.css';

const CetakSuratPopup = ({ id, onClose }) => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getorderInfo);
    const { data: orderData, loading: orderloading, error: orderError } = useSelector((state) => state.getorderSurat);
    const { data: periodData, loading: periodloading, error: periodError } = useSelector((state) => state.editPeriode);

    const [formData, setFormData] = useState({
        periode_start: '',
        periode_end: '',
    });

    const [alert, setAlert] = useState({ status: false, message: '', type: '' });
    const [printData, setPrintData] = useState(null);

    const isFormValid = useCallback(() => {
        return Object.values(formData).every(value => {
            return String(value).trim() !== '';
        });
    }, [formData]);

    useEffect(() => {
        dispatch(fetchorderInfo(id));
        dispatch(fetchOrderSurat(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (orderData) {
            const sakitData = orderData.find(item => item.jenis_surat === 'sakit')|| {};
    
            if (sakitData) {
                setFormData({
                    periode_start: formatDateToInput(sakitData.periode_start),
                    periode_end: formatDateToInput(sakitData.periode_end),
                });
            } 
        }
    }, [orderData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const sakitData = orderData.find(item => item.jenis_surat === 'sakit') || {};

    const handleSimpanPerubahan = () => {
        if (!isFormValid()) {
            setAlert({
                status: true,
                message: 'Isi seluruh form',
                type: 'danger'
            });
            return;
        } 
        dispatch(editPeriode(sakitData.suratSakitId, formData))
            .then(() => {
                setAlert({
                    status: true,
                    message: 'Data berhasil diperbarui!',
                    type: 'success'
                });
            })
            dispatch(fetchorderInfo(id))
            dispatch(fetchOrderSurat(id))
            .catch(() => {
                setAlert({
                    status: true,
                    message: 'Gagal memperbarui data!',
                    type: 'danger'
                });
            });
    };

    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    const CetakSurat = () => {
        if (data && orderData) {
            const filteredOrderData = orderData.find(item => item.jenis_surat === 'sakit');
    
            if (filteredOrderData) {
                const combinedData = {
                    orderInfo: data,
                    orderDetails: filteredOrderData,
                };
                setPrintData(combinedData);
            } else {
                setAlert({
                    status: true,
                    message: "Tidak ada data surat sakit yang tersedia.",
                    type: "error"
                });
            }
        } else {
            setAlert({
                status: true,
                message: "Data tidak tersedia untuk dicetak.",
                type: "error"
            });
        }
    };
    
    useEffect(() => {
        if (printData) {
            handlePrint();
        }
    }, [printData, handlePrint]);

    return (
        <div className='cetaksurat-popup-container'>
            <div className='cetaksurat-popup-content'>
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-cetaksurat-popup'>Perpanjang Surat Sakit</h1>
                <div className='kolom-cetak-surat'>
                    <div className='umur-cetaksurat'>
                        <span className='text-umur-cetaksurat'>Umur :</span>
                        <input 
                            type='text' 
                            className='kolom-umur-cetaksurat' 
                            name='umur'
                            value={sakitData.umur} 
                            readOnly
                        />
                    </div>
                    <div className='job-surat'>
                        <span className='text-job-surat'>Pekerjaan :</span>
                        <input 
                            type='text' 
                            className='kolom-job-surat'
                            name='pekerjaan' 
                            value={sakitData.pekerjaan} 
                            readOnly
                        />
                    </div>
                    <div className='diagnosis-surat'>
                        <span className='text-diagnosis-surat'>Diagnosis :</span>
                        <input 
                            type='text' 
                            className='kolom-diagnosis-surat' 
                            name='diagnosis' 
                            value={sakitData.diagnosis_suratsakit} 
                            readOnly
                        />
                    </div>
                    <div className='kadaluarsa-extendsurat'>
                        <div className='periode-surat'>
                            <span className='text-periode-extendsurat'>Periode :</span>
                            <input 
                                type='date' 
                                className='kolom-periode-extendsurat'
                                name="periode_start" 
                                value={formData.periode_start} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className='hingga-surat'>
                            <span className='text-hingga-surat'>Hingga :</span>
                            <input 
                                type='date' 
                                className='kolom-hingga-surat' 
                                name="periode_end"
                                value={formData.periode_end} 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='perubahan-surat-container'>
                    <button className="perubahan-surat" onClick={handleSimpanPerubahan}>Simpan Perubahan</button>
                    <button className="cetak-surat-popup" onClick={() => CetakSurat(orderData)}>Cetak</button>
                </div>
            </div>
            <div style={{ display: 'none' }}>
                <FormatSurat ref={printRef} data={printData} />
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

export default CetakSuratPopup;
