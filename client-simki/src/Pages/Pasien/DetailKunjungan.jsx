import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../Style/Pasien/DetailKunjungan.css';
import { fetchDetail } from '../../redux/patient/detail/actions';
import { fetchResponses } from '../../redux/patient/response/actions';
import { formatDateStrip } from '../../utils/dateUtils';
import QuestionnairePopup from './QuestionnairePopup';
import FeedbackPopUp from './FeedbackPopUp';

const DetailKunjungan = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.detail);
    const { responses, loading: responsesLoading, error: responsesError } = useSelector(state => state.responses);
    const [isKuisionerPopUpOpen, setIsKuisionerPopUpOpen] = useState(false);
    const [isFeedbackPopUpOpen, setFeedbackPopUpOpen] = useState(false);
    const [completed, setCompleted] = useState(false);
    const isFeedbackAvailable = data.feed_back && data.feed_back.length > 0;

    useEffect(() => {
        dispatch(fetchDetail(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (data && data.emrId) {
            dispatch(fetchResponses(data.emrId));
        }
    }, [dispatch, data]);

    useEffect(() => {
        if (responses && responses.length > 0) {
            setCompleted(true);
        }
    }, [responses]);

    const handleKuisioner = () => {
        setIsKuisionerPopUpOpen(true);
    };

    const handleCloseQuestionnaire = () => {
        setIsKuisionerPopUpOpen(false);
    };

    const handleQuestionnaireComplete = () => {
        setCompleted(true);
        setIsKuisionerPopUpOpen(false);
    };

    const handleFeedback = () => {
        setFeedbackPopUpOpen(true);
    };

    const handleCloseFeedback = () => {
        setFeedbackPopUpOpen(false);
    };

    if (loading || responsesLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="detail_kunjungan_container">
            <h1 className="text_detail">Detail Kunjungan</h1>
            <div className="form_container">
                <div className="form_field">
                    <div className="tanggal_kunjungan">
                        <span className="text_tanggal_kunjungan">Tanggal:</span>
                        <input type="text" value={formatDateStrip(data.tanggal) || ''} readOnly />
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
                    </div>
                    <div className="button_container_detailkunjungan">
                        <button
                            className='kuisioner'
                            onClick={handleKuisioner}
                            disabled={completed}
                        >
                            Isi Kuisioner
                        </button>
                        <button
                            className={`feedback ${!isFeedbackAvailable ? 'disabled' : ''}`}
                            onClick={handleFeedback}
                            disabled={!isFeedbackAvailable}
                            title={!isFeedbackAvailable ? 'Feedback belum ada' : ''}
                        >
                            Feedback
                        </button>
                </div>
            </div>
            {isKuisionerPopUpOpen && 
                <QuestionnairePopup 
                    id={id} 
                    onClose={handleCloseQuestionnaire} 
                    onComplete={handleQuestionnaireComplete} 
                />
            }
            {isFeedbackPopUpOpen && 
                <FeedbackPopUp
                data={data.feed_back} 
                onClose={handleCloseFeedback}
                />
            }
        </div>
    );
};

export default DetailKunjungan;
