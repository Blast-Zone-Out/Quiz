import React, { useState, useRef, useEffect } from 'react'; 
import './Quiz.css';
import { data } from '../../assets/data'; 

const Quiz = () => {
  // State to hold the shuffled questions
  let [shuffledData, setShuffledData] = useState([]);
  
  // State for tracking the current question index
  let [index, setIndex] = useState(0);

  // State to track the user's score
  let [score, setScore] = useState(0);

  // State to lock the options once an answer is selected
  let [lock, setLock] = useState(false);

  // State to determine if the quiz is complete
  let [result, setResult] = useState(false);

  // Refs for each option
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  // Array of option refs
  let option_array = [Option1, Option2, Option3, Option4];

  // Function to shuffle and pick 5 random questions
  useEffect(() => {
    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 5); // Shuffle and select 5 questions
    setShuffledData(shuffled);
  }, []);

  // Function to check the selected answer
  const checkAns = (e, ans) => {
    if (!lock && shuffledData.length) {
      if (shuffledData[index].ans === ans) {
        e.target.classList.add("correct");
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[shuffledData[index].ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  // Function for next question
  const next = () => {
    if (lock && index < shuffledData.length - 1) {
      setIndex(prev => prev + 1);
      setLock(false);
      option_array.forEach(option => {
        option.current.classList.remove("wrong", "correct");
      });
    } else if (index === shuffledData.length - 1) {
      setResult(true);
    }
  };

  // Function for reset quiz
  const reset = () => {
    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 5); // Reshuffle for new questions
    setShuffledData(shuffled);
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    option_array.forEach(option => {
      option.current.classList.remove("wrong", "correct");
    });
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>You Scored {score} out of {shuffledData.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : shuffledData.length ? (
        <>
          <h2>{index + 1}. {shuffledData[index].question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{shuffledData[index].option1}</li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{shuffledData[index].option2}</li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{shuffledData[index].option3}</li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{shuffledData[index].option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{index + 1} of {shuffledData.length} questions</div>
        </>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;