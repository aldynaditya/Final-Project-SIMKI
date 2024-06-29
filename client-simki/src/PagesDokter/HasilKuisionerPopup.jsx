import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import './HasilKuisionerPopup.css';

const HasilKuisionerPopup = () => {
    const [activeLink, setActiveLink] = useState('');
    const [rows] = useState(Array.from({ length: 5 }));

    const handleLinkCancel = (link) => {
        setActiveLink(link);
    };

    
    return (
        <div className='hasilkuisioner-popup-container'>
            <div className='hasilkuisioner-popup-content'>
                <Link 
                    to="/detail-episode" 
                    className={activeLink === 'cancel' ? 'active cancel-link' : 'cancel-x'} 
                    onClick={() => handleLinkCancel('cancel')}
                >
                    Cancel X
                </Link>
                <h1 className='text-hasilkuisioner-popup'>Hasil Kuisioner</h1>
                <div className='kolom-hasilkuisioner'>
                    <table>
                        <thead>
                            <tr>
                                <th>Pertanyaan</th>
                                <th>Jawaban</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((_, index) => (
                                <tr key={index}>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
                
        </div>
        
    );
};

export default HasilKuisionerPopup;
