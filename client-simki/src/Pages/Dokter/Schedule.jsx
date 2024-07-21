import React from "react";
import NavbarPrivate from '../../components/NavbarPrivate';
import FooterPrivate from '../../components/FooterPrivate';
import '../../Style/Perawat/JadwalDokter.css';
import Header from '../../components/Header';

const JadwalDokter = () => {

    const Menudokter = [
        { name: "Jadwal Dokter", path: "/schedule-dokter" },
        { name: "Pasien", path: "/pasien-dokter" },
        { name: "Notifikasi", path: "/notifikasi-dokter" }
    ];


    return (
        <div className="jadwal-dokter-wrapper">
            <div className="navbar-header-jadwal">
                <NavbarPrivate />
                <Header accountName="Nama Akun Dokter" menuItems={Menudokter} />
            </div>
            <div className="jadwal-dokter-container">
                <div className="content-wrapper-jadwal">
                    <h1 className="text_jadwal">Jadwal Dokter</h1>
                    
                    <div className="poli-section">
                        <h2 className="text_poli_umum">Poli Umum</h2>
                        <div className="tabel_jadwal_dokter">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="kolom-jam">Jam</th>
                                        <th>Senin</th>
                                        <th>Selasa</th>
                                        <th>Rabu</th>
                                        <th>Kamis</th>
                                        <th>Jumat</th>
                                        <th>Sabtu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="kolom-jam">08.30 - 12.30</td>
                                        <td>dr. Akhmad Ismail</td>
                                        <td>dr. Akhmad Ismail</td>
                                        <td>dr. Neni Susilaningsih</td>
                                        <td>dr. Farmaditya Eka Putra</td>
                                        <td>dr. Dea Amarilisa Adespin</td>
                                        <td>dr. Budi Laksono</td>
                                    </tr>
                                    <tr>
                                        <td className="kolom-jam">14.00-18.00</td>
                                        <td>dr. Nur Asri</td>
                                        <td>dr. Nur Asri</td>
                                        <td>dr. Della Rimawati</td>
                                        <td>dr. Della Rimawati</td>
                                        <td>dr. Della Rimawati</td>
                                        <td>dr. Della Rimawati</td>
                                    </tr>
                                    <tr>
                                        <td className="kolom-jam">18.00-21.00</td>
                                        <td>dr. Citra Hutami Saraswati</td>
                                        <td>dr. Citra Hutami Saraswati</td>
                                        <td>dr. Amalian Puswitasari</td>
                                        <td>dr. Amalian Puswitasari</td>
                                        <td>dr. Farmaditya Eka Putra</td>
                                        <td>dr. Farmaditya Eka Putra</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="poli-section">
                        <h2 className="text_poli_gigi">Poli Gigi</h2>
                        <div className="tabel_jadwal_dokter">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="kolom-jam">Jam</th>
                                        <th>Senin</th>
                                        <th>Selasa</th>
                                        <th>Rabu</th>
                                        <th>Kamis</th>
                                        <th>Jumat</th>
                                        <th>Sabtu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="kolom-jam">08.30 - 11.30</td>
                                        <td>drg. Tyas Prihatiningsih</td>
                                        <td>drg. Tyas Prihatiningsih</td>
                                        <td>drg. Eghia Laditra Ambarani</td>
                                        <td>drg. Ahmad Fahmi Fahrobi</td>
                                        <td>drg. Eghia Laditra Ambarani</td>
                                        <td>drg. Eghia Laditra Ambarani</td>
                                    </tr>
                                    <tr>
                                        <td className="kolom-jam">16.00 - 20.00</td>
                                        <td>drg. Ahmad Fahmi Fahrobi</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <FooterPrivate />
        </div>
    );
};

export default JadwalDokter;
