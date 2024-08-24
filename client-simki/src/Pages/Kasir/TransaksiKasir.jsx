import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import Invoice from '../../components/Receipt';
import '../../Style/Kasir/TransaksiKasir.css';
import SearchBar from '../../components/SearchBar';
import { fetchAllOrder } from "../../redux/kasir/indexOrder/actions";
import { fetchDetailOrderbyId } from "../../redux/kasir/indexOrderDetail/actions";
import { formatDateSlash } from "../../utils/dateUtils";
import PopUpDetailFaktur from './DetailFaktur';
import Modal from 'react-modal';

const TransaksiKasir = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getallOrder);

    const [isDetailFakturVisible, setIsDetailFakturVisible] = useState(false);
    const [selectedFakturId, setSelectedFakturId] = useState(null);
    const [alert, setAlert] = useState({ status: false, message: '', type: '' });
    const [printData, setPrintData] = useState(null);

    useEffect(() => {
        dispatch(fetchAllOrder());
    }, [dispatch]);

    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    const CetakTransaksi = (row) => {
        setPrintData(row); // Pass the specific row data to be printed
    };

    useEffect(() => {
        if (printData) {
            handlePrint();
        }
    }, [handlePrint, printData]);

    const handleDetailFakturOpen = (id) => {
        setSelectedFakturId(id);
        setIsDetailFakturVisible(true);
    };

    const handleDetailFakturClose = () => {
        setIsDetailFakturVisible(false);
        setSelectedFakturId(null);
    };

    const handleSuccess = () => {
        dispatch(fetchAllOrder());
    };

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const closeModal = () => {
        setAlert({ status: false, message: '', type: '' });
    };

    return (
        <div className="transaksi-wrapper">
            <div className="navbar-header-transaksi"></div>
            <div className="transaksi-container">
                <div className="content-wrapper-transaksi">
                    <div className="header-transaksi">
                        <h1 className="text_transaksi">Transaksi</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel_transaksi_wrapper">
                        <div className="tabel_transaksi">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No. Faktur</th>
                                        <th>Tanggal</th>
                                        <th>No. EMR</th>
                                        <th>Nama Pasien</th>
                                        <th>Penjamin</th>
                                        <th>Metode Bayar</th>
                                        <th>Total</th>
                                        <th>Petugas</th>
                                        <th>Status</th>
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.noInvoice}</td>
                                            <td>{formatDateSlash(row.tanggaldaftar)}</td>
                                            <td>{row.noEMR}</td>
                                            <td>{row.namaPasien}</td>
                                            <td>{row.penjamin}</td>
                                            <td>{row.metodeBayar}</td>
                                            <td>{row.total}</td>
                                            <td>{row.petugas}</td>
                                            <td>{row.status}</td>
                                            <td className="detail-faktur-cell">
                                                <button className="detail-faktur" onClick={() => handleDetailFakturOpen(row.id)}>Detail</button>
                                                <button className="cetak-transaksi" onClick={() => CetakTransaksi(row)}>Cetak</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'none' }}>
                <Invoice ref={printRef} data={printData} />
            </div>
            {isDetailFakturVisible && 
                <PopUpDetailFaktur 
                    id={selectedFakturId} 
                    onClose={handleDetailFakturClose} 
                    onSuccess={handleSuccess}
                />
            }
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
            {/* Invoice component that will be printed */}
            {/* {printableOrder && <Invoice ref={invoiceRef} detailOrder={printableOrder} />} */}
        </div>
    );
};

export default TransaksiKasir;
