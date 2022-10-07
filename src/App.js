import React, { useState, useEffect } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

function App() {
  const [idx, setIdx] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=50`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setQuestions(response.results);
        setQuestionData(response.results[idx]);
        console.log(response.results);
      });
  }, []);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState({});

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  return (
    <div className="w-100 my-5 d-flex justify-content-center align-items-center">
      {!questionData ? (
        <div>Loading...</div>
      ) : (
        <div style={{ maxWidth: "45%" }}>
          <h1 className="text-center">Trivia App</h1>
          <button
            onClick={() => {
              setSelectedAnswer(null);
              setIdx((prev) => {
                setQuestionData(questions[prev + 1]);
                return prev + (1 % 50);
              });
            }}
            className="btn btn-success"
          >
            Next Question
          </button>
          {selectedAnswer ? (
            <ResultCard
              correct={selectedAnswer === questionData.correct_answer}
              answer={questionData.correct_answer}
            />
          ) : (
            <QuestionCard
              question={questionData.question}
              options={shuffleArray(questionData)}
              selectAnswer={selectAnswer}
            />
          )}
        </div>
      )}{" "}
    </div>
  );
}

export default App;
