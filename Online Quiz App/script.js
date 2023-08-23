const quizData = [
    // Your quiz questions and answers here
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correctAnswer: "Paris"
      },
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
      },
      {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: "H2O"
      },
      {
        question: "What is the largest mammal on Earth?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Lion"],
        correctAnswer: "Blue Whale"
      },
      {
        question: "Which country is famous for the Taj Mahal?",
        options: ["India", "Egypt", "China", "Italy"],
        correctAnswer: "India"
      },
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
      },
      {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Venus", "Mars", "Jupiter", "Mercury"],
        correctAnswer: "Mars"
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci"
      }
  ];
  
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const resultElement = document.getElementById("result");
  const submitBtn = document.getElementById("submit-btn");
  const timerElement = document.getElementById("timer");
  const progressBar = document.getElementById("progress-bar");
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 10; // Set the time for each question (in seconds)
  const maxTime = timeLeft;
  
  function loadQuestion() {
    resetTimer();
    const questionData = quizData[currentQuestion];
    questionElement.textContent = questionData.question;
    optionsElement.innerHTML = "";
  
    questionData.options.forEach(option => {
      const optionElement = document.createElement("button");
      optionElement.textContent = option;
      optionElement.addEventListener("click", () => checkAnswer(option));
      optionsElement.appendChild(optionElement);
    });
  
    updateProgressBar();
  }
  
  function checkAnswer(selectedOption) {
    clearInterval(timer);
  
    const correctAnswer = quizData[currentQuestion].correctAnswer;
    if (selectedOption === correctAnswer) {
      score++;
    }
  
    currentQuestion++;
  
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    questionElement.textContent = "";
    optionsElement.innerHTML = "";
    resultElement.textContent = `Your score: ${score} out of ${quizData.length}`;
    timerElement.textContent = "";
    progressBar.style.width = "100%";
  }
  
  function startTimer() {
    timeLeft = maxTime;
    updateTimer();
  
    timer = setInterval(() => {
      timeLeft--;
      updateTimer();
      updateProgressBar();
  
      if (timeLeft === 0) {
        clearInterval(timer);
        checkAnswer(null);
      }
    }, 1000);
  }
  
  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }
  
  function updateTimer() {
    timerElement.textContent = `Time Left: ${timeLeft} seconds`;
  }
  
  function updateProgressBar() {
    const progressPercentage = ((maxTime - timeLeft) / maxTime) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }
  
  submitBtn.addEventListener("click", () => checkAnswer(null));
  loadQuestion();
  
