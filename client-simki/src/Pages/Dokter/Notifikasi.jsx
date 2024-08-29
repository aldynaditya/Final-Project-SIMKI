import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifikasiSurat } from '../../redux/doctor/indexNotification/actions';
import { formatDateStrip } from "../../utils/dateUtils";
import '../../Style/Dokter/Notifikasi.css';
import SearchBar from "../../components/SearchBar";

const Notifikasi = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getnotifikasiSurat);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        dispatch(fetchNotifikasiSurat());
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(data);
        setNoResults(data.length === 0);
    }, [data]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const result = data.filter(row =>
                row.noEMR.toLowerCase().includes(query) ||
                row.namaPasien.toLowerCase().includes(query)
            );
            setFilteredData(result);
            setNoResults(result.length === 0);
        } else {
            setFilteredData(data);
            setNoResults(false);
        }
    };

    return (
        <div className="notifikasi-wrapper">
            <div className="navbar-header-notifikasi">
            </div>
            <div className="notifikasi-container">
                <div className="content-wrapper-notifikasi">
                    <div className="header-notifikasi">
                        <h1 className="text_notifikasi">Notifikasi</h1>
                        <SearchBar onSearch={handleSearch}/>
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
                                {data.length === 0 ? 
                                        <tr>
                                            <td colSpan="5" className="empty-message">
                                                Belum ada data perpanjangan surat
                                            </td>
                                        </tr>
                                    : filteredData.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="empty-message">
                                                {noResults ? "Tidak ditemukan" : "Tidak ditemukan"}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredData.map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.noEMR}</td>
                                            <td>{row.namaPasien}</td>
                                            <td>{row.versi_surat}</td>
                                            <td>{formatDateStrip(row.tanggal)}</td>
                                            <td>{row.status}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifikasi;
