import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { createorderObat } from '../../redux/doctor/orderMedicine/actions';
import { searchObat } from '../../redux/doctor/searchMedicine/actions';
import '../../Style/Dokter/TambahObatDr.css';
import search from "../../images/search.png";

const TambahObatDr = ({ onClose, onComplete }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.createorderObat);
    const { data: searchResults, loading: searchLoading, error: searchError } = useSelector(state => state.searchObat);

    const [formData, setFormData] = useState({
        namaObat: '',
        kuantitas: '',
        dosis: '',
        catatan: '',
    });

    const [alert, setAlert] = useState({ status: false, message: '', type: '' });
    const [showResults, setShowResults] = useState(false);
    const [allObat, setAllObat] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setFormData({ ...formData, namaObat: query });

        if (query.trim()) {
            const filteredResults = allObat.filter(obat =>
                obat.nama_obat.toLowerCase().includes(query.toLowerCase())
            );
            setShowResults(true);
            dispatch(searchObat(query));
        } else {
            setShowResults(false);
        }
    };

    const handleSearchClick = () => {
        setShowResults(true);
        if (allObat.length === 0) {
            dispatch(searchObat(''));
        }
    };

    const handleSearchSelect = (selectedObat) => {
        const [namaObat] = selectedObat.split(' ');
        setFormData({ ...formData, namaObat });
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
                message: error,
                type: 'danger'
            });
        } 
        
        if (data && !loading) {
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
            const formattedResults = searchResults.map(obat => ({
                ...obat,
                formattedName: `${obat.nama_obat} ${obat.satuan}`
            }));
            setAllObat(formattedResults);
        }
    }, [searchResults]);

    const Simpandokter = () => {
        if (!isFormValid()) {
            setAlert({
                status: true,
                message: 'Isi seluruh form',
                type: 'danger'
            });
            return;
        }
        dispatch(createorderObat(id, formData));
    };

    return (
        <div className='tambahobatdr-container'>
            <div className='tambahobatdr-content'>
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-tambahobatdr'>Tambah Obat</h1>
                <div className='kolom-tambah-dokter'>
                    <div className='nama-obat-dokter'>
                        <span className='text-obat-dokter'>Nama obat :</span>
                        <div className="search-bar-obat-container">
                            <input 
                                type="text" 
                                placeholder="Pencarian" 
                                className="search-bar-obat-input" 
                                value={formData.namaObat}
                                onChange={handleSearchChange}
                                onClick={handleSearchClick}
                            />
                            <button className="search-bar-obat-button">
                                <img src={search} alt="Search" />
                            </button>
                            {searchLoading && <p>Loading...</p>}
                            {searchError && <p>{searchError}</p>}
                            {showResults && allObat.length > 0 && (
                                <ul className="search-results">
                                    {allObat
                                        .filter(obat =>
                                            obat.nama_obat.toLowerCase().includes(formData.namaObat.toLowerCase())
                                        )
                                        .map((result) => (
                                            <li 
                                                key={result.id} 
                                                onClick={() => handleSearchSelect(`${result.nama_obat} ${result.satuan}`)}
                                            >
                                                {result.nama_obat} {result.satuan}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className='kuantitas-dokter'>
                        <span className='text-kuantitas-dokter'>Kuantitas :</span>
                        <input type='text' className='kolom-kuantitas-dokter' name="kuantitas" value={formData.kuantitas} onChange={handleChange}/>
                    </div>
                    <div className='dosis-dokter'>
                        <span className='text-dosis-dokter'>Dosis :</span>
                        <input type='text' className='kolom-dosis-dokter' name="dosis" value={formData.dosis} onChange={handleChange}/>
                    </div>
                    <div className='catatan-dokter'>
                        <span className='text-catatan-dokter'>Catatan :</span>
                        <input type='text' className='kolom-catatan-dokter' name="catatan" value={formData.catatan} onChange={handleChange}/>
                    </div>                  
                </div>
                <div className='tambah-dokter-container'>
                    <button className="simpan-dokter" onClick={Simpandokter}>Tambah</button>
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

export default TambahObatDr;
