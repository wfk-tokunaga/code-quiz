var startBtnEl = document.querySelector(`.start-btn`);
var timerEl = document.querySelector(`.timer`);
var introEl = document.querySelector(`.intro`);

var questionIndex = 0;


var questions = [
    {
        questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            "JavaScript",
            "terminal/bash",
            "for loops",
            "console.log"
        ],
        correctAnswerIndex: 3
    },
    {
        questionText: "String values must be enclosed within _____ when being assigned to variables.",
        answers: [
            "commas",
            "curly brackets",
            "quotes",
            "parenthesis"
        ],
        correctAnswerIndex: 3
    },
    {
        questionText: "Arrays in JavaScript can be used to store _____.",
        answers: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        correctAnswerIndex: 3
    },
    {
        questionText: "Commonly used data types DO Not include:",
        answers: [
            "strings",
            "booleans",
            "alerts",
            "numbers"
        ],
        correctAnswerIndex: 2
    },
    {
        questionText: "The condition in an if / else statement is enclosed with _____.",
        answers: [
            "quotes",
            "curly brackets",
            "parenthesis",
            "square brackets"
        ],
        correctAnswerIndex: 2
    }
]


// Hidden question element that will be appended to screen when quiz is started
// Don't need to remake these elements each time, just need to change them
var questionEl = document.createElement('div');
questionEl.className = `question`;
var questionTextEl = document.createElement(`h1`);
questionEl.appendChild(questionTextEl);
// set up question buttons
var answer1El = document.createElement(`button`);
answer1El.className = "btn";
answer1El.setAttribute("data-answer-number", 0);
questionEl.appendChild(answer1El);
var answer2El = document.createElement(`button`);
answer2El.className = "btn";
answer2El.setAttribute("data-answer-number", 1);
questionEl.appendChild(answer2El);
var answer3El = document.createElement(`button`);
answer3El.className = "btn";
answer3El.setAttribute("data-answer-number", 2);
questionEl.appendChild(answer3El);
var answer4El = document.createElement(`button`);
answer4El.className = "btn";
answer4El.setAttribute("data-answer-number", 3);
questionEl.appendChild(answer4El);
var resultEl = document.createElement(`div`);
resultEl.className = "result";
var resultHrEl = document.createElement(`hr`);
var resultTextEl = document.createElement(`h3`);
resultEl.appendChild(resultHrEl);
resultEl.appendChild(resultTextEl);

var score = 0;
var time = 75; //How long each quiz is
var penaltyTime = 5; // How much time is taken off for an incorrect answer

// function that starts the quiz, sets counters to 0, starts the timer
var startQuiz = function () {
    // Set initial paramets
    score = 0;
    time = 75;

    // Start timer
    var timerIntervalID = setInterval(() => {
        time--;
        timerEl.textContent = `Time: ${time} `;
        if (questionIndex === questions.length) {
            // If user has answered all questions
            console.log("Quiz finished!");
            endQuiz();
            clearInterval(timerIntervalID);
        }
        else if (time === 0) {
            console.log("Time over!");
            endQuiz();
            clearInterval(timerIntervalID);
        }
    }, 1000);
    //show new question

    // Hide the intro
    introEl.remove();

    document.body.appendChild(questionEl);
    updateQuestion();
}


// Change text and answers of question to next in questions array
var updateQuestion = function () {
    questionTextEl.textContent = questions[questionIndex].questionText;
    answer1El.textContent = `1. ${questions[questionIndex].answers[0]}`;
    answer2El.textContent = `2. ${questions[questionIndex].answers[1]}`;
    answer3El.textContent = `3. ${questions[questionIndex].answers[2]}`;
    answer4El.textContent = `4. ${questions[questionIndex].answers[3]}`;
}

var checkAnswer = function (event) {
    if (event.target.matches('.btn')) {
        var selectedAnswerNumber = JSON.parse(event.target.getAttribute("data-answer-number"));
        var correctAnswerNumber = questions[questionIndex].correctAnswerIndex;

        if (selectedAnswerNumber === correctAnswerNumber) {
            score++;
            resultTextEl.textContent = "Correct!";
        } else {
            score--;
            resultTextEl.textContent = "Incorrect!";
            time -= penaltyTime;
        }
        console.log(`Current score: ${score}`);
        questionEl.appendChild(resultEl);
        questionIndex++;

        if (questionIndex === questions.length) {
            return;
        } else {
            updateQuestion();
        }
    }
}

var endQuiz = function () {
    // If the conditions have been met, we'll change the elements on screen
    questionEl.remove();

    //Show elements of end game screen
    var quizEndEl = document.createElement('div');
    quizEndEl.innerHTML = `<h1>All done!</h1><p>Your final score is ${score}</p>`;
    quizEndEl.className = 'end-screen';

    var initialsInputEl = document.createElement('div');
    initialsInputEl.className = "initialsInput";

    initialsFormEl.innerHTML = `<span>Enter initials: </span><button class="btn submit-btn">Submit</button>`;
    var initialsInputEl = document.createElement('input');
    initialsInputEl.className = "initials-input";

    quizEndEl.appendChild(initialsFormEl);
    document.body.appendChild(quizEndEl);
}

startBtnEl.addEventListener(`click`, startQuiz);
// Is there a better way to do this? I know I wanna propogate
questionEl.addEventListener(`click`, checkAnswer);