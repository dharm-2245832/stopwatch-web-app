let display = document.querySelector("#container h1");
let startBtn = document.querySelector("#start")
let resumeBtn = document.querySelector("#resume")
let lapBtn = document.querySelector("#lap")
let stopBtn = document.querySelector("#stop")
let resetBtn = document.querySelector("#reset")
let lapBoxTable = document.querySelector("#lapBox table tbody");


let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let previousLapTime = 0;
let totalTime = 0;
let LapTime = 0;

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10)
        isRunning = true;
    }
    startBtn.style.display = "none";
    stopBtn.style.display = "block"
}


function stop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime
        isRunning = false;
    }
    lapBtn.style.display = "none";
    stopBtn.style.display = "none";
    resumeBtn.style.display = "block";
    resetBtn.style.display = "block"

}
function resume() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10)
        isRunning = true;
    }
    resumeBtn.style.display = "none";
    stopBtn.style.display = "block";
    lapBtn.style.display = "block";
    resetBtn.style.display = "none";
}


function reset() {
    clearInterval(timer)
    startTime = 0
    elapsedTime = 0
    isRunning = false;
    display.textContent = "00:00.00";
    LapTime = 0;
    previousLapTime = 0;

    stopBtn.style.display = "none";
    resetBtn.style.display = "none";
    startBtn.style.display = "block";
    lapBtn.style.display = "block";
    resumeBtn.style.display = "none";

    lapBoxTable.innerHTML = "";
    document.querySelector("#lapBox").style.display = "none";
}
function update() {
    const currTime = Date.now();
    elapsedTime = currTime - startTime;

    let elapedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let elapedMinutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let elapedSeconds = Math.floor(elapsedTime / 1000 % 60);
    let elapedMlseconds = Math.floor(elapsedTime % 1000 / 10);



    display.textContent = `${String(elapedHours).padStart(2, "0")}:${String(elapedMinutes).padStart(2, "0")}:${String(elapedSeconds).padStart(2, "0")}.${elapedMlseconds}`;
}
function lapCount() {
    LapTime = elapsedTime - previousLapTime;
    previousLapTime = elapsedTime;

    let diffHours = Math.floor(LapTime / (1000 * 60 * 60));
    let diffMinutes = Math.floor(LapTime / (1000 * 60) % 60);
    let diffSeconds = Math.floor(LapTime / 1000 % 60);
    let diffmlseconds = Math.floor(LapTime % 1000 / 10);

    let elapedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let elapedMinutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let elapedSeconds = Math.floor(elapsedTime / 1000 % 60);
    let elapedMlseconds = Math.floor(elapsedTime % 1000 / 10);

    let sn = lapBoxTable.rows.length + 1;
    lapBoxTable.innerHTML += `<tr>
                                <td>${sn}</td>
                                <td>${String(diffHours).padStart(2, "0")}:${String(diffMinutes).padStart(2, "0")}:${String(diffSeconds).padStart(2, "0")}.${String(diffmlseconds).padStart(2, "0")}</td>
                                <td>${String(elapedHours).padStart(2, "0")}:${String(elapedMinutes).padStart(2, "0")}:${String(elapedSeconds).padStart(2, "0")}.${String(elapedMlseconds).padStart(2, "0")}</td>
                            </tr>`;

    document.querySelector("#lapBox").style.display = "block";
}

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lapCount)
resumeBtn.addEventListener("click", resume)