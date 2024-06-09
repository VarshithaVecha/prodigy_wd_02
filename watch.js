let startTime, elapsedTime = 0, intervalId;
let running = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function updateDisplay(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    display.textContent = `${minutes}:${seconds}.${milliseconds}`;
}

function startStop() {
    if (running) {
        clearInterval(intervalId);
        elapsedTime += Date.now() - startTime;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now();
        intervalId = setInterval(() => {
            updateDisplay(Date.now() - startTime + elapsedTime);
        }, 10);
        startStopButton.textContent = 'Stop';
    }
    running = !running;
}

function reset() {
    clearInterval(intervalId);
    running = false;
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    startStopButton.textContent = 'Start';
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = Date.now() - startTime + elapsedTime;
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap');
        lapElement.textContent = display.textContent;
        lapsContainer.appendChild(lapElement);
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);
