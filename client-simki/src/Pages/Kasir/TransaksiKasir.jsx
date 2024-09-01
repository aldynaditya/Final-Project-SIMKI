import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import Invoice from '../../components/Receipt';
import '../../Style/Kasir/TransaksiKasir.css';
import SearchBar from '../../components/SearchBar';
import { fetchAllOrder } from "../../redux/kasir/indexOrder/actions";
import { formatDateSlash } from "../../utils/dateUtils";
import { formatCurrency } from '../../utils/convertfunction';
import PopUpDetailFaktur from './DetailFaktur';
import Modal from 'react-modal';

const TransaksiKasir = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getallOrder);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [isDetailFakturVisible, setIsDetailFakturVisible] = useState(false);
    const [selectedFakturId, setSelectedFakturId] = useState(null);
    const [alert, setAlert] = useState({ status: false, message: '', type: '' });
    const [printData, setPrintData] = useState(null);

    useEffect(() => {
        dispatch(fetchAllOrder());
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(data);
        setNoResults(data.length === 0);
    }, [data]);

    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        onAfterPrint: () => setPrintData(null),
    });

    const CetakTransaksi = (row) => {
        setPrintData(row);
    };

    useEffect(() => {
        if (printData) {
            handlePrint();
        }
    }, [printData, handlePrint]);

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

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const result = data.filter(row =>
                row.noInvoice.toLowerCase().includes(query) ||
                row.namaPasien.toLowerCase().includes(query)
            );
            setFilteredData(result);
            setNoResults(result.length === 0);
        } else {
            setFilteredData(data);
            setNoResults(false);
        }
    };

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
                        <SearchBar onSearch={handleSearch}/>
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
                                    {data.length === 0 ? 
                                        <tr>
                                            <td colSpan="12" className="empty-message">
                                                Tidak ada data transaksi
                                            </td>
                                        </tr>
                                    : filteredData.length === 0 ? (
                                        <tr>
                                            <td colSpan="12" className="empty-message">
                                                {noResults ? "Tidak ditemukan" : "Tidak ditemukan"}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredData.map((row) => (
                                            <tr key={row.id}>
                                                <td>{row.noInvoice}</td>
                                                <td>{formatDateSlash(row.tanggaldaftar)}</td>
                                                <td>{row.noEMR}</td>
                                                <td>{row.namaPasien}</td>
                                                <td>{row.penjamin}</td>
                                                <td>{row.metodeBayar}</td>
                                                <td>{formatCurrency(row.total)}</td>
                                                <td>{row.petugas}</td>
                                                <td>{row.status}</td>
                                                <td className="detail-faktur-cell">
                                                <button 
                                                    className="detail-faktur" 
                                                    onClick={() => handleDetailFakturOpen(row.id)}
                                                    disabled={row.status === "Completed"}
                                                >
                                                    Detail
                                                </button>
                                                    <button className="cetak-transaksi" onClick={() => CetakTransaksi(row)}>Cetak</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
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
        </div>
    );
};

export default TransaksiKasir;
