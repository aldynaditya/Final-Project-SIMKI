import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { createorderProsedur } from '../../redux/doctor/orderProcedure/actions';
import { searchProsedur } from '../../redux/doctor/searchProcedure/actions';
import '../../Style/Dokter/TambahProsedur.css';
import search from "../../images/search.png";

const TambahProsedur = ({ onClose, onComplete }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.createorderProsedur);
    const { data: searchResults, loading: searchLoading, error: searchError } = useSelector(state => state.searchProsedur);

    const [formData, setFormData] = useState({
        namaItem: '',
        kuantitas: '',
        dosis: '',
        catatan: ''
    });

    const [alert, setAlert] = useState({ status: false, message: '', type: '' });
    const [showResults, setShowResults] = useState(false);
    const [allItem, setAllItem] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setFormData({ ...formData, namaItem: query });
    };

    const handleSearchClick = () => {
        setShowResults(true);
        if (allItem.length === 0) {
            dispatch(searchProsedur(''));
        }
    };

    const handleSearchSelect = (selectedItem) => {
        const [namaItem] = selectedItem.split(' '); 
        setFormData({ ...formData, namaItem });
        setShowResults(false); 
    };

    const isFormValid = useCallback(() => {
        return Object.values(formData).every(value => value.trim() !== '');
    }, [formData]);

    useEffect(() => {
        if (alert.status) {
            const timer = setTimeout(() => {
                setAlert({ status: false, message: '', type: '' });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alert.status]);

    useEffect(() => {
        if (error) {
            setAlert({
                status: true,
                message: 'Isi seluruh Form Entry',
                type: 'danger'
            });
        } else if (data && !loading) {
            setAlert({
                status: true,
                message: 'Data berhasil disimpan!',
                type: 'success'
            });
            setTimeout(() => {
                onComplete();
                onClose();
            }, 2000);
        }
    }, [error, data, loading, onClose, onComplete]);

    useEffect(() => {
        if (searchResults.length > 0) {
            const formattedResults = searchResults.map(item => ({
                ...item,
                formattedName: `${item.nama_item} (${item.stok_item})`
            }));
            setAllItem(formattedResults);
        }
    }, [searchResults]);


    const SimpanProsedur = () => {
        if (!isFormValid()) {
            setAlert({
                status: true,
                message: 'Isi seluruh form',
                type: 'danger'
            });
            return;
        }
        dispatch(createorderProsedur(id, formData));
    };

    return (
        <div className='tambahprosedur-container'>
            <div className='tambahprosedur-content'>
                <button className='cancel-x' onClick={onClose}>
                    X
                </button>
                <h1 className='text-tambahprosedur'>Tambah Item</h1>
                <div className='kolom-tambah-prosedur'>
                    <div className='nama-prosedur-prosedur'>
                        <span className='text-prosedur-prosedur'>Nama Item :</span>
                        <div className="search-bar-prosedur-container">
                            <input 
                                type="text" 
                                placeholder="Pencarian" 
                                className="search-bar-prosedur-input"
                                value={formData.namaItem}
                                onChange={handleSearchChange}
                                onClick={handleSearchClick} 
                            />
                            <button className="search-bar-prosedur-button">
                                <img src={search} alt="Search" />
                            </button>
                            {searchLoading && <p>Loading...</p>}
                            {searchError && <p>{searchError}</p>}
                            {showResults && allItem.length > 0 && (
                                <ul className="search-results-prosedur">
                                    {allItem
                                        .filter(item =>
                                            item.nama_item.toLowerCase().includes(formData.namaItem.toLowerCase())
                                        )
                                        .map((result) => (
                                            <li 
                                                key={result.id} 
                                                onClick={() => handleSearchSelect((result.formattedName))}
                                            >
                                                {result.formattedName}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className='kuantitas-prosedur'>
                        <span className='text-kuantitas-prosedur'>Kuantitas :</span>
                        <input type='text' className='kolom-kuantitas-prosedur' name="kuantitas" value={formData.kuantitas} onChange={handleChange}/>
                    </div>
                    <div className='dosis-prosedur'>
                        <span className='text-dosis-prosedur'>Dosis :</span>
                        <input type='text' className='kolom-dosis-prosedur' name="dosis" value={formData.dosis} onChange={handleChange}/>
                    </div>
                    <div className='catatan-prosedur'>
                        <span className='text-catatan-prosedur'>Catatan :</span>
                        <input type='text' className='kolom-catatan-prosedur' name="catatan" value={formData.catatan} onChange={handleChange}/>
                    </div>                  
                </div>
                <div className='tambah-prosedur-container'>
                    <button className="simpan-order-prosedur" onClick={SimpanProsedur}>Tambah</button>
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

export default TambahProsedur;
