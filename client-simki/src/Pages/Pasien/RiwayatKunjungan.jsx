import React from "react";
import { useNavigate } from 'react-router-dom';  
import '../../Style/Pasien/RiwayatKunjungan.css';

const RiwayatKunjungan = () => {
    const navigate = useNavigate();
    
    const DETAIL_PATH = 'detail-kunjungan';

    const handleNavigation = (path) => {
        navigate(path);
    };

    const rows = Array.from({ length: 20 }, (_, index) => (
        <tr key={index}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button className="tombol_selengkapnya" onClick={() => handleNavigation(DETAIL_PATH)}>Selengkapnya</button></td>
        </tr>
    ));

    return (
        <div className="riwayat_kunjungan_container">
            <div className="text_riwayat">
                <h1>Riwayat Kunjungan</h1>
            </div>
            <div className="tabel_riwayat_kunjungan">
                <table>
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Dokter</th>
                            <th>Poli</th>
                            <th>Keterangan</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RiwayatKunjungan;
