import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchdetailEmr } from '../../redux/doctor/detailEmr/actions';
import RiwayatEpisode from '../../components/RiwayatEps';
import tambah from "../../images/tambah.png";
import masuk from "../../images/inbox.png";
import '../../Style/Dokter/EmrDokter.css';

const EmrDokter = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, error } = useSelector(state => state.getdetailEmr);

    useEffect(() => {
        dispatch(fetchdetailEmr(id));
    }, [dispatch, id]);

    const EntriMasuk = () => {
        navigate(`/dokter/entri-masuk/${id}`);
    };

    const EntriBaru = () => {
        navigate(`/dokter/entri-baru/${id}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='emr-resepsionis-container'>
            <h1 className='text-emr-resepsionis'>EMR Pasien</h1>
            <div className='kolom-emr-resepsionis'>
                <div className='no-emr-rsp'>
                    <span className='text-nemr-rsp'>No. EMR :</span>
                    <input type='text' className='kolom-nemr-rsp' name="noEMR" value={data.noEMR} readOnly></input>
                </div>
                <div className='nama-pasien-rsp'>
                    <span className='text-npasien-rsp'>Nama Pasien :</span>
                    <input type='text' className='kolom-npasien-rsp' name="nama_pasien" value={data.nama_pasien} readOnly></input>
                </div>
                <div className='tgl-lahir-rsp'>
                    <span className='text-ttl-rsp'>Tanggal Lahir :</span>
                    <input type='text' className='kolom-ttl-rsp' name="tanggal_lahir" value={formatDate(data.tanggal_lahir)} readOnly></input>
                </div>
                <div className='gender-goldar-rsp'>
                    <div className='gender-emr-rsp'>
                        <span className='text-gender-rsp'>Jenis Kelamin :</span>
                        <input type='text' className='kolom-gender-rsp' name="jenis_kelamin" value={data.jenis_kelamin} readOnly></input>
                    </div>
                    <div className='goldar-emr-rsp'>
                        <span className='text-goldar-rsp'>Golongan Darah :</span>
                        <input type='text' className='kolom-goldar-rsp' name="gol_darah" value={data.gol_darah} readOnly></input>
                    </div>
                </div>
                <div className='alergi-rsp'>
                    <span className='text-alergi-rsp'>Alergi :</span>
                    <input type='text' className='kolom-alergi-rsp' name="alergi" value={data.alergi} readOnly></input>
                </div>
            </div>
            <div className='button-emr-dokter'>
                <div className="entri_masuk" onClick={EntriMasuk}>
                    <img src={masuk} alt='entri-masuk' className='icon-emr-dokter' />
                    <p>ENTRI MASUK</p>
                </div>
                <div className="entri-baru" onClick={EntriBaru}>
                    <img src={tambah} alt='entri-baru' className='icon-emr-dokter' />
                    <p>ENTRI BARU</p>
                </div>
            </div>
            <RiwayatEpisode noEMR={data.noEMR} />
        </div>
    );
};

export default EmrDokter;
