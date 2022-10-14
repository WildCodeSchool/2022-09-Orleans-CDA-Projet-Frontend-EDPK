import "./Quiz.scss";
import { useEffect, useState, useRef } from "react";
import useSize from "../../hooks/useSize";
import axios from "axios";

const Quiz = () => {
  const targetFront = useRef(null);
  const sizeFront = useSize(targetFront);
  const [displayRules, setDisplayRules] = useState(true);
  const [start, setStart] = useState(false);
  const [rounds, setRounds] = useState(3);
  const [count, setCount] = useState(0);
  const [mediaId, setMediaId] = useState("");
  const [apiData, setApiData] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState({});
  const [answerPosition, setAnswerPosition] = useState("");
  const [displayGame, setDisplayGame] = useState(false);
  const [answerClicked, setAnswerClicked] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [isLastRound, setIsLastRound] = useState(false);
  const [seeResults, setSeeResults] = useState(false);
  const [score, setScore] = useState([]);
  const [displayScore, setDisplayScore] = useState(false);
  const randPage = () => Math.floor(Math.random() * 49 + 1);
  const randResult = () => Math.floor(Math.random() * 19);
  const sentences = {
    date: {
      first: "When was released ",
      last: " ?",
    },
  };

  useEffect(() => {
    console.log("sizeFront =", sizeFront?.height);
    console.log(
      "backHeight =",
      document?.getElementsByClassName("quiz_back")[0]?.style?.height
    );
    console.log(
      !!document?.getElementsByClassName("quiz_back")[0]?.style?.height &&
        sizeFront?.height
    );

    if (
      document?.getElementsByClassName("quiz_back")[0]?.style?.height &&
      sizeFront?.height
    ) {
      if (
        document.getElementsByClassName("quiz_back")[0].style.height !==
        sizeFront.height + "px"
      ) {
        console.log("sizeFront = ", sizeFront);
        document.getElementsByClassName("quiz_back")[0].style.height =
          sizeFront.height + "px";
      }
    }
  }, [sizeFront]);

  useEffect(() => {
    if (start) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${randPage()}&with_watch_monetization_types=flatrate
        `
        )
        .then((res) => res.data)
        .then((data) => {
          setMediaId(data.results[randResult()].id);
          setStart(false);
        });
    }
  }, [start]);

  useEffect(() => {
    if (mediaId) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${mediaId}?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        )
        .then((res) => res.data)
        .then((data) => {
          setApiData(data);
          setQuestion(
            `${sentences.date.first}"${data.title}"${sentences.date.last}`
          );
        });
    }
  }, [mediaId]);

  useEffect(() => {
    if (apiData) {
      const parsedDate = parseInt(apiData.release_date.slice(0, 4));
      const currentYear = new Date().getFullYear();
      setAnswer(parsedDate);

      if (parsedDate === currentYear) {
        setAnswerPosition(4);
      } else {
        setAnswerPosition(Math.floor(Math.random() * 4 + 1));
      }
    }
  }, [apiData]);

  useEffect(() => {
    if (answerPosition) {
      switch (answerPosition) {
        case 1:
          setAnswers({
            rightAnswer: "a",
            a: answer,
            b: answer + 1,
            c: answer + 2,
            d: answer + 3,
          });
          break;
        case 2:
          setAnswers({
            rightAnswer: "b",
            a: answer - 1,
            b: answer,
            c: answer + 1,
            d: answer + 2,
          });
          break;
        case 3:
          setAnswers({
            rightAnswer: "c",
            a: answer - 2,
            b: answer - 1,
            c: answer,
            d: answer + 1,
          });
          break;
        case 4:
          setAnswers({
            rightAnswer: "d",
            a: answer - 3,
            b: answer - 2,
            c: answer - 1,
            d: answer,
          });
          break;
        default:
          break;
      }
    }
  }, [answerPosition, answer]);

  useEffect(() => {
    if (Object.entries(answers).length) {
      setDisplayGame(true);
    }
  }, [answers]);

  const addToScore = (chosenAnswer) => {
    setScore((prev) => [
      ...prev,
      {
        question: question,
        answers: {
          a: answers.a,
          b: answers.b,
          c: answers.c,
          d: answers.d,
        },
        rightAnswer: answers.rightAnswer,
        chosenAnswer: chosenAnswer,
        point: answers.rightAnswer === chosenAnswer ? 1 : 0,
      },
    ]);
  };

  const handleAnswer = (e) => {
    if (!answerClicked) {
      setAnswerClicked(true);

      if (e.currentTarget.id === answers.rightAnswer) {
        e.currentTarget.style.backgroundColor = "green";
      } else {
        e.currentTarget.style.animation = "blinkingWrong 0.5s";
        e.currentTarget.style.backgroundColor = "red";
        if (answers.rightAnswer)
          document.getElementById(answers.rightAnswer).style.backgroundColor =
            "green";
      }
      addToScore(e.currentTarget.id);

      if (isLastRound) {
        setSeeResults(true);
      } else {
        setNextQuestion(true);
      }
    }
  };

  const handleNextQuestion = () => {
    if (displayRules === true) setDisplayRules(false);
    if (displayGame === false) setDisplayGame(true);
    if (displayScore === true) setDisplayScore(false);
    if (isLastRound === true) setIsLastRound(false);

    setStart(true);
    setNextQuestion(false);
    setAnswerClicked(false);

    setCount((prev) => prev + 1);
    if (count === rounds - 1) setIsLastRound(true);

    const quizButtons = document.getElementsByClassName("quiz_answer");
    for (const elem of quizButtons) {
      elem.style.backgroundColor = "#d9d9d9";
      elem.style.animation = "none";
    }
  };

  const handleRounds = (e) => {
    const quizRounds = document.getElementsByClassName("quiz_round");
    switch (e.target.id) {
      case "rounds_3":
        setRounds(3);
        for (const elem of quizRounds) elem.style.backgroundColor = "#d9d9d9";
        e.target.style.backgroundColor = "green";
        break;
      case "rounds_5":
        setRounds(5);
        for (const elem of quizRounds) elem.style.backgroundColor = "#d9d9d9";
        e.target.style.backgroundColor = "green";
        break;
      case "rounds_10":
        setRounds(10);
        for (const elem of quizRounds) elem.style.backgroundColor = "#d9d9d9";
        e.target.style.backgroundColor = "green";
        break;
      default:
        setRounds(10);
        break;
    }
  };

  const handleSeeResults = () => {
    setSeeResults(false);
    setDisplayGame(false);
    setDisplayScore(true);
  };

  const handleBackToRules = () => {
    setCount(0);
    setScore([]);
    setDisplayRules(true);
    setDisplayGame(false);
    setDisplayScore(false);
  };

  const handlePlayAgain = () => {
    setCount(0);
    setScore([]);
    handleNextQuestion();
  };

  return (
    <>
      <div className="quiz_back" style={{ height: "80vh" }}>
        <div
          className="quiz_background"
          style={
            displayGame && apiData.backdrop_path
              ? {
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${apiData.backdrop_path})`,
                }
              : null
          }
        ></div>
      </div>
      <div className="quiz_front" ref={targetFront}>
        {displayRules && (
          <>
            <div className="quiz_title">Quiz</div>
            <div className="quiz_rounds">
              <div
                id="rounds_3"
                className="quiz_round quiz_round_selected"
                onClick={handleRounds}
              >
                3 rounds
              </div>
              <div id="rounds_5" className="quiz_round" onClick={handleRounds}>
                5 rounds
              </div>
              <div id="rounds_10" className="quiz_round" onClick={handleRounds}>
                10 rounds
              </div>
            </div>
            <div className="quiz_start" onClick={handleNextQuestion}>
              Let's start !
            </div>
          </>
        )}
        {displayGame && (
          <>
            <div className="quiz_counter">
              {count} / {rounds}
            </div>
            <img
              className="quiz_image"
              src={`https://image.tmdb.org/t/p/w500${
                apiData.poster_path ? apiData.poster_path : null
              }`}
            />
            <div className="quiz_q&a">
              <div className="quiz_question">{question ? question : "???"}</div>
              <div className="quiz_answers">
                <div id="a" className="quiz_answer" onClick={handleAnswer}>
                  <img
                    className="quiz_answer_letter"
                    src="/src/assets/answer_a.svg"
                  />
                  <div className="quiz_answer_text">
                    {answers.a ? answers.a : "???"}
                  </div>
                </div>
                <div id="b" className="quiz_answer" onClick={handleAnswer}>
                  <img
                    className="quiz_answer_letter"
                    src="/src/assets/answer_b.svg"
                  />
                  <div className="quiz_answer_text">
                    {answers.b ? answers.b : "???"}
                  </div>
                </div>
              </div>
              <div className="quiz_answers">
                <div id="c" className="quiz_answer" onClick={handleAnswer}>
                  <img
                    className="quiz_answer_letter"
                    src="/src/assets/answer_c.svg"
                  />
                  <div className="quiz_answer_text">
                    {answers.c ? answers.c : "???"}
                  </div>
                </div>
                <div id="d" className="quiz_answer" onClick={handleAnswer}>
                  <img
                    className="quiz_answer_letter"
                    src="/src/assets/answer_d.svg"
                  />
                  <div className="quiz_answer_text">
                    {answers.d ? answers.d : "???"}
                  </div>
                </div>
              </div>
            </div>
            {nextQuestion && (
              <div className="quiz_next" onClick={handleNextQuestion}>
                Next question ➡️
              </div>
            )}
            {seeResults && (
              <div className="quiz_next" onClick={handleSeeResults}>
                See results
              </div>
            )}
          </>
        )}
        {displayScore && (
          <>
            <div className="quiz_score_title">Score board</div>
            <div className="quiz_score_title">
              {score.length &&
                score
                  .map((elem) => elem.point)
                  .reduce((prev, curr) => prev + curr)}
              / {rounds}
            </div>
            {score.map((elem, index) => (
              <div
                key={index}
                className="quiz_score_result"
                style={
                  elem.point === 1
                    ? { backgroundColor: "#00800052" }
                    : { backgroundColor: "#ff000066" }
                }
              >
                <div className="quiz_score_number">{index + 1}</div>
                <div className="quiz_score_content">
                  <div className="quiz_score_question">{elem.question}</div>
                  <div className="quiz_score_answers">
                    {Object.keys(elem.answers).map((key) => (
                      <div
                        key={key}
                        className="quiz_score_answer"
                        style={
                          elem.rightAnswer === key
                            ? { backgroundColor: "green" }
                            : elem.chosenAnswer === key
                            ? { backgroundColor: "red" }
                            : null
                        }
                      >
                        <img
                          className="quiz_score_answer_letter"
                          src={`/src/assets/answer_${key}.svg`}
                        />
                        <div className="quiz_score_answer_text">
                          {elem.answers[key]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="quiz_score_after">
              <div className="quiz_score_back" onClick={handleBackToRules}>
                Back to rules
              </div>
              <div className="quiz_score_again" onClick={handlePlayAgain}>
                Play again
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
