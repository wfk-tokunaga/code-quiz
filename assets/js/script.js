// var startBtnEl = document.querySelector(`.start-btn`);
var timerEl = document.querySelector(`.timer`);
// var introEl = document.querySelector(`.intro`);

var highScores = [];

var score = 0;
var time = 75; //How long each quiz is
var penaltyTime = 5; // How much time is taken off for an incorrect answer

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
answer1El.className = "btn answer-btn";
answer1El.setAttribute("data-answer-number", 0);
questionEl.appendChild(answer1El);
var answer2El = document.createElement(`button`);
answer2El.className = "btn answer-btn";
answer2El.setAttribute("data-answer-number", 1);
questionEl.appendChild(answer2El);
var answer3El = document.createElement(`button`);
answer3El.className = "btn answer-btn";
answer3El.setAttribute("data-answer-number", 2);
questionEl.appendChild(answer3El);
var answer4El = document.createElement(`button`);
answer4El.className = "btn answer-btn";
answer4El.setAttribute("data-answer-number", 3);
questionEl.appendChild(answer4El);
var resultEl = document.createElement(`div`);
resultEl.className = "result";
var resultHrEl = document.createElement(`hr`);
var resultTextEl = document.createElement(`h3`);
resultEl.appendChild(resultHrEl);
resultEl.appendChild(resultTextEl);

var initialsFormEl = document.createElement('div');
initialsFormEl.className = "initials-form";
var submitButtonEl = document.createElement("button");
submitButtonEl.textContent = "Submit";
submitButtonEl.className = "btn submit-btn";

initialsFormEl.innerHTML = `<span>Enter initials: </span><input name='user-initials'></input>`;
initialsFormEl.appendChild(submitButtonEl);

// See which button was pressed, match on it and act accordingly
var quizButtonHandler = function (event) {
    switch (event.target.className) {
        case "btn start-btn":
            console.log("start btn hit");
            startQuiz();
            break;
        case "btn answer-btn":
            console.log("answer btn hit");
            checkAnswer(event);
            break;
        case "btn submit-btn":
            console.log("submit btn hit");
            initialsFormHandler(event);
            break;
        case "btn back-btn":
            console.log("back btn hit");
            // initialsFormHandler(event);
            break;
        case "btn clear-btn":
            console.log("clear btn hit");
            clearScores();
        default:
            console.log("Something else was hit");
    }
}


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
    document.querySelector(`.intro`).remove();
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

        if (questionIndex === questions.length) {
            return;
        } else {
            questionIndex++;
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

    quizEndEl.appendChild(initialsFormEl);

    document.body.appendChild(quizEndEl);
}

// When the user hits the "Submit" button
// Logs initial + score object in highscores array
// Updates local storage
//
var initialsFormHandler = function (event) {
    event.preventDefault();
    console.log("initialsFormHandler()");

    var userInitials = document.querySelector(`input[name="user-initials"]`).value;
    if (!userInitials) {
        alert("Please enter your initials.");
        return false;
    }
    var result = { userInitials, score };
    console.log(result);
    console.log(highScores);
    highScores.push(result); //This isn't working oof
    console.log(highScores);
    // Wanna save to local storage every time the user inputs their new score

    document.querySelector(".end-screen").remove();
    console.log("HIGH SCORES" + JSON.stringify(highScores));
    saveScores();
    createScoresEl();

}

var createScoresEl = function () {
    var scoresPageEl = document.createElement("div");
    scoresPageEl.className = "content-section high-scores";
    scoresPageEl.innerHTML = `<h1>High scores</h1>`;

    var scoresTableEl = document.createElement("ol");
    highScores.forEach(score => {
        var appendScoreLi = document.createElement("li");
        appendScoreLi.textContent = `${score.score} - ${score.userInitials}`;
        console.log(score);
        scoresTableEl.appendChild(appendScoreLi);
    });
    // scoresPageEl.appendChild(titleEl);
    scoresPageEl.appendChild(scoresTableEl);

    var backBtnEl = document.createElement("button");
    backBtnEl.className = "btn back-btn";
    backBtnEl.textContent = "Go back";
    var clearBtnEl = document.createElement("button");
    clearBtnEl.className = "btn clear-btn";
    clearBtnEl.textContent = "Clear high scores";
    scoresPageEl.appendChild(backBtnEl);
    scoresPageEl.appendChild(clearBtnEl);

    document.body.appendChild(scoresPageEl);

}

var clearScores = function () {
    document.querySelector("div.high-scores").remove();
    highScores = [];
    saveScores();
    createScoresEl();
}

var saveScores = function () {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

var loadScores = function () {
    highScores = localStorage.getItem("highScores");
}

loadScores();
document.body.addEventListener('click', quizButtonHandler);