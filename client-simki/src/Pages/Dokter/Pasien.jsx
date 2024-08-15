import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListEmr } from '../../redux/doctor/indexListEmr/actions';
import SearchBar from "../../components/SearchBar"; 
import '../../Style/Dokter/AntrianDokter.css'; 

const PasienDokter= () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getlistEmr);

    useEffect(() => {
        dispatch(fetchListEmr());
    }, [dispatch]);

    const EmrDokter = (id) => {
        navigate(`/dokter/emr-pasien/${id}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="pasien-resepsionis-wrapper">
            <div className="navbar-header-wrapper">
            </div>
            <div className="pasien-resepsionis-container">
                <div className="pasien-wrapper">
                    <div className="header-pasien-resepsionis">
                        <h1 className="text_pasien_resepsionis">Pasien</h1>
                        <SearchBar />
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
                                {data.map((emr) => (
                                    <tr key={emr.id}>
                                        <td>{emr.noEMR}</td>
                                        <td>{emr.nama_pasien}</td>
                                        <td>{formatDate(emr.tanggal_lahir)}</td>
                                        <td>{emr.jenis_kelamin}</td>
                                        <td>
                                            <button className="emr-dokter" onClick={() => EmrDokter(emr.id)}>EMR</button>
                                            </td>
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

export default PasienDokter;
