import { useState, useEffect } from "react";
import "./Guide.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const Guide = () => {
  const questions = [
    {
      questionText: "What category is giving you the vibe for tonight?",
      answerOptions: [
        { answerText: "Action", id: 28 },
        { answerText: "Romance", id: 10749 },
        { answerText: "Science Fiction", id: 878 },
        { answerText: "Horror", id: 27 },
      ],
    },
    {
      questionText: "Which do you prefer?",
      answerOptions: [
        { answerText: "The Latest Movies", id: 1 },
        { answerText: "Older Movies", id: 2 },
      ],
    },
    {
      questionText: "What's the minimum rating you'd prefer?",
      answerOptions: [
        { answerText: 8, id: 8 },
        { answerText: 6, id: 6 },
        { answerText: 4, id: 4 },
      ],
    },
  ];
  const apiKey = import.meta.env.VITE_API_KEY;
  const url_trending = "https://api.themoviedb.org/3/trending/all/day?api_key=";
  const [trending, setTrending] = useState([]);

  async function getTrending(signal) {
    const response = await axios
      .get(url_trending + apiKey, signal)
      .then((res) => res.data);
    const trends = response.results;
    setTrending(trends);
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    getTrending(opts);
    return () => abortCtrl.abort();
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [guideAnswers, setGuideAnswers] = useState([]);
  const date = new Date();
  const year = date.getFullYear() - 3;
  const categoryAnswer = guideAnswers[0];
  const latestAnswer = guideAnswers[1];
  const ratingAnswer = guideAnswers[2];
  const [isFiltered, setIsFiltered] = useState(false);

  const toggleQuestion = (e) => {
    if (!guideAnswers.includes(e.target.value))
      setGuideAnswers([...guideAnswers, e.target.value]);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setIsFiltered(true);
    }
  };

  useEffect(() => {
    let filteredMovies = trending;
    if (categoryAnswer) {
      filteredMovies = trending.filter((movie) => {
        return movie.genre_ids.includes(parseInt(categoryAnswer));
      });
    }
    if (latestAnswer && latestAnswer == 1) {
      filteredMovies = trending.filter((movie) => {
        return new Date(movie.release_date) > new Date(year);
      });
    } else if (latestAnswer && latestAnswer == 2) {
      filteredMovies = trending.filter((movie) => {
        return new Date(movie.release_date) < new Date(year);
      });
    }
    if (ratingAnswer) {
      filteredMovies = trending.filter((movie) => {
        return movie.vote_average > ratingAnswer;
      });
    }
    setTrending(filteredMovies);
  }, [guideAnswers]);

  return (
    <div className="app">
      {isFiltered ? (
        <div className="movieList">
          <button
            className="return"
            onClick={() => {
              setCurrentQuestion(0);
              setIsFiltered(false);
              setGuideAnswers([]);
              getTrending();
            }}
          >
            <img src="public/images/return.png"></img>
          </button>
          <h2 className="title mb-3">For You !</h2>
          <div className="board">
            {trending.length > 0
              ? trending.map((movie) => (
                  <div key={movie.id} className="flex p-2">
                    <div className="rounded-lg  max-w-sm">
                      <Link to={`/movie/${movie.id}`}>
                        <img
                          className="rounded-t-lg"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.original_title}
                        />
                      </Link>

                      <div className="pt-2">
                        <h3 className="text-xl font-medium mb-2">
                          {movie.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))
              : "Sorry, no movie for you for the moment! :'("}
          </div>
        </div>
      ) : (
        <>
          <div>
            <button
              className="return"
              onClick={() => {
                setCurrentQuestion(0);
                setIsFiltered(false);
                setGuideAnswers([]);
                getTrending();
              }}
            >
              <img src="public/images/return.png"></img>
            </button>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answerOption) => (
              <button
                key={answerOption.id}
                value={answerOption.id}
                onClick={toggleQuestion}
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
