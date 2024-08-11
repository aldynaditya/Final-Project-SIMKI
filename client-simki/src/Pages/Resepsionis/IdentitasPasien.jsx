import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIdentitasPasien } from '../../redux/resepsionis/identitas/actions';
import '../../Style/Resepsionis/IdentitasPasien.css';

const IdentitasPasien = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.identitas);

    useEffect(() => {
        dispatch(getIdentitasPasien());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='identitas_pasien_container'>
            <div className="content-identitas-pasien">
                <h1 className='text_identitas_pasien'>Identitas Pasien</h1>
                <div className='biodata-pasien-perawat'>
                    <div className='nama-nik-perawat'>
                        <input type='text' className='kolom-npasien-perawat' placeholder='Nama Lengkap' value={data.nama_lengkap} readOnly />
                        <input type='text' className='kolom-nik-perawat' placeholder='NIK' value={data.nik} readOnly />
                    </div>
                    <div className='ttl-perawat'>
                        <input
                            type='text'
                            className='kolom-ttl-perawat'
                            placeholder='Tempat, Tanggal Lahir'
                            value={`${data.tempat_lahir}, ${data.tanggal_lahir}`}
                            readOnly
                        />
                    </div>
                    <div className='gender-perawat'>
                        <input type='text' className='kolom-gender-perawat' placeholder='Jenis Kelamin' value={data.jenis_kelamin} readOnly />
                    </div>
                    <div className='blood-perawat'>
                        <input type='text' className='kolom-blood-perawat' placeholder='Golongan Darah' value={data.gol_darah} readOnly />
                    </div>
                    <div className='bangsa-perawat'>
                        <input type='text' className='kolom-bangsa-perawat' placeholder='Kewarganegaraan' value={data.kewarganegaraan} readOnly />
                    </div>
                    <div className='alamat-perawat'>
                        <input type='text' className='kolom-alamat-perawat' placeholder='Alamat Lengkap' value={data.alamat} readOnly />
                    </div>
                    <div className='email-perawat'>
                        <input type='email' className='kolom-email-perawat' placeholder='Email' value={data.email} readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdentitasPasien;
