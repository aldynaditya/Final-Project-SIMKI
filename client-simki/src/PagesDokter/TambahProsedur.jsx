import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TambahProsedur.css';
import search from "../images/search.png";

const TambahProsedur = () => {
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate();

    const handleLinkCancel = (link) => {
        setActiveLink(link);
    };

    const SimpanProsedur = () => {
        alert('Prosedur Tersimpan');
        navigate('/order-prosedur'); 
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
                <Link 
                    to="/order-prosedur" 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </Link>
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
