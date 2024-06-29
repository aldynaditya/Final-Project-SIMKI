import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RiwayatEps.css';

const RiwayatEpisode = () => {
    const [rows] = useState(Array.from({ length: 5 })); // Contoh data dummy
    const navigate = useNavigate();

    const LihatDetailEps = () => {
        navigate('/detail-eps-resepsionis');
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
                    {rows.map((_, index) => (
                        <tr key={index}>
                            <td className='kolom-tgl-eps-rsp'>
                                <p className='tgl-eps-rsp'>27/7/2024</p>
                                <button className='lihat-emr-rsp' onClick={LihatDetailEps}>Lihat</button>
                            </td>
                            <td className='kolom-dr-eps-rsp'>
                                <p className='dr-eps-rsp'>dr.</p>
                                <p className='poli-eps-rsp'>Poli</p>
                            </td>
                            <td className='kolom-soap-eps-rsp'>
                                <input type='text' className='s-eps-rsp' placeholder='Subjective' />
                                <input type='text' className='o-eps-rsp' placeholder='Objective' />
                                <input type='text' className='a-eps-rsp' placeholder='Assessment' />
                                <input type='text' className='p-eps-rsp' placeholder='Plan' />
                                <input type='text' className='tindakan-eps-rsp' placeholder='Tindakan' />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RiwayatEpisode;
