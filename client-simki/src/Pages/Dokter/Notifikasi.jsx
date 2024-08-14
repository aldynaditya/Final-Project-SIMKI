import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifikasiSurat } from '../../redux/doctor/indexNotification/actions';
import '../../Style/Dokter/Notifikasi.css';
import SearchBar from "../../components/SearchBar";

const Notifikasi = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getnotifikasiSurat);

    useEffect(() => {
        dispatch(fetchNotifikasiSurat());
    }, [dispatch]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div className="notifikasi-wrapper">
            <div className="navbar-header-notifikasi">
            </div>
            <div className="notifikasi-container">
                <div className="content-wrapper-notifikasi">
                    <div className="header-notifikasi">
                        <h1 className="text_notifikasi">Notifikasi</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel_notifikasi">
                        <table>
                            <thead>
                                <tr>
                                    <th>No EMR</th>
                                    <th>Nama Pasien</th>
                                    <th>Keterangan</th>
                                    <th>Tanggal</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.noEMR}</td>
                                        <td>{row.namaPasien}</td>
                                        <td>{row.versi_surat}</td>
                                        <td>{formatDate(row.tanggal)}</td>
                                        <td>{row.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifikasi;
