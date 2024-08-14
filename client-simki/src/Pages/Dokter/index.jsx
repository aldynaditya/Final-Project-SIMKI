import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../../Style/Dokter/Dokter.css';
import { fetchNotifikasiSurat, markNotificationsSeen, setNotificationsViewed } from '../../redux/doctor/indexNotification/actions';
import notif from "../../images/notif.png";
import user from "../../images/user.png";
import agenda from "../../images/agenda.png";

const Dokter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const updatedCount = useSelector(state => state.getnotifikasiSurat.updatedCount);
    const notificationsViewed = useSelector(state => state.getnotifikasiSurat.notificationsViewed);
    const [hasSeenNotifications, setHasSeenNotifications] = useState(false);

    useEffect(() => {
        dispatch(fetchNotifikasiSurat());
    }, [dispatch]);

    useEffect(() => {
        if (notificationsViewed) {
            dispatch(markNotificationsSeen());
            setHasSeenNotifications(true)
        }
    }, [notificationsViewed, dispatch]);

    const handleNavigation = (path) => {
        if (path === 'notifikasi-dokter') {
            dispatch(setNotificationsViewed());
            setHasSeenNotifications(true)
        }
        navigate(path);
    };

    return (
        <div className='dokter-container'>
            <div className='main-content-dokter'>
                <h1 className='text_dokter'>Dashboard</h1>
                <div className="klik_dokter">
                    <div className="jadwal_dokter" onClick={() => handleNavigation('schedule-dokter')}>
                        <img src={agenda} alt='jadwal_dokter' className='icon' />
                        <p>JADWAL DOKTER</p>
                    </div>
                    <div className="pasien" onClick={() => handleNavigation('pasien-dokter')}>
                        <img src={user} alt='pasien' className='icon' />
                        <p>PASIEN</p>
                    </div>
                    <div className="notifikasi" onClick={() => handleNavigation('notifikasi-dokter')}>
                        <img src={notif} alt='notifikasi' className='icon' />
                        <p>NOTIFIKASI</p>
                        {updatedCount > 0 && <span className='notification-badge'>{updatedCount}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dokter;
