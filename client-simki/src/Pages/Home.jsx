import React from "react";
import Navbar from "../components/Navbar";
import "./Home.css";
import klinikdipo from "../images/klinikdipo.png";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <h1 className="center_text">Tentang Kami</h1>
      <div className="klinik_dipo">
        <img src={klinikdipo} alt="Klinik Diponegoro" className="klinik_dipo" />
      </div>
      <div className="desc-jam-container">
        <div className="desc">
          <p>
            <span>
              Klinik Pratama Diponegoro 1 merupakan unit layanan kesehatan dari UNDIP MAJU. Klinik Pratama Diponegoro 1 menjadi Fasilitas Kesehatan Tingkat Pertama (FKTP) bagi civitas akademika Universitas Diponegoro dan masyarakat di sekitar wilayah Tembalang. Klinik Pratama Diponegoro 1 dilengkapi dengan Pelayanan Umum dan Pelayanan Gigi dan juga menerima pelayanan BPJS Kesehatan - JKN.
            </span>
          </p>
        </div>
        <div className="jam">
          <p>
            <span style={{ fontWeight: "bold" }}> Jam Operasional : </span>
          </p>
          <ul>
            <li>Senin - Sabtu (08:00 - 13.30)</li>
            <li>Senin - Sabtu (14:00 - 21:00)</li>
            <li>Minggu & Liburan Bersama</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
