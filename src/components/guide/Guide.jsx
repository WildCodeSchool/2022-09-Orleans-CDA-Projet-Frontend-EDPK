import React, { useState, useEffect } from "react";
import "./Guide.scss";

const Guide = () => {
  const questions = [
    {
      questionText: "What category is giving you the vibe for tonight?",
      answerOptions: [
        { answerText: "Action" },
        { answerText: "Romance" },
        { answerText: "Sci-Fi" },
        { answerText: "Horror" },
        { answerText: "Other" },
      ],
    },
    {
      questionText: "Which do you prefer?",
      answerOptions: [
        { answerText: "Latest Movies" },
        { answerText: "Older Movies" },
      ],
    },
    {
      questionText: "Do you want high rated movies.",
      answerOptions: [
        { answerText: "4 stars +" },
        { answerText: "3 stars +" },
        { answerText: "2 stars +" },
        { answerText: "Whatever" },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [guideAnswers, setGuideAnswers] = useState([]);

  const toggleQuestion = (e) => {
    if (!guideAnswers.includes(e.target.value))
      setGuideAnswers([...guideAnswers, e.target.value]);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };

  useEffect(() => {
    console.log(guideAnswers);
  }, [guideAnswers]);
  return (
    <div className="app">
      <div className="question-section">
        <div className="question-count">
          <span>Question {currentQuestion + 1}</span>/{questions.length}
        </div>
        <div className="question-text">
          {questions[currentQuestion].questionText}
        </div>
      </div>
      <div className="answer-section">
        {questions[currentQuestion].answerOptions.map((answerOption) => (
          <button value={answerOption.answerText} onClick={toggleQuestion}>
            {answerOption.answerText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Guide;
