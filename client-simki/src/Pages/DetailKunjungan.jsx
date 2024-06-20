import React, { useState } from "react";
import Navbar from "../components/Navbar";  
import Footer from "../components/Footer";   
import './DetailKunjungan.css';
import QuestionnairePopup from "../Pages/QuestionnairePopup"; // Impor komponen baru

const DetailKunjungan = () => {
    const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

    const handleKuisioner = () => {
        setIsQuestionnaireOpen(true);
    };

    const handleCloseQuestionnaire = () => {
        setIsQuestionnaireOpen(false);
    };

    return (
        <div className="detail_kunjungan_container">
            <Navbar />
            <h1 className="text_detail">Detail Kunjungan</h1>
            <div className="form_container">
                <div className="form_field">
                    <div className="tanggal_kunjungan">
                        <span className="text_tanggal_kunjungan">Tanggal:</span>
                        <input type="text" />
                    </div>
                    <div className="dokter_dikunjungin">
                        <span className="text_dokter_dikunjungin">Dokter:</span>
                        <input type="text" />
                    </div>
                    <div className="poli_dikunjungin">
                        <span className="text_dokter_dikunjungin">Poli:</span>
                        <input type="text" />
                    </div>
                    <div className="diagnosis_pasien">
                        <span className="text_diagnosis">Diagnosis:</span>
                        <input type="text" />
                    </div>
                    <div className="obat_pasien">
                        <span className="text_obat_pasien">Obat yang Diberikan:</span>
                        <input type="text" />
                    </div>
                    <div className="tindakan_pasien">
                        <span className="text_tindakan_pasien">Tindakan yang Diberikan:</span>
                        <input type="text" />
                    </div>
                    <button className='kuisioner' onClick={handleKuisioner}>Isi Kuisioner</button>
                </div>
            </div>
            {isQuestionnaireOpen && <QuestionnairePopup onClose={handleCloseQuestionnaire} />}
            <Footer />
        </div>
    );
};

export default DetailKunjungan;
