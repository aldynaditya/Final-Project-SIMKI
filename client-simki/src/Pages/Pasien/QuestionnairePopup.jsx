import React, { useState } from 'react';
import '../../Style/Pasien/QuestionnairePopup.css';

const questions = [
    "Gejala utama membaik setelah kunjungan ? ",
    "Nyeri berkurang setelah kunjungan klinik ? ",
    "Energi meningkat setelah kunjungan klinik ? ",
    "Aktivitas kembali normal setelah kunjungan ? ",
    "Efek samping pengobatan muncul ? "
];

const options = ["1", "2", "3", "4", "5"];

const QuestionnairePopup = ({ onClose }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));

    const handleAnswer = (index) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = options[index];
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            onClose();
        }
    };

    return (
        <div className="questionnaire_popup">
            <div className="questionnaire_content">
                <div className="questionnaire_header">
                    <span>{currentQuestion + 1}/{questions.length}</span>
                </div>
                <h2>{questions[currentQuestion]}</h2>
                <div className="options">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`option_container ${answers[currentQuestion] === option ? 'selected' : ''}`}
                            onClick={() => handleAnswer(index)}
                        >
                            <div className="option_circle" style={{ transform: `scale(${0.6 + index * 0.2})` }}></div>
                            <span className="option_label">{option}</span>
                        </div>
                    ))}
                </div>
                <div className="legend">
                    <p>1 = Sangat Tidak Setuju</p>
                    <p>2 = Tidak Setuju</p>
                    <p>3 = Tidak Kedua-duanya</p>
                    <p>4 = Setuju</p>
                    <p>5 = Sangat Setuju</p>
                </div>
                <button className="next_button" onClick={handleNext}>Next </button>
            </div>
        </div>
    );
};

export default QuestionnairePopup;
