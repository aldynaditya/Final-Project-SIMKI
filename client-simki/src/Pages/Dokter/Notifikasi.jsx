import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifikasiSurat } from '../../redux/doctor/indexNotification/actions';
import { formatDateStrip } from "../../utils/dateUtils";
import '../../Style/Dokter/Notifikasi.css';
import SearchBar from "../../components/SearchBar";

const Notifikasi = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getnotifikasiSurat);

    useEffect(() => {
        dispatch(fetchNotifikasiSurat());
    }, [dispatch]);

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
                                {data.length === 0 ? 
                                <tr>
                                    <td colSpan="5" className="empty-message">
                                        Belum ada history perpanjangan surat
                                    </td>
                                </tr> : (
                                    data.map((row) => (
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
