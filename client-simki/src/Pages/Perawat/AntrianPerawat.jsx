import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmr } from '../../redux/doctor/indexEmr/actions';
import { formatDateStrip } from "../../utils/dateUtils";
import SearchBar from "../../components/SearchBar"; 
import '../../Style/Perawat/PasienPerawat.css'; 

const AntrianPerawat= () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getEmr);
    const [filteredData, setFilteredData] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        dispatch(fetchEmr());
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(data);
        if (data.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    }, [data]);

    const EmrPerawat = (id) => {
        navigate(`/perawat/emr-perawat/${id}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const result = data.filter(emr =>
                emr.nama_pasien.toLowerCase().includes(query) ||
                emr.noEMR.toLowerCase().includes(query)
            );
            setFilteredData(result);
            setNoResults(result.length === 0);
        } else {
            setFilteredData(data);
            setNoResults(false);
        }
    };

    return (
        <div className="pasien-resepsionis-wrapper">
            <div className="navbar-header-wrapper">
            </div>
            <div className="pasien-resepsionis-container">
                <div className="pasien-wrapper">
                    <div className="header-pasien-resepsionis">
                        <h1 className="text_pasien_resepsionis">Antrian</h1>
                        <SearchBar onSearch={handleSearch}/>
                    </div>
                    <div className="tabel_pasien_resepsionis">
                        <table>
                            <thead>
                                <tr>
                                    <th>No. EMR</th>
                                    <th>Nama Pasien</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Jenis Kelamin</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="empty-message">
                                            Belum terdapat antrian yang masuk
                                        </td>
                                    </tr>
                                ) : noResults ? (
                                    <tr>
                                        <td colSpan="5" className="empty-message">
                                            Tidak ditemukan
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((emr) => (
                                        <tr key={emr.id}>
                                            <td>{emr.noEMR}</td>
                                            <td>{emr.nama_pasien}</td>
                                            <td>{formatDateStrip(emr.tanggal_lahir)}</td>
                                            <td>{emr.jenis_kelamin}</td>
                                            <td>
                                                <button className="emr-perawat" onClick={() => EmrPerawat(emr.id)}>Isi CPPT</button>
                                            </td>
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

export default AntrianPerawat;
