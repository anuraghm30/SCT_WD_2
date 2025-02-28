let timerDisplay = document.querySelector(".timer");
let startPauseButton = document.getElementById("startPause");
let lapButton = document.getElementById("lap");
let resetButton = document.getElementById("reset");
let lapsContainer = document.getElementById("laps");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = ms % 1000;

    return (
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (milliseconds < 100 ? "0" : "") + (milliseconds < 10 ? "0" : "") + milliseconds
    );
}

function startPause() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            timerDisplay.innerText = formatTime(elapsedTime);
        }, 10);
        startPauseButton.innerText = "Pause";
        running = true;
    } else {
        clearInterval(timerInterval);
        startPauseButton.innerText = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    timerDisplay.innerText = "00:00.000";
    startPauseButton.innerText = "Start";
    lapsContainer.innerHTML = "";
}

function lap() {
    if (running) {
        let lapTime = document.createElement("li");
        lapTime.innerText = formatTime(elapsedTime);
        lapsContainer.appendChild(lapTime);
    }
}

startPauseButton.addEventListener("click", startPause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);


