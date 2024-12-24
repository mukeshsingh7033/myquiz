import React, { useState } from 'react';
import './App.css';

function App() {
  const question = [
    "What is the purpose of the for loop in Java?",
    "Which loop is guaranteed to execute at least once in Java?",
    "What is the syntax for the arithmetic operation of exponentiation in Java?",
    "How is the break statement used in a loop?",
    "What does the continue statement do in a loop?",
    "What will the following code output? int sum = 0; for(int i= 1; i<=5; i++){sum +=i;} System.out.println(sum);",
    "What is the purpose of the infinite loop?",
    "How is the do-while loop different from the while loop?",
    "Which loop is suitable when the number of iterations is known beforehand?",
    "How can an infinite loop be terminated in Java?",
    "What is the default value of a boolean variable in Java?",
    "Which of the following is the correct way to declare an array in Java?",
    "What is the scope of a variable declared inside a method?",
    "Which of the following is a primitive data type in Java?",
    "What is the difference between `==` and `equals()` in Java?"
  ];

  const options = [
    {
      optionvalue: [
        "To create an infinite loop",
        "To execute a block of code a specific number of times",
        "To break out of a loop",
        "To execute a block of code at least"
      ],
      correctAnswer: "To execute a block of code a specific number of times"
    },
    {
      optionvalue: [
        "for loop",
        "while loop",
        "do-while loop",
        "break loop"
      ],
      correctAnswer: "do-while loop"
    },
    {
      optionvalue: [
        "a^b",
        "a**b",
        "Math.pow(a,b)",
        "a^^b"
      ],
      correctAnswer: "Math.pow(a,b)"
    },
    {
      optionvalue: [
        "To continue to the next iteration",
        "To exit the loop prematurely",
        "To skip the loop",
        "To restart the loop"
      ],
      correctAnswer: "To exit the loop prematurely"
    },
    {
      optionvalue: [
        "skip the current iteration and move to the next one",
        "Exits the loop immediately",
        "Restarts the loop",
        "Breaks out of the loop"
      ],
      correctAnswer: "skip the current iteration and move to the next one"
    },
    {
      optionvalue: [
        "5",
        "10",
        "15",
        "25"
      ],
      correctAnswer: "15"
    },
    {
      optionvalue: [
        "To execute a block of code a specific number of times",
        "To continue executing indefinitely",
        "To exit the loop prematurely",
        "To skip the loop"
      ],
      correctAnswer: "To continue executing indefinitely"
    },
    {
      optionvalue: [
        "The do-while loop always executes at least once",
        "The while loop always executes at least once",
        "The do-while loop is used for infinite loops",
        "The while loop is not a loop construct in Java"
      ],
      correctAnswer: "The do-while loop always executes at least once"
    },
    {
      optionvalue: [
        "for loop",
        "while loop",
        "do-while loop",
        "break loop"
      ],
      correctAnswer: "for loop"
    },
    {
      optionvalue: [
        "Using the break statement",
        "Using the return statement",
        "Using the continue statement",
        "It cannot be terminated"
      ],
      correctAnswer: "Using the break statement"
    },
    {
      optionvalue: [
        "false",
        "true",
        "null",
        "undefined"
      ],
      correctAnswer: "false"
    },
    {
      optionvalue: [
        "int[] arr = new int[5];",
        "int arr[5];",
        "int arr[] = new int();",
        "arr = new int[5];"
      ],
      correctAnswer: "int[] arr = new int[5];"
    },
    {
      optionvalue: [
        "It is accessible only within the method.",
        "It is accessible globally.",
        "It is accessible in the whole class.",
        "It is accessible in the block where it is declared."
      ],
      correctAnswer: "It is accessible only within the method."
    },
    {
      optionvalue: [
        "int",
        "boolean",
        "String",
        "char"
      ],
      correctAnswer: "int"
    },
    {
      optionvalue: [
        "`==` compares object references, and `equals()` compares object contents.",
        "`==` compares object contents, and `equals()` compares object references.",
        "`==` and `equals()` are functionally the same.",
        "`==` can only be used with primitive types, while `equals()` works with objects."
      ],
      correctAnswer: "`==` compares object references, and `equals()` compares object contents."
    }
  ];

  const [counter, setCounter] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function CheckAnswer(index) {
    const selectedAnswer = options[counter].optionvalue[index];
    setUserAnswers([...userAnswers, selectedAnswer]);
    setIsAnswerCorrect(selectedAnswer === options[counter].correctAnswer);
  }

  function Change(index) {
    CheckAnswer(index);
    setDisabled(true);

    setTimeout(() => {
      if (counter < question.length - 1) {
        setCounter(counter + 1);
        setIsAnswerCorrect(null);
        setDisabled(false);
      } else {
        setShowResult(true);
      }
    }, 1000);
  }

  const totalCorrectAnswers = userAnswers.filter(
    (answer, index) => answer === options[index].correctAnswer
  ).length;

  return (
    <div className="container">
      <h1>My Quiz Application</h1>

      {showResult ? (
        <div className="result">
          <h2>Quiz Complete!</h2>
          <p>
            You answered {totalCorrectAnswers} out of {question.length} questions correctly.
          </p>
          <button onClick={() => window.location.reload()}>Restart Quiz</button>
          <h3>Answer Breakdown</h3>
          {question.map((q, idx) => (
            <div key={idx}>
              <p><strong>{q}</strong></p>
              <p>Your answer: {userAnswers[idx]}</p>
              <p>Correct answer: {options[idx].correctAnswer}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <h2>Question No: {counter + 1} / {question.length}</h2>
          <h2>{question[counter]}</h2>

          {isAnswerCorrect !== null && (
            <h3 className={isAnswerCorrect ? "correct" : "incorrect"}>
              {isAnswerCorrect ? "Correct!" : "Incorrect!"}
            </h3>
          )}

          <div id="option">
            {options[counter].optionvalue.map((x, index) => (
              <li
                key={index}
                onClick={() => !disabled && Change(index)}
                className={disabled ? (x === options[counter].correctAnswer ? 'correct' : 'incorrect') : ''}
                style={{
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
              >
                {x}
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
