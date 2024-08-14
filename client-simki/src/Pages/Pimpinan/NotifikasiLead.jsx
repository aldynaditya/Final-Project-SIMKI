import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifikasi, updateStatus } from '../../redux/pimpinan/index/actions';
import '../../Style/Pimpinan/NotifikasiLead.css';
import SearchBar from '../../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const NotifikasiPimpinan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { data: rows, loading, error } = useSelector(state => state.pimpinan);

    useEffect(() => {
        dispatch(fetchNotifikasi());
    }, [dispatch]);


    const TerimaLaporan = (id) => {
        dispatch(updateStatus(id, 'accepted'));
    };


    const LihatLaporan = () => {
        navigate('notifikasi-pimpinan');
    };

    if (loading) {
        return <div>Loading...</div>;
    }


    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="notif-pimpinan-wrapper">
            <div className="navbar-header-notif-pimpinan"></div>
            <div className="notif-pimpinan-container">
                <div className="content-wrapper-notif-pimpinan">
                    <div className="header-notif-pimpinan">
                        <h1 className="text_notif-pimpinan">Notifikasi</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel_notif-pimpinan">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>No. Laporan</th>
                                    <th>Periode</th>
                                    <th>Keterangan</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(rows) && rows.length > 0 ? (
                                    rows.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.tanggal}</td>
                                            <td>{row.no_laporan}</td>
                                            <td>{row.periode}</td>
                                            <td>{row.keterangan}</td>
                                            <td>{row.status}</td>
                                            <td className="notif-laporan-cell">
                                                <button 
                                                    className="ket_terima-pimpinan" 
                                                    onClick={() => TerimaLaporan(row.id)}>Terima</button>
                                                <button className="laporan-pimpinan" onClick={LihatLaporan}>Lihat</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">Tidak ada data tersedia</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotifikasiPimpinan;
