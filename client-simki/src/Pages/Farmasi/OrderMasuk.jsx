import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchorderObat } from '../../redux/pharmacy/order/actions';
import { updateOrderStatus } from '../../redux/pharmacy/update/actions';
import '../../Style/Farmasi/OrderMasuk.css';
import SearchBar from '../../components/SearchBar';
import Modal from 'react-modal';
import { format, parseISO } from 'date-fns';

const OrderMasuk = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.orderObat);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [alert, setAlert] = React.useState({ status: false, message: '', type: '' });

    useEffect(() => {
        dispatch(fetchorderObat());
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(data);
        setNoResults(data.length === 0);
    }, [data]);

    useEffect(() => {
        if (error) {
            setAlert({
                status: true,
                message: `Error: ${error}`,
                type: 'danger'
            });
        }
    }, [error]);

    const formatDateTime = (dateTimeString) => {
        try {
            const date = parseISO(dateTimeString);
            const formattedDate = format(date, 'dd/MM/yyyy');
            const formattedTime = format(date, 'HH:mm:ss');
            return { formattedDate, formattedTime };
        } catch (error) {
            console.error(`Error parsing date: ${error}`);
            return { formattedDate: 'Invalid Date', formattedTime: 'Invalid Time' };
        }
    };

    const handleProsesClick = async (id) => {
        try {
            await dispatch(updateOrderStatus(id));
            dispatch(fetchorderObat()); 
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

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
        <div className="order-masuk-wrapper">
            <div className="navbar-header-masuk"></div>
            <div className="order-masuk-container">
                <div className="content-wrapper">
                    <div className="header-order-masuk">
                        <h1 className="text_order-masuk">Order Masuk</h1>
                        <SearchBar onSearch={handleSearch}/>
                    </div>
                    <div className="tabel-pendaftar-baru-wrapper">
                        <div className="tabel_pendaftar_baru">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No. Faktur</th>
                                        <th>Tanggal</th>
                                        <th>Jam</th>
                                        <th>No. EMR</th>
                                        <th>Nama Pasien</th>
                                        <th>Pemeriksa</th>
                                        <th>Poli</th>
                                        <th>Obat</th>
                                        <th>Kuantitas</th>
                                        <th>Dosis</th>
                                        <th>Catatan</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length === 0 ? 
                                        <tr>
                                            <td colSpan="12" className="empty-message">
                                                Belum ada order yang masuk
                                            </td>
                                        </tr>
                                    : filteredData.length === 0 ? (
                                        <tr>
                                            <td colSpan="12" className="empty-message">
                                                {noResults ? "Tidak ditemukan" : "Tidak ditemukan"}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredData.map((row, index) => {
                                            const { formattedDate, formattedTime } = formatDateTime(row.dateAndTime);
                                            return (
                                                <tr key={index}>
                                                    <td>{row.noInvoice}</td>
                                                    <td>{formattedDate}</td>
                                                    <td>{formattedTime}</td>
                                                    <td>{row.noEMR}</td>
                                                    <td>{row.namaPasien}</td>
                                                    <td>{row.namaDokter}</td>
                                                    <td>{row.poli}</td>
                                                    <td>{row.obat}</td>
                                                    <td>{row.kuantitas}</td>
                                                    <td>{row.dosis}</td>
                                                    <td>{row.catatan}</td>
                                                    <td>
                                                        <div
                                                            className={`proses-obat ${row.status === 'paid' ? 'proses' : 'diterima'}`}
                                                            onClick={() => handleProsesClick(row.id)}
                                                        >
                                                            {row.status === 'paid' ? 'proses' : 'diterima'}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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

export default OrderMasuk;
