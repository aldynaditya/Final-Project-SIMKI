import React from "react";
import Navbar from "../components/Navbar";
import "./KebijakanPrivasi.css";
import Footer from "../components/Footer";


const KebijakanPrivasi = () => {
    return (
        <div className="container">
            <Navbar />
            <h1 className="judul">Kebijakan Privasi</h1>
            <div className="desc">
                <p>
                    <span>
                    Kebijakan Privasi Klinik Diponegoro 1 melindungi data pribadi pengguna
                    yang mengunjungi situs kami. Kami mengumpulkan informasi pribadi
                    seperti nama, email, nomor telepon, dan informasi kesehatan untuk
                    mengelola janji temu dan memberikan layanan medis. Informasi teknis
                    juga dikumpulkan untuk meningkatkan layanan. Data pribadi digunakan
                    untuk administrasi dan pengiriman pemberitahuan penting, dilindungi
                    oleh teknologi enkripsi dan firewall. Informasi tidak dibagikan kepada
                    pihak ketiga tanpa persetujuan, kecuali diperlukan secara hukum atau
                    untuk layanan medis. Pengguna dapat mengakses, memperbaiki, atau
                    menghapus informasi pribadi mereka melalui kontak yang tersedia.
                    Kebijakan ini dapat diperbarui, dan pengguna disarankan memeriksanya
                    secara berkala. Untuk pertanyaan lebih lanjut, pengguna dapat
                    menghubungi kami melalui email atau telepon yang tersedia di situs. Klinik
                    Diponegoro 1 berkomitmen menjaga kerahasiaan dan keamanan
                    informasi pribadi pengguna.
                    </span>
                </p>
            </div>
            <Footer />
        </div>

    );
}
export default KebijakanPrivasi;