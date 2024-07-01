let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let int = null;
let lapTimes = [];
let lapListRef = document.getElementById("lap-list");

document.getElementById("start-timer").addEventListener("click", () => {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 10);
});

document.getElementById("pause-timer").addEventListener("click", () => {
  clearInterval(int);
});

document.getElementById("reset-timer").addEventListener("click", () => {
  clearInterval(int);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  timeRef.innerHTML = "00 : 00 : 00 : 000";
  lapTimes = [];
  lapListRef.innerHTML = "";
});

document.getElementById("lap-timer").addEventListener("click", () => {
  if (int !== null) {
    // Record the current lap time
    lapTimes.push(`${hours}:${minutes}:${seconds}:${milliseconds}`);

    // Create a new lap entry and add it to the lap list
    const lapEntry = document.createElement("li");
    lapEntry.textContent = `Lap ${lapTimes.length}: ${
      lapTimes[lapTimes.length - 1]
    }`;
    lapListRef.appendChild(lapEntry);
  }
});

function displayTimer() {
  milliseconds += 10;
  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}
