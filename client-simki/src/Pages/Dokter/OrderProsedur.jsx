import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchorderInfo } from '../../redux/doctor/orderInfo/actions';
import { fetchOrderProsedur } from '../../redux/doctor/indexProcedure/actions';
import { deleteorderProsedur } from '../../redux/doctor/indexDeleteProcedure/actions';
import { formatDateStrip, formatTime } from '../../utils/dateUtils';
import { formatCurrency } from '../../utils/convertfunction';
import TambahProsedur from './TambahProsedur';
import Modal from 'react-modal';
import '../../Style/Dokter/OrderProsedur.css';

const OrderProsedur = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getorderInfo);
    const { data: orderData, loading: orderloading, error: orderError } = useSelector((state) => state.getorderProsedur);
    const { loading: deleteLoading, error: deleteError } = useSelector((state) => state.deleteorderProsedur);
    
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    useEffect(() => {
        dispatch(fetchorderInfo(id));
        dispatch(fetchOrderProsedur(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (!deleteLoading && !deleteError ) {
            dispatch(fetchorderInfo(id));
            dispatch(fetchOrderProsedur(id));
        }
    }, [deleteLoading, deleteError, id, dispatch]);

    const handlePopUpTambahProsedur = () => {
        setIsPopupVisible(true);
    };

    const handleCloseTambahProsedur = () => {
        setIsPopupVisible(false);
        dispatch(fetchOrderProsedur(id));
    };

    const handleTambahProsedurComplete = () => {
        setIsPopupVisible(false);
        dispatch(fetchOrderProsedur(id));
    };

    const hapusOrderProsedur = async (id) => {
        try {
            await dispatch(deleteorderProsedur(id));
            if (deleteError) {
                setAlert({
                    status: true,
                    message: 'order gagal dihapus!',
                    type: 'danger'
                });
            } else {
                setAlert({
                    status: true,
                    message: 'Order berhasil dihapus!',
                    type: 'success'
                });
            }
        } catch (error) {
            setAlert({
                status: true,
                message: 'Failed to delete',
                type: 'danger',
            });
        }
    };

    if (loading || deleteLoading ) {
        return <div>Loading...</div>;
    }

    const closeModal = () => {
        setAlert({ status: false, message: '', type: '' });
    };

    return (
        <div className='order-obat-container'>
            <h1 className='text-order-obat'>Order Prosedur</h1>
            <div className='kolom-order-obat'>
                <div className='baris-satu'>
                    <div className='nemr-order-obat'>
                        <span className='text-nemr-obat'>No. EMR :</span>
                        <input type='text' className='kolom-nemr-obat' name="noEMR" value={data.noEMR} readOnly/>
                    </div>
                    <div className='nama-order-obat'>
                        <span className='text-nama-pasien'>Nama Pasien :</span>
                        <input type='text' className='kolom-nama-obat' name="namaPasien" value={data.namaPasien} readOnly/>
                    </div>
                </div>
                <div className='baris-dua'>
                    <div className='tanggal-order-obat'>
                        <span className='text-tanggal-obat'>Tanggal :</span>
                        <input type="text" className='kolom-tanggal-obat' name="tanggal" value={formatDateStrip(data.tanggal)} readOnly/>
                    </div>
                    <div className='nfaktur-order-obat'>
                        <span className='text-nfaktur-obat'>Nomor Faktur :</span>
                        <input type='text' className='kolom-nfaktur-obat' name="nomorFaktur" value={data.nomorFaktur} readOnly/>
                    </div>
                </div>
                <div className='baris-tiga'>
                    <div className='jam-order-obat'>
                        <span className='text-jam-obat'>Jam :</span>
                        <input type="time" className='kolom-jam-obat' name="jam" value={formatTime(data.jam)} readOnly/>
                    </div>
                    <div className='poli-order-obat'>
                        <span className='text-poli-obat'>Poli :</span>
                        <input type='text' className='kolom-poli-obat' name="poli" value={data.poli} readOnly/>
                    </div>
                </div>
                <div className='pemeriksa-order-obat'>
                    <span className='text-pemeriksa-obat'>Pemeriksa :</span>
                    <input type='text' className='kolom-pemeriksa-obat' name="pemeriksa" value={data.pemeriksa} readOnly/>
                </div>
            </div>
            <div className='input-order-obat'>
                <button 
                    className='tambah-prosedur' 
                    onClick={handlePopUpTambahProsedur}
                    >
                        Tambah Item
                </button>
            </div>
            {isPopupVisible &&
                <TambahProsedur
                    id={id}
                    onClose={handleCloseTambahProsedur} 
                    onComplete={handleTambahProsedurComplete} 
                />
            }
            <div className="tabel-order-obat">
                <table>
                    <thead>
                        <tr>
                            <th>Nama Item</th>
                            <th>Kode Item</th>
                            <th>Satuan</th>
                            <th>@Harga</th>
                            <th>Kuantitas</th>
                            <th>Stok</th>
                            <th>Dosis</th>
                            <th>Catatan</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.length === 0 ? 
                            <tr>
                                <td colSpan="10" className="empty-message">
                                    Silakan melakukan order
                                </td>
                            </tr> : (
                            orderData.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.nama_item}</td>
                                    <td>{order.kode_item}</td>
                                    <td>{order.satuan_item}</td>
                                    <td>{formatCurrency(order.harga_item)}</td>
                                    <td>{order.kuantitas}</td>
                                    <td>{order.stok_item}</td>
                                    <td>{order.dosis}</td>
                                    <td>{order.catatan}</td>
                                    <td>{formatCurrency(order.total)}</td>
                                    <td>
                                        <div className="hapus-order-prosedur" onClick={() => hapusOrderProsedur(order.id)}>Hapus</div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={alert.status}
                onRequestClose={closeModal}
                contentLabel="Alert Message"
                className="Modal"
                overlayClassName="Overlay"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
            >
                <div className="modal-content">
                    <p>{alert.message}</p>
                    <button onClick={closeModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default OrderProsedur;
