import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory } from '../../redux/patient/history/actions';
import { formatDateStrip } from '../../utils/dateUtils';
import '../../Style/Pasien/RiwayatKunjungan.css';

const RiwayatKunjungan = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.history);

    useEffect(() => {
        dispatch(fetchHistory());
    }, [dispatch]);

    const handleNavigation = (id) => {
        navigate(`detail-kunjungan/${id}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const historyData = Array.isArray(data) ? data : [];

    const rows = historyData.map(item => (
        <tr key={item.id}>
            <td>{formatDateStrip(item.tanggal)}</td>
            <td>{item.dokter}</td>
            <td>{item.poli}</td>
            <td>{item.keterangan}</td>
            <td>
                <button className="tombol_selengkapnya" onClick={() => handleNavigation(item.id)}>Selengkapnya</button>
            </td>
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
