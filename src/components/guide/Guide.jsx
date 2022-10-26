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
      answerOptions: [{ answerText: 4 }, { answerText: 3 }, { answerText: 2 }],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [guideAnswers, setGuideAnswers] = useState([]);
  const categoryAnswer = guideAnswers[0];
  const latestAnswer = guideAnswers[1];
  const ratingAnswer = guideAnswers[2];
  const [filteredList, setFilteredList] = useState(false);

  const toggleQuestion = (e) => {
    if (!guideAnswers.includes(e.target.value))
      setGuideAnswers([...guideAnswers, e.target.value]);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setFilteredList(true);
    }
  };

  //useEffect(() => { }, [guideAnswers]); setFilteredList(trending ?.filter((t) => t.genre === { categoryAnswer } && t.release_date > { latestAnswer } &&t.vote_average > { ratingAnswer } )
     // .slice(0, 10)
  //);
  
  return (
    <div className="app">
      {filteredList ? (
        <div className="movieList mt-5">
        <h2 className="mb-3">For You!</h2>
        <div className="board">
          {tv.map((t) => (
            <div key={t.id} className="flex p-2">
              <div className="rounded-lg  max-w-sm">
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src={`https://image.tmdb.org/t/p/w500${t.poster_path}`}
                    alt={t.original_title}
                  />
                </a>
                <div className="pt-2">
                  <h3 className="text-xl font-medium mb-2">{t.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
              <button value={answerOption.answerText} onClick={toggleQuestion}>
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
