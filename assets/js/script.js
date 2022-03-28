console.log(`First line`);
var startBtnEl = document.querySelector(`.start-btn`);
var timerEl = document.querySelector(`.timer`);
var score = 0;
var time = 10; //How long each quiz is
var timeElapsed = 0;

var decrementTimer = function () {
    console.log(time - timeElapsed);
    timeElapsed++;
    if (timeElapsed === time) {
        console.log("Time over!");
        clearInterval()
    }
}

// function that starts the quiz, sets counters to 0, starts the timer
var startQuiz = function () {
    score = 0;
    time = 10;

    var timerIntervalID = setInterval(() => {
        console.log(time - timeElapsed);
        timeElapsed++;
        timerEl.textContent = `Time: ${time - timeElapsed}`;
        if (timeElapsed === time) {
            console.log("Time over!");
            clearInterval(timerIntervalID);
        }
    }, 1000);
    //show new question
}

startBtnEl.addEventListener(`click`, startQuiz);