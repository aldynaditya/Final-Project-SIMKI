import React, { useState, useEffect } from "react";
import '../../Style/signin/SigninPrivate.css';
import simki_login from '../../images/simki login.png';
import logoklinik from '../../images/logoklinik.png';
import undip from '../../images/undip.png';
import { postData } from '../../utils/fetch';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth/actions';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const SigninPrivate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [alert, setAlert] = useState({
        status: false,
        message: '',
        type: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            const res = await postData(`/cms/auth/signin`, form);

            if (res?.data?.data) {
                const { token, role } = res.data.data;
                dispatch(userLogin(token, role));

                setIsLoading(false);

                navigate('/');
            } else {
                throw new Error(res?.response?.data?.msg || 'Internal server error');
            }
        } catch (err) {
            console.log("Error response:", err);
            setIsLoading(false);
            setAlert({
                status: true,
                message: err.message,
                type: 'danger',
            });
        }
    };

    const closeModal = () => {
        setAlert({ status: false, message: '', type: '' });
    };

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const updateCurrentTime = () => {
            setCurrentTime(new Date());
        };

        const timer = setInterval(updateCurrentTime, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatWaktu = (tanggal) => {
        const optionsDate = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const formattedDate = tanggal.toLocaleDateString('id-ID', optionsDate);
        return formattedDate;
    };

    const formatJam = (tanggal) => {
        return tanggal.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className='kontainer-signin'>
            <nav className='navbar_signin_nakes'>
                <div className="konten-navbar">
                    <div className="tanggal">
                        {formatWaktu(currentTime)}
                    </div>
                    <div className="jam_signin">
                        Time {formatJam(currentTime)}
                    </div>
                </div>
                </nav>
            <h1 className="text_sign_in">Sign In</h1>
            <div className="logo_simki_private">
                <img src={simki_login} alt="Simki" className="simki" />
            </div>
            <div className="input-container">
                <div className="input-email">
                    <input 
                        type='email' 
                        name='email' 
                        placeholder='Email' 
                        value={form.email}
                        onChange={handleChange} 
                    />
                </div>
                <div className="input-password">
                    <input 
                        type='password' 
                        name='password' 
                        placeholder='Password' 
                        value={form.password}
                        onChange={handleChange} 
                    />
                </div>
            </div>
            <div className="button-container">
                <button 
                    className='klik_sign_in' 
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Sign In'}
                </button>
            </div>
            <footer className="footer_signin_nakes">
                <div className="logo_footer">
                    <img src={logoklinik} alt='Logo Klinik' className='logo_klinik' />
                    <img src={undip} alt='Undip' className='undip' />
                </div>
                <div className="footer-copyright">
                    <p>© copyright {new Date().getFullYear()} Universitas Diponegoro. All rights reserved.</p>
                </div>
            </footer>

            {/* Modal for displaying error messages */}
            <Modal
                isOpen={alert.status}
                onRequestClose={closeModal}
                contentLabel="Error Message"
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className="modal-content">
                    <p>{alert.message}</p>
                    <button onClick={closeModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default SigninPrivate;
