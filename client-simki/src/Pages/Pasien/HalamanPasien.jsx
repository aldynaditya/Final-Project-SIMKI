import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../Style/Pasien/HalamanPasien.css';
import { userLogout } from '../../redux/auth/actions';
import user from "../../images/user.png";
import buatjanji from "../../images/buatjanji.png";
import riwayat from "../../images/riwayat.png";
import { fetchProfile } from '../../redux/patient/profile/actions';
import { fetchAppointments } from '../../redux/patient/appointment/actions';
import Modal from 'react-modal';

const HalamanPasien = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { appointments, loading, error } = useSelector(state => state.appointments);
    const { profile } = useSelector(state => state.profile);

    const [alert, setAlert] = useState({
        status: false,
        message: '',
        type: '',
    });
    
    const [localProfile, setLocalProfile] = useState({
        nama_lengkap: '',
    });

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    useEffect(() => {
        if (profile && profile.data) {
            setLocalProfile({
                nama_lengkap: profile.data.nama_lengkap || '',
            });
        }
    }, [profile]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const PROFILE_PATH = 'profile';
    const BUATJANJI_PATH = 'buat-janji';
    const RIWAYAT_PATH = 'riwayat-kunjungan';

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        dispatch(userLogout());
        navigate('/login');
    };

    const closeModal = () => {
        setAlert({ status: false, message: '', type: '' });
    };

    useEffect(() => {
        if (error) {
            setAlert({
                status: true,
                message: error,
                type: 'danger',
            });
        }
    }, [error]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const sortedAppointments = [...appointments].sort((a, b) => {
        const createdComparison = new Date(b.dibuat) - new Date(a.dibuat);
        if (createdComparison !== 0) {
            return createdComparison;
        }
        return new Date(b.diupdate) - new Date(a.diupdate);
    });

    return (
        <div className="halaman_pasien_container">
            <h1 className="center_text">
                <span className="nama_pasien">Hai, {localProfile.nama_lengkap}</span>
                <button className="keluar" onClick={handleLogout}>Keluar</button>
            </h1>
            <div className="transaksi">
                <p>Transaksi Berlangsung :</p>
            </div>
            <div className="tabel_transaksi_pasien">
                <table>
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Dokter</th>
                            <th>Poli</th>
                            <th>Jam</th>
                            <th>Keterangan</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAppointments.map((appointment, index) => (
                            <tr key={index}>
                                <td>{formatDate(appointment.tanggal)}</td>
                                <td>{appointment.nama_dokter}</td>
                                <td>{appointment.poli}</td>
                                <td>{appointment.jam}</td>
                                <td>{appointment.keterangan}</td>
                                <td><div className={`tombol_${appointment.status.toLowerCase()}`}>{appointment.status}</div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="klik_pasien">
                <div className='profile' onClick={() => handleNavigation(PROFILE_PATH)}>
                    <img src={user} alt='Profil' className='user' />
                    <p>PROFIL</p>
                </div>
                <div className="buat_janji" onClick={() => handleNavigation(BUATJANJI_PATH)}>
                    <img src={buatjanji} alt='Buat_Janji' className='buatjanji' />
                    <p>BUAT JANJI</p>
                </div>
                <div className="riwayat_kunjungan" onClick={() => handleNavigation(RIWAYAT_PATH)}>
                    <img src={riwayat} alt='riwayat' className='riwayat' />
                    <p>RIWAYAT KUNJUNGAN</p>
                </div>
            </div>

            <Modal
                isOpen={alert.status}
                onRequestClose={closeModal}
                contentLabel="Alert Message"
                className="Modal"
                overlayClassName="Overlay"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
            >
                <div className="modal-content">
                    <p>{alert.message}</p>
                    <button onClick={closeModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default HalamanPasien;
