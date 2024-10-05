let startTime, updatedTime, difference, tInterval;
let running = false;

const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");

document.getElementById("start").onclick = start;
document.getElementById("pause").onclick = pause;
document.getElementById("reset").onclick = reset;
document.getElementById("lap").onclick = lap;

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function pause() {
    clearInterval(tInterval);
    running = false;
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    lapsContainer.innerHTML = "";
}

function lap() {
    if (running) {
        const lapTime = formatTime(difference);
        const lapItem = document.createElement("div");
        lapItem.textContent = lapTime;
        lapsContainer.appendChild(lapItem);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = formatTime(difference);
}

function formatTime(difference) {
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds
    );
}
