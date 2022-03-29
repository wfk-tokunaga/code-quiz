var startBtnEl = document.querySelector(`.start-btn`);
var timerEl = document.querySelector(`.timer`);
var introEl = document.querySelector(`.intro`);

var questionIndex = 0;

var questions = [
    {
        questionText: "A very useful tool used during development and debugging for printint content to the debugger is:",
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

var score = 0;
var time = 10; //How long each quiz is
var timeElapsed = 0;

// function that starts the quiz, sets counters to 0, starts the timer
var startQuiz = function () {
    score = 0;
    time = 10;

    // Start timer
    var timerIntervalID = setInterval(() => {
        time--;
        timerEl.textContent = `Time: ${time} `;
        if (questionIndex === questions.length - 1) {
            // If user has answered all questions
            console.log("Quiz finished!");
            clearInterval(timerIntervalID);
        }
        else if (timeElapsed === time) {
            console.log("Time over!");
            clearInterval(timerIntervalID);
        }
    }, 1000);
    //show new question

    // Hide the intro
    introEl.remove();

    document.body.appendChild(questionEl);
    updateQuestion();
}

var updateQuestion = function () {
    // console.log(questions[0]);
    questionTextEl.textContent = questions[questionIndex].questionText;
    answer1El.textContent = `1. ${questions[questionIndex].answers[0]}`;
    answer2El.textContent = `2. ${questions[questionIndex].answers[1]}`;
    answer3El.textContent = `3. ${questions[questionIndex].answers[2]}`;
    answer4El.textContent = `4. ${questions[questionIndex].answers[3]}`;
}

var checkAnswer = function (event) {
    var selectedAnswer = event.target;
    console.log(`selected answer number: ${selectedAnswer.getAttribute("data-answer-number")}`);
    console.log(questionIndex);
    // Check to see the answer

    questionIndex++;
    updateQuestion();
}

startBtnEl.addEventListener(`click`, startQuiz);
// Is there a better way to do this? I know I wanna propogate
questionEl.addEventListener(`click`, checkAnswer);