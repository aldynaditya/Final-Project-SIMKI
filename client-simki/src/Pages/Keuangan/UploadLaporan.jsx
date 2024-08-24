import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLaporan } from '../../redux/keuangan/create/actions';
import '../../Style/Keuangan/UploadLaporan.css';

const UploadLaporan = ({ onClose }) => {
    const [formData, setFormData] = useState({
        noLaporan: '',
        periode: '',
        file: null
    });
    
    const dispatch = useDispatch();
    const { loading, error, data } = useSelector((state) => state.laporan);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const TambahLaporan = () => {
        if (!formData.noLaporan || !formData.periode) {
            alert('Silakan isi semua kolom sebelum mengunggah laporan.');
            return;
        }

        if (formData.file) {
            const form = new FormData();
            form.append('file', formData.file);
            form.append('noLaporan', formData.noLaporan);
            form.append('periode', formData.periode);

            console.log('Submitting form with:', {
                noLaporan: formData.noLaporan,
                periode: formData.periode,
                file: formData.file
            });

            dispatch(createLaporan(form));
        } else {
            alert('Silakan unggah laporan terlebih dahulu.');
        }
    };

    return (
        <div className='tambahlaporan-popup-container'>
            <div className='tambahlaporan-popup-content'>
                <button className='cancel-x' onClick={onClose}>
                    Cancel X
                </button>
                <h1 className='text-tambahlaporan-popup'>Tambah Laporan</h1>
                <div className='kolom-tambah-laporan'>
                    <div className='no-laporan'>
                        <span className='text-no-laporan'>No. Laporan :</span>
                        <input
                            type='text'
                            name='noLaporan'
                            value={formData.noLaporan}
                            onChange={handleChange}
                            className='kolom-no-laporan'
                        />
                    </div>
                    <div className='periode-laporan'>
                        <span className='text-periode-laporan'>Periode :</span>
                        <input
                            type='text'
                            name='periode'
                            value={formData.periode}
                            onChange={handleChange}
                            className='kolom-periode-laporan'
                        />
                    </div>
                    <div className='unggah-laporan'>
                        <span className='text-unggah-laporan'>Unggah Laporan:</span>
                        <input
                            type='file'
                            name='file'
                            className='kolom-unggah-laporan'
                            accept='application/pdf'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='tambah-laporan-container'>
                    <button className="tambah-laporan" onClick={TambahLaporan} disabled={loading}>
                        {loading ? 'Menyimpan...' : 'Tambahkan Laporan'}
                    </button>
                </div>
                {error && <p className="error-message">{error}</p>}
                {data && <p className="success-message">Laporan berhasil diunggah!</p>}
            </div>
        </div>
    );
};

export default UploadLaporan;
