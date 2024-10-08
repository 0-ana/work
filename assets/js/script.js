// Get the question display element
const questionDisplay = document.getElementById("question-display");

// Get the progress display element
const progressDisplay = document.getElementById("progress-display");

// Get all choice container elements
const choices = document.querySelectorAll(".choice-container");

// Get the score display element
const scoreDisplay = document.getElementById("score-display");

// Game-related variables
let currentQuestionIndex = 0;
let currentScore = 0;
let remainingQuestions = []; // Array to hold remaining questions
let activeQuestion = {};
let acceptingUserAnswers = false;
let timer; // Timer variable
const TIME_LIMIT = 15; // Time limit for each question in seconds

// The actual question array
let quizQuestions = [
    {
        question: 'How long is an Olympic swimming pool (in meters)?',
        option1: '40',
        option2: '45',
        option3: '50',
        option4: '55',
        answer: 3
    },
    {
        question: 'What is "cynophobia"?',
        option1: 'Fear of dogs',
        option2: 'Fear of cats',
        option3: 'Fear of heights',
        option4: 'Fear of crowds',
        answer: 1
    },
    {
        question: 'What is the name of the World largest ocean?',
        option1: 'Atlantic Ocean',
        option2: 'Indian Ocean',
        option3: 'Pacific Ocean',
        option4: 'Arctic Ocean',
        answer: 3
    },
    {
        question: 'How many colors are there in the rainbow?',
        option1: 'Five',
        option2: 'Six',
        option3: 'Seven',
        option4: 'Eight',
        answer: 3
    },
    {
        question: 'Which country is the smallest in the world?',
        option1: 'Tuvalu',
        option2: 'Nauru',
        option3: 'Monaco',
        option4: 'Vatican City',
        answer: 4
    },
    {
        question: 'Area 51 is located in which U S state?',
        option1: 'Oregon',
        option2: 'Idaho',
        option3: 'Utah',
        option4: 'Nevada',
        answer: 4
    },
    {
        question: 'What country touches the Indian Ocean, the Arabian Sea, and the Bay of Bengal?',
        option1: 'Bangladesh',
        option2: 'India',
        option3: 'Sri Lanka',
        option4: 'Maldives',
        answer: 2
    },
    {
        question: 'What country has the most natural lakes?',
        option1: 'Canada',
        option2: 'Finland',
        option3: 'Switzerland',
        option4: 'Russia',
        answer: 1
    },
    {
        question: 'How many hearts does an octopus have?',
        option1: 'Two',
        option2: 'Three',
        option3: 'Four',
        option4: 'Five',
        answer: 2
    },
    {
        question: 'How many legs does a spider have?',
        option1: 'Four',
        option2: 'Six',
        option3: 'Eight',
        option4: 'Ten',
        answer: 3
    },
    {
        question: 'What is the largest planet in the solar system?',
        option1: 'Saturn',
        option2: 'Venus',
        option3: 'Jupiter',
        option4: 'Neptune',
        answer: 3
    },
    {
        question: 'What is the fastest land animal?',
        option1: 'Quarter Horse',
        option2: 'Pronghorn',
        option3: 'Springbok',
        option4: 'Cheetah',
        answer: 4
    },
    {
        question: 'Who painted the Mona Lisa?',
        option1: 'Vincent van Gogh',
        option2: 'Claude Monet',
        option3: 'Leonardo da Vinci',
        option4: 'Pablo Picasso',
        answer: 3
    },
    {
        question: 'What nut is in the middle of a Ferrero Rocher?',
        option1: 'Hazelnut',
        option2: 'Almond',
        option3: 'Walnut',
        option4: 'Peanut',
        answer: 1
    },
    {
        question: 'How many rings does olympics logo have?',
        option1: 'Four',
        option2: 'Five',
        option3: 'Six',
        option4: 'Seven',
        answer: 2
    },
    {
        question: 'How many elements are there in the periodic table?',
        option1: '104',
        option2: '108',
        option3: '114',
        option4: '118',
        answer: 4
    },
    {
        question: 'Zagreb is the capital city of which country?',
        option1: 'Croatia',
        option2: 'Bosnia and Herzegovina',
        option3: 'Serbia',
        option4: 'Slovenia',
        answer: 1
    },
    {
        question: 'What year did the Berlin Wall fall?',
        option1: '1986',
        option2: '1987',
        option3: '1988',
        option4: '1989',
        answer: 4
    },
    {
        question: 'What is the largest organ in the human body?',
        option1: 'Skin',
        option2: 'Lungs',
        option3: 'liver',
        option4: 'Heart',
        answer: 1
    },
    {
        question: 'In what year did the Titanic sink?',
        option1: '1912',
        option2: '1913',
        option3: '1914',
        option4: '1915',
        answer: 1
    },
];

// Constants
const MAX_QUESTIONS = 5; // Maximum number of questions in the quiz
const SCORE_INCREMENT = 10; // Points awarded for a correct answer

function initializeQuiz() {
    console.log("Initializing quiz..."); // Debug log
    currentQuestionIndex = 0;
    currentScore = 0;
    scoreDisplay.innerText = currentScore; // Initialize score display
    remainingQuestions = [...quizQuestions]; // Use the correct question array name
    loadNextQuestion();
}

function loadNextQuestion() {
    console.log("Loading next question..."); // Debug log
    // Check if there are remaining questions or max questions reached
    if (remainingQuestions.length === 0 || currentQuestionIndex >= MAX_QUESTIONS) {
        alert("Quiz Over! Your score is: " + currentScore);
        return; // Stop the quiz for now
    }

    currentQuestionIndex++;

    // Randomly pick a question from remaining questions
    const randomQuestionIndex = Math.floor(Math.random() * remainingQuestions.length);
    activeQuestion = remainingQuestions[randomQuestionIndex];

    // Display the question text
    questionDisplay.innerText = activeQuestion.question;

    // Display the possible answers
    choices.forEach(option => {
        const optionNumber = option.dataset.number;
        option.querySelector(".choice-text").innerText = activeQuestion["option" + optionNumber];
        option.classList.remove("correct", "incorrect"); // Reset classes for new question
    });

    // Remove the displayed question from the remaining pool
    remainingQuestions.splice(randomQuestionIndex, 1);
    acceptingUserAnswers = true;

    // Update progress on the UI
    progressDisplay.innerText = `${currentQuestionIndex}/${MAX_QUESTIONS}`;

    // Start timer for the current question
    startTimer();
}

function startTimer() {
    let timeLeft = TIME_LIMIT;
    const timerDisplay = document.getElementById("timer-display");
    
    timerDisplay.innerText = `Time left: ${timeLeft}s`;
    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    acceptingUserAnswers = false;
    loadNextQuestion();
}

choices.forEach(option => {
    option.addEventListener("click", event => {
        if (!acceptingUserAnswers) return;

        acceptingUserAnswers = false;
        clearInterval(timer); // Stop the timer when an answer is chosen
        const chosenOption = event.currentTarget;
        const chosenAnswer = chosenOption.dataset.number;

        // Determine if the chosen answer is correct or incorrect
        const resultClass = chosenAnswer == activeQuestion.answer ? "correct" : "incorrect";

        // Update the score if the answer is correct
        if (resultClass === "correct") {
            updatePlayerScore(SCORE_INCREMENT);
        }

        // Add class to indicate the chosen option result
        chosenOption.classList.add(resultClass);

        // Highlight the correct answer if the chosen answer is incorrect
        if (resultClass === "incorrect") {
            highlightCorrectAnswer();
        }

        // Delay before loading the next question
        setTimeout(() => {
            loadNextQuestion();
        }, 1000);
    });
});

function highlightCorrectAnswer() {
    const correctOptionIndex = activeQuestion.answer;
    const correctOption = [...choices].find(option => option.dataset.number == correctOptionIndex);
    correctOption.classList.add("correct"); // Highlight correct answer
}

function updatePlayerScore(points) {
    currentScore += points;
    scoreDisplay.innerText = currentScore;
}

// Start the quiz
initializeQuiz();