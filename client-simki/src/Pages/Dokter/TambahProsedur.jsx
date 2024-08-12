import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { createorderProsedur } from '../../redux/doctor/orderProcedure/actions';
import '../../Style/Dokter/TambahProsedur.css';
import search from "../../images/search.png";

const TambahProsedur = ({ onClose }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.createorderProsedur);

    const [formData, setFormData] = useState({
        riwayatPenyakit: '',
        subjective: '',
        objective: '',
        assessment: '',
        plan: '',
        tindakan: [],
    });

    const [alert, setAlert] = useState({ status: false, message: '', type: '' });

    useEffect(() => {
        if (error) {
            setAlert({
                status: true,
                message: 'Isi seluruh Form Entry',
                type: 'danger'
            });
        } else if (data) {
            setAlert({
                status: true,
                message: 'Data berhasil disimpan!',
                type: 'success'
            });
        }
    }, [error, data]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const SimpanProsedur = () => {
        dispatch(createorderProsedur(id, formData));
        setAlert({ status: false, message: '', type: '' });
    };

    const handleSearch = () => {
        const query = document.querySelector('.search-bar-input').value.toLowerCase();
        console.log("Mencari: ", query);
        
        const rows = document.querySelectorAll('table tbody tr');
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            let rowContainsQuery = false;
            
            cells.forEach(cell => {
                if (cell.textContent.toLowerCase().includes(query)) {
                    rowContainsQuery = true;
                }
            });
            
            if (rowContainsQuery) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    };

    return (
        <div className='tambahprosedur-container'>
            <div className='tambahprosedur-content'>
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-tambahprosedur'>Tambah Prosedur</h1>
                <div className='kolom-tambah-prosedur'>
                    <div className='nama-prosedur-prosedur'>
                        <span className='text-prosedur-prosedur'>Nama Prosedur :</span>
                        <div className="search-bar-prosedur-container">
                            <input 
                                type="text" 
                                placeholder="Pencarian" 
                                className="search-bar-prosedur-input" 
                            />
                            <button className="search-bar-prosedur-button" onClick={handleSearch}>
                                <img src={search} alt="Search" />
                            </button>
                        </div>
                    </div>
                    <div className='kuantitas-prosedur'>
                        <span className='text-kuantitas-prosedur'>Kuantitas :</span>
                        <input type='text' className='kolom-kuantitas-prosedur'></input>
                    </div>
                    <div className='dosis-prosedur'>
                        <span className='text-dosis-prosedur'>Dosis :</span>
                        <input type='text' className='kolom-dosis-prosedur'></input>
                    </div>
                    <div className='catatan-prosedur'>
                        <span className='text-catatan-prosedur'>Catatan :</span>
                        <input type='text' className='kolom-catatan-prosedur'></input>
                    </div>                  
                </div>
                <div className='tambah-prosedur-container'>
                    <button className="simpan-prosedur" onClick={SimpanProsedur}>Tambah</button>
                </div>
            </div>
        </div>
    );
};

export default TambahProsedur;
