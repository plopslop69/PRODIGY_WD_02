let isRunning = false; // Keeps track of stopwatch state
let startTime = 0;
let lapStartTime = 0;
let lapCount = 1;
let stopwatchInterval; // Starts and stops stopwatch, used to run updateStopwatch function at 10ms interval

const stopwatch = document.getElementById("stopwatch");
const startStopButton = document.getElementById("startStop");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");
const laps = document.getElementById("laps");

startStopButton.addEventListener("click", toggleStartStop);
lapButton.addEventListener("click", handleLap);
resetButton.addEventListener("click", resetStopwatch);

function toggleStartStop() {
  if (isRunning) {
    clearInterval(stopwatchInterval);
    isRunning = false;
    startStopButton.textContent = "Start";
  } else {
    if (startTime === 0) {
      startTime = Date.now();
    } else {
      const currentTime = Date.now();
      lapStartTime += currentTime - startTime;
      startTime = currentTime;
    }
    stopwatchInterval = setInterval(updateStopwatch, 10);
    isRunning = true;
    startStopButton.textContent = "Stop";
  }
}

function updateStopwatch() {
  const currentTime = Date.now() - startTime + lapStartTime;
  const minutes = Math.floor(currentTime / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  const milliseconds = (currentTime % 1000).toString().slice(0, 2);

  stopwatch.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}:${milliseconds}`;
}

function handleLap() {
  if (isRunning) {
    const lapTime = Date.now() - startTime + lapStartTime;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${stopwatch.textContent}`;
    laps.appendChild(lapItem);
    lapCount++;
  }
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  isRunning = false;
  startTime = 0;
  lapStartTime = 0;
  lapCount = 1;
  stopwatch.textContent = "00:00:00";
  startStopButton.textContent = "Start";
  laps.innerHTML = "";
}
