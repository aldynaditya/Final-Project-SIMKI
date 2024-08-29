import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListEmr } from '../../redux/doctor/indexListEmr/actions';
import { formatDateStrip } from "../../utils/dateUtils";
import SearchBar from "../../components/SearchBar"; 
import '../../Style/Dokter/AntrianDokter.css'; 

const PasienDokter = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { role } = useSelector((state) => state.auth);
    const { data, loading, error } = useSelector(state => state.getlistEmr);
    const [filteredData, setFilteredData] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        dispatch(fetchListEmr());
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(data);
        if (data.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    }, [data]);

    const EmrDokter = (id) => {
        if (role === 'dokter'){
            navigate(`/dokter/emr-pasien/${id}`);
        } else if (role === 'perawat'){
            navigate(`/perawat/emr-pasien/${id}`);
        } else {
            navigate(`/resepsionis/emr-pasien/${id}`);
        }
    };

    const IdentitasPasien = (id) => {
        window.open(`/resepsionis/identitas-pasien/${id}`, '_blank');
    };

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
                        <h1 className="text_pasien_resepsionis">Pasien</h1>
                        <SearchBar onSearch={handleSearch} />
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
                                            Belum ada data pasien yang terdaftar
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
                                                {role === 'resepsionis' && (
                                                    <>
                                                        <button className="emr-dokter" onClick={() => IdentitasPasien(emr.appointmentId)}>Identitas</button>
                                                        <button className="emr-dokter" onClick={() => EmrDokter(emr.id)}>EMR</button>
                                                    </>
                                                )}
                                                {(role === 'dokter' || role === 'perawat') && (
                                                    <button className="emr-dokter" onClick={() => EmrDokter(emr.id)}>EMR</button>
                                                )}
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

export default PasienDokter;
