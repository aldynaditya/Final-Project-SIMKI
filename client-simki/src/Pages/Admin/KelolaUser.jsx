import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import '../../Style/Admin/KelolaUser.css';
import TambahUser from './TambahUser';
import { fetchUsers, deleteUser } from '../../redux/admin/user/actions';

const KelolaUser = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.user);

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const [alert, setAlert] = useState({
        status: false,
        message: '',
        type: '',
    });

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleTambahUser = () => {
        setIsPopupVisible(true);
    };

    const handleCloseTambahUser = () => {
        setIsPopupVisible(false);
    };

    const handleSuccess = () => {
        dispatch(fetchUsers());
    };

    const handleDeleteUser = async (id) => {
        try {
            await dispatch(deleteUser(id));
            setAlert({
                status: true,
                message: 'User deleted successfully',
                type: 'success',
            });
        } catch (err) {
            setAlert({
                status: true,
                message: 'Failed to delete user',
                type: 'danger',
            });
        }
    };

    const closeModal = () => {
        setAlert({ status: false, message: '', type: '' });
    };

    return (
        <div className="kelola-item-wrapper">
            <div className="navbar-kelola-item">
            </div>
            <div className={`kelola-item-container ${isPopupVisible ? 'overlay' : ''}`}>
                <div className="content-wrapper-kelola-item">
                    <div className="header-kelola-item">
                        <h1 className="text_kelola-item">User Klinik</h1>
                        <div className="header-kelola-item-action">
                            <button className='tombol_tambahitem' onClick={handleTambahUser}>Tambah User</button>
                        </div>
                    </div>
                    <div className="tabel_kelola-item">
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? 
                                <tr>
                                    <td colSpan="6" className="empty-message">
                                        Belum ada akun terdaftar
                                    </td>
                                </tr> : (
                                    users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>{user.nama}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td><div className="hapus-jadwal" onClick={() => handleDeleteUser(user.id)}>Delete</div></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isPopupVisible &&
                <TambahUser
                    onClose={handleCloseTambahUser} 
                    onSuccess={handleSuccess} 
                />
            }
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

export default KelolaUser;
