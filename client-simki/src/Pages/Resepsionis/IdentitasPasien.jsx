import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPasienbyId } from '../../redux/resepsionis/indexPatientbyId/actions';
import { formatDateStrip } from '../../utils/dateUtils';
import '../../Style/Resepsionis/IdentitasPasien.css';

const IdentitasPasien = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.getonePatient);

    useEffect(() => {
        dispatch(fetchPasienbyId(id));
    }, [dispatch, id]);

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
                    <div className='gender-perawat'>
                        <input type='text' className='kolom-gender-perawat' placeholder='tempat_lahir' value={data.tempat_lahir} readOnly />
                    </div>
                    <div className='gender-perawat'>
                        <input type='text' className='kolom-gender-perawat' placeholder='tanggal_lahir' value={formatDateStrip(data.tanggal_lahir)} readOnly />
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
                </div>
            </div>
        </div>
    );
};

export default IdentitasPasien;
