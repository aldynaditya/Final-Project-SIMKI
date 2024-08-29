import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItem } from '../../redux/nurse/index/actions';
import { deleteItem } from '../../redux/nurse/delete/actions';
import { formatCurrency } from '../../utils/convertfunction';
import '../../Style/Perawat/KelolaItem.css';
import SearchBar from "../../components/SearchBar";
import TambahItem from './TambahItem';
import EditItem from './EditItem';
import Modal from 'react-modal';

const KelolaItem = () => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.getItem);
    const { loading: deleteLoading, error: deleteError } = useSelector((state) => state.deleteItem);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    useEffect(() => {
        dispatch(fetchItem());
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(data);
        setNoResults(data.length === 0);
    }, [data]);

    useEffect(() => {
        if (!deleteLoading && !deleteError) {
            dispatch(fetchItem());
        }
    }, [deleteLoading, deleteError, dispatch]);

    const handleTambahItem = () => {
        setIsPopupVisible(true);
        setIsEditing(false);
        setSelectedItemId(null);
    };

    const handleUbahItem = (id) => {
        setIsPopupVisible(true);
        setIsEditing(true);
        setSelectedItemId(id);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setSelectedItemId(null);
    };

    const handleSuccess = () => {
        dispatch(fetchItem());
    };

    const hapusItem = async (id) => {
        try {
            await dispatch(deleteItem(id));
            if (deleteError) {
                setAlert({
                    status: true,
                    message: 'Data Item gagal dihapus!',
                    type: 'danger'
                });
            } else {
                setAlert({
                    status: true,
                    message: 'Data Item berhasil dihapus!',
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

    if (loading || deleteLoading) {
        return <div>Loading...</div>;
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const result = data.filter(item =>
                item.nama_item.toLowerCase().includes(query) ||
                item.kode_item.toLowerCase().includes(query)
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
        <div className="kelola-item-wrapper">
            <div className="navbar-kelola-item"></div>
            <div className={`kelola-item-container ${isPopupVisible ? 'overlay' : ''}`}>
                <div className="content-wrapper-kelola-item">
                    <div className="header-kelola-item">
                        <h1 className="text_kelola-item">Stok Item</h1>
                        <div className="header-kelola-item-action">
                            <button className="tombol_tambahitem" onClick={handleTambahItem}>Tambah Item</button>
                            <SearchBar onSearch={handleSearch}/>
                        </div>
                    </div>
                    <div className="tabel_kelola-item">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nama Item</th>
                                    <th>Kode Item</th>
                                    <th>Harga Satuan</th>
                                    <th>Satuan</th>
                                    <th>Stok</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-message">
                                            Belum ada item yang terdaftar
                                        </td>
                                    </tr> 
                                ) : filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-message">
                                            {noResults ? "Tidak ditemukan" : "Tidak ditemukan"}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.nama_item}</td>
                                            <td>{item.kode_item}</td>
                                            <td>{formatCurrency(item.harga_item)}</td>
                                            <td>{item.satuan_item}</td>
                                            <td>{item.stok_item}</td>
                                            <td>
                                                <button className="ubah-jadwal" onClick={() => handleUbahItem(item.id)}>Ubah</button>
                                                <button className="hapus-jadwal" onClick={() => hapusItem(item.id)}>Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isPopupVisible && (
                isEditing 
                    ? <EditItem onClose={handleClosePopup} itemId={selectedItemId} onSuccess={handleSuccess}/> 
                    : <TambahItem onClose={handleClosePopup} onSuccess={handleSuccess} />
            )}

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

export default KelolaItem;
