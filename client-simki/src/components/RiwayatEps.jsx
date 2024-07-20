import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RiwayatEps.css';

const RiwayatEpisode = () => {
    const [rows] = useState([
        { date: '27/5/2024', doctor: 'dr. ', department: 'Poli ' },
        { date: '26/5/2024', doctor: 'dr. ', department: 'Poli ' },
        { date: '25/5/2024', doctor: 'dr. ', department: 'Poli ' }
    ]);
    const navigate = useNavigate();

    const LihatDetailEps = () => {
        navigate('/detail-episode');
    };

    return (
        <div className='tabel-eps-rsp'>
            <h2 className='h2-riwayat-eps-rsp'>Riwayat Episode</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Pemeriksa</th>
                        <th>SOAP</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className='kolom-tgl-eps-rsp'>
                                <p className='tgl-eps-rsp'>{row.date}</p>
                                <button className='lihat-emr-rsp' onClick={LihatDetailEps}>Lihat</button>
                            </td>
                            <td className='kolom-dr-eps-rsp'>
                                <p className='dr-eps-rsp'>{row.doctor}</p>
                                <p className='poli-eps-rsp'>{row.department}</p>
                            </td>
                            <td className='kolom-soap-eps-rsp'>
                                <ul className='soap-list'>
                                    <li>
                                        <div className='soap-entry'>
                                            <span>S :</span> 
                                        </div>
                                    </li>
                                    <li>
                                        <div className='soap-entry'>
                                            <span>O :</span> 
                                        </div>
                                    </li>
                                    <li>
                                        <div className='soap-entry'>
                                            <span>A :</span> 
                                        </div>
                                    </li>
                                    <li>
                                        <div className='soap-entry'>
                                            <span>P :</span> 
                                        </div>
                                    </li>
                                    <li>
                                        <div className='soap-entry'>
                                            <span>Tindakan :</span> 
                                        </div>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RiwayatEpisode;
