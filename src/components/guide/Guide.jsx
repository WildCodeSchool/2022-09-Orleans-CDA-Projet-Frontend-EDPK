import React, { useState } from "react";
import "./Guide.scss";

const Guide = () => {
  const questions = [
    {
      questionText: "What category is giving you the vibe for tonight?",
      answerOptions: [
        { answerText: "Action", isCorrect: false },
        { answerText: "Romance", isCorrect: false },
        { answerText: "Sci-Fi", isCorrect: true },
        { answerText: "Horror", isCorrect: false },
        { answerText: "Other", isCorrect: false },
      ],
    },
    {
      questionText: "Which do you prefer?",
      answerOptions: [
        { answerText: "Latest Movies", isCorrect: false },
        { answerText: "Older Movies", isCorrect: false },
      ],
    },
    {
      questionText: "Do you want high rated movies.",
      answerOptions: [
        { answerText: "4 stars +", isCorrect: true },
        { answerText: "3 stars +", isCorrect: true },
        { answerText: "2 stars +", isCorrect: true },
        { answerText: "Whatever", isCorrect: true },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [categoryAnswer, setCategoryAnswer] = useState(0);
  const [timeAnswer, setTimeAnswer] = useState(0);
  const [ratedAnswer, setRatingAnswer] = useState(0);

  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return (
    <div className="app">
      {showScore ? (
        <div className="score-section"></div>
      ) : (
        <>
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
              <button
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Guide;
