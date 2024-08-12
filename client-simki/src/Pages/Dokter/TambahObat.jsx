import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { createorderObat } from '../../redux/doctor/orderMedicine/actions';
import '../../Style/Dokter/TambahObatDr.css';
import search from "../../images/search.png";

const TambahObatDr = ({ onClose }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.createorderObat);
    
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

    const Simpandokter = () => {
        dispatch(createorderObat(id, formData));
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
                            />
                            <button className="search-bar-obat-button" onClick={handleSearch}>
                                <img src={search} alt="Search" />
                            </button>
                        </div>
                    </div>
                    <div className='kuantitas-dokter'>
                        <span className='text-kuantitas-dokter'>Kuantitas :</span>
                        <input type='text' className='kolom-kuantitas-dokter'></input>
                    </div>
                    <div className='dosis-dokter'>
                        <span className='text-dosis-dokter'>Dosis :</span>
                        <input type='text' className='kolom-dosis-dokter'></input>
                    </div>
                    <div className='catatan-dokter'>
                        <span className='text-catatan-dokter'>Catatan :</span>
                        <input type='text' className='kolom-catatan-dokter'></input>
                    </div>                  
                </div>
                <div className='tambah-dokter-container'>
                    <button className="simpan-dokter" onClick={Simpandokter}>Tambah</button>
                </div>
            </div>
        </div>
    );
};

export default TambahObatDr;
