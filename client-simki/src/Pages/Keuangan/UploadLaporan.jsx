import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLaporan } from '../../redux/keuangan/create/actions';
import '../../Style/Keuangan/UploadLaporan.css';

const UploadLaporan = ({ onClose }) => {
    const [no_laporan, setNoLaporan] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [periode, setPeriode] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    const { loading, error, data } = useSelector((state) => state.laporan);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const TambahLaporan = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('no_laporan', no_laporan);
            formData.append('tanggal', tanggal);
            formData.append('periode', periode);

            dispatch(createLaporan(formData));
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
                    <div className='tgl-laporan'>
                        <span className='text-tgl-laporan'>Tanggal :</span>
                        <input
                            type='date'
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            className='kolom-tgl-laporan'
                        />
                    </div>
                    <div className='no-laporan'>
                        <span className='text-no-laporan'>No. Laporan :</span>
                        <input
                            type='text'
                            value={no_laporan}
                            onChange={(e) => setNoLaporan(e.target.value)}
                            className='kolom-no-laporan'
                        />
                    </div>
                    <div className='periode-laporan'>
                        <span className='text-periode-laporan'>Periode :</span>
                        <input
                            type='text'
                            value={periode}
                            onChange={(e) => setPeriode(e.target.value)}
                            className='kolom-periode-laporan'
                        />
                    </div>
                    <div className='unggah-laporan'>
                        <span className='text-unggah-laporan'>Unggah Laporan:</span>
                        <input
                            type='file'
                            className='kolom-unggah-laporan'
                            accept='application/pdf'
                            onChange={handleFileChange}
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
