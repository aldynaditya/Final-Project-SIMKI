import React from 'react';
import NavbarPrivate from '../../components/NavbarPrivate';
import FooterPrivate from '../../components/FooterPrivate';
import RiwyataEpisode from '../../components/RiwayatEps';
import Header from '../../components/Header';
import '../../Style/Resepsionis/EmrResepsionis.css';

const EmrResepsionis = () => {

    const MenuResepsionis = [
        { name: "Pendaftar Baru", path: "/pendaftar-baru" },
        { name: "Antrian", path: "/antrian" },
        { name: "Pasien", path: "/pasien-resepsionis" },
        { name: "Kelola Jadwal", path: "/kelola-jadwal" }
    ];

    return (
        <div className='emr-resepsionis-container'>
            <NavbarPrivate />
            <Header accountName="Nama Akun Resepsionis" menuItems={MenuResepsionis} />
            <h1 className='text-emr-resepsionis'>EMR Pasien</h1>
            <div className='kolom-emr-resepsionis'>
                <div className='no-emr-rsp'>
                    <span className='text-nemr-rsp'>No. EMR :</span>
                    <input type='text' className='kolom-nemr-rsp'></input>
                </div>
                <div className='nama-pasien-rsp'>
                    <span className='text-npasien-rsp'>Nama Pasien :</span>
                    <input type='text' className='kolom-npasien-rsp'></input>
                </div>
                <div className='tgl-lahir-rsp'>
                    <span className='text-ttl-rsp'>Tanggal Lahir :</span>
                    <input type='date' className='kolom-ttl-rsp'></input>
                </div>
                <div className='gender-goldar-rsp'>
                    <div className='gender-emr-rsp'>
                        <span className='text-gender-rsp'>Jenis Kelamin :</span>
                        <input type='text' className='kolom-gender-rsp'></input>
                    </div>
                    <div className='goldar-emr-rsp'>
                        <span className='text-goldar-rsp'>Golongan Darah :</span>
                        <input type='text' className='kolom-goldar-rsp'></input>
                    </div>
                </div>
                <div className='alergi-rsp'>
                    <span className='text-alergi-rsp'>Alergi :</span>
                    <input type='text' className='kolom-alergi-rsp'></input>
                </div>
            </div>
            <RiwyataEpisode />
            <FooterPrivate />
        </div>
    );
};

export default EmrResepsionis;
