import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchObat } from '../../redux/pharmacy/index/actions';
import { deleteObat } from '../../redux/pharmacy/delete/actions';
import '../../Style/Perawat/KelolaItem.css';
import SearchBar from '../../components/SearchBar';
import TambahObat from './TambahObat';
import EditObat from './EditObat';
import Modal from 'react-modal';

const KelolaObat = () => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.getObat);
    const { loading: deleteLoading, error: deleteError } = useSelector((state) => state.deleteObat);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedObatId, setSelectedObatId] = useState(null);
    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    useEffect(() => {
        dispatch(fetchObat());
    }, [dispatch]);

    useEffect(() => {
        if (!deleteLoading && !deleteError) {
            dispatch(fetchObat());
        }
    }, [deleteLoading, deleteError, dispatch]);

    const handleTambahObat = () => {
        setIsPopupVisible(true);
        setIsEditing(false);
        setSelectedObatId(null); // Reset selected obat id
    };

    const handleUbahObat = (id) => {
        setIsPopupVisible(true);
        setIsEditing(true);
        setSelectedObatId(id);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setSelectedObatId(null);
    };

    const handleSuccess = () => {
        dispatch(fetchObat());
    };

    const hapusObat = async (id) => {
        try {
            await dispatch(deleteObat(id));
            if (deleteError) {
                setAlert({
                    status: true,
                    message: 'Data Obat gagal dihapus!',
                    type: 'danger'
                });
            } else {
                setAlert({
                    status: true,
                    message: 'Data Obat berhasil dihapus!',
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

    const closeModal = () => {
        setAlert({ status: false, message: '', type: '' });
    };

    return (
        <div className="kelola-item-wrapper">
            <div className="navbar-kelola-item"></div>
            <div className={`kelola-item-container ${isPopupVisible ? 'overlay' : ''}`}>
                <div className="content-wrapper-kelola-item">
                    <div className="header-kelola-item">
                        <h1 className="text_kelola-item">Stok Obat</h1>
                        <div className="header-kelola-item-action">
                            <button className="tombol_tambahitem" onClick={handleTambahObat}>Tambah Obat</button>
                            <SearchBar />
                        </div>
                    </div>
                    <div className="tabel_kelola-item">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nama Obat</th>
                                    <th>Kode Obat</th>
                                    <th>Harga Satuan</th>
                                    <th>Satuan</th>
                                    <th>Stok</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((obat) => (
                                    <tr key={obat.id}>
                                        <td>{obat.nama_obat}</td>
                                        <td>{obat.kode_obat}</td>
                                        <td>{obat.harga_obat}</td>
                                        <td>{obat.jenis_obat}</td>
                                        <td>{obat.stok_obat}</td>
                                        <td>
                                            <button className="ubah-jadwal" onClick={() => handleUbahObat(obat.id)}>Ubah</button>
                                            <div className="hapus-jadwal" onClick={() => hapusObat(obat.id)}>Hapus</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isPopupVisible && (
                isEditing 
                    ? <EditObat onClose={handleClosePopup} obatId={selectedObatId} onSuccess={handleSuccess}/> 
                    : <TambahObat onClose={handleClosePopup} onSuccess={handleSuccess} />
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

export default KelolaObat;
