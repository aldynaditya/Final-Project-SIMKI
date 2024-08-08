import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { fetchQuestions } from '../../redux/patient/question/actions';
import { submitResponses } from '../../redux/patient/response/actions';
import '../../Style/Pasien/QuestionnairePopup.css';

const QuestionnairePopup = ({ id, onClose, onComplete }) => {
    const dispatch = useDispatch();
    const { questions, loading: loadingQuestions } = useSelector(state => state.questions);
    const { submitting, error, response } = useSelector(state => state.responses);
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [alert, setAlert] = useState({ status: false, message: '' });

    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

    const handleAnswer = (index) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = index;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const formattedAnswers = questions.map((question, index) => ({
                questionId: question.id,
                answer: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"][answers[index]] || ""
            }));

            dispatch(submitResponses(id, formattedAnswers));
        }
    };

    useEffect(() => {
        if (error) {
            setAlert({
                status: true,
                message: error
            });
        } else if (response) {
            setAlert({
                status: true,
                message: 'Response has been sent successfully!'
            });
        }
    }, [error, response]);

    useEffect(() => {
        if (!submitting && !error && response) {
            const timer = setTimeout(() => {
                setAlert({ status: false, message: '' });
                onComplete();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [submitting, error, response, onComplete]);

    const handleCloseModal = () => {
        setAlert({ status: false, message: '' });
        onClose();
    };

    return (
        <div className="questionnaire_popup">
            <div className="questionnaire_content">
                <div className="questionnaire_header">
                    <span>{currentQuestion + 1}/{questions.length}</span>
                </div>
                {!loadingQuestions && questions.length > 0 ? (
                    <>
                        <h2>{questions[currentQuestion].text}</h2>
                        <div className="options">
                            {["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"].map((option, index) => (
                                <div
                                    key={index}
                                    className={`option_container ${answers[currentQuestion] === index ? 'selected' : ''}`}
                                    onClick={() => handleAnswer(index)}
                                >
                                    <div className="option_circle"></div>
                                    <span className="option_label">{option}</span>
                                </div>
                            ))}
                        </div>
                        <button 
                            className="next_button" 
                            onClick={handleNext} 
                            disabled={answers[currentQuestion] === undefined}
                        >
                            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </>
                ) : (
                    <p>Loading questions...</p>
                )}
            </div>
            <Modal
                isOpen={alert.status}
                onRequestClose={handleCloseModal}
                contentLabel="Alert Message"
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className="modal-content">
                    <p>{alert.message}</p>
                    <button onClick={handleCloseModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default QuestionnairePopup;
