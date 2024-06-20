import React, { useState } from 'react';
import './QuestionnairePopup.css';

const questions = [
    "Pertanyaan 1",
    "Pertanyaan 2",
    "Pertanyaan 3",
    "Pertanyaan 4",
    "Pertanyaan 5"
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
                <h2>{questions[currentQuestion]}</h2>
                <div className="options">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`option_container ${answers[currentQuestion] === option ? 'selected' : ''}`}
                            onClick={() => handleAnswer(index)}
                        >
                            <div className="option_circle"></div>
                            <span>{option}</span>
                        </div>
                    ))}
                </div>
                <button className="next_button" onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default QuestionnairePopup;
