import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmr } from '../../redux/doctor/indexEmr/actions';
import SearchBar from "../../components/SearchBar"; 
import '../../Style/Perawat/PasienPerawat.css'; 

const PasienPerawat= () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getEmr);

    useEffect(() => {
        dispatch(fetchEmr());
    }, [dispatch]);

    const EmrPerawat = (id) => {
        navigate(`/perawat/emr-perawat/${id}`);
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
                        <h1 className="text_pasien_resepsionis">Antrian</h1>
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
                                            <button className="emr-perawat" onClick={() => EmrPerawat(emr.id)}>Isi CPPT</button>
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

export default PasienPerawat;
