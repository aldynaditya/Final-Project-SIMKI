import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../Style/Pasien/DetailKunjungan.css';
import { fetchDetail } from '../../redux/patient/detail/actions';
import QuestionnairePopup from './QuestionnairePopup';

const DetailKunjungan = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.detail);
    const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
    const [completed, setCompleted] = useState(false); // New state

    useEffect(() => {
        dispatch(fetchDetail(id));
    }, [dispatch, id]);

    const handleKuisioner = () => {
        setIsQuestionnaireOpen(true);
    };

    const handleCloseQuestionnaire = () => {
        setIsQuestionnaireOpen(false);
    };

    const handleQuestionnaireComplete = () => {
        setCompleted(true); //
        setIsQuestionnaireOpen(false);
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
        <div className="detail_kunjungan_container">
            <h1 className="text_detail">Detail Kunjungan</h1>
            <div className="form_container">
                <div className="form_field">
                    <div className="tanggal_kunjungan">
                        <span className="text_tanggal_kunjungan">Tanggal:</span>
                        <input type="text" value={formatDate(data.tanggal) || ''} readOnly />
                    </div>
                    <div className="dokter_dikunjungin">
                        <span className="text_dokter_dikunjungin">Dokter:</span>
                        <input type="text" value={data.dokter || ''} readOnly />
                    </div>
                    <div className="poli_dikunjungin">
                        <span className="text_dokter_dikunjungin">Poli:</span>
                        <input type="text" value={data.poli || ''} readOnly />
                    </div>
                    <div className="diagnosis_pasien">
                        <span className="text_diagnosis">Diagnosis:</span>
                        <input type="text" value={data.diagnosis || ''} readOnly />
                    </div>
                    <div className="obat_pasien">
                        <span className="text_obat_pasien">Obat yang Diberikan:</span>
                        <input type="text" value={data.orders ? data.orders.obat.join(', ') : ''} readOnly />
                    </div>
                    <div className="tindakan_pasien">
                        <span className="text_tindakan_pasien">Tindakan yang Diberikan:</span>
                        <input type="text" value={data.tindakan || ''} readOnly />
                    </div>
                    <button
                        className='kuisioner'
                        onClick={handleKuisioner}
                        disabled={completed}
                    >
                        Isi Kuisioner
                    </button>
                </div>
            </div>
            {isQuestionnaireOpen && 
                <QuestionnairePopup 
                    id={id} 
                    onClose={handleCloseQuestionnaire} 
                    onComplete={handleQuestionnaireComplete} 
                />
            }
        </div>
    );
};

export default DetailKunjungan;
