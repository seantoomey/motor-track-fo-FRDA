// ========================================
// MotorTrack Weekly Test
// ========================================

let currentTest = 0;

const results = {
    targetTapping: 0,
    reactionTime: 0,
    alternatingTaps: 0,
    movingTarget: 0
};

let testStartTime;
let tapCount = 0;
let reactionStart;
let alternatingCount = 0;
let movingHits = 0;


// The four tests
const tests = [
    "target",
    "reaction",
    "alternating",
    "moving"
];


// ========================================
// START TEST
// ========================================

function startTest() {

    document.getElementById("instructions").style.display = "none";
    document.getElementById("test-area").style.display = "block";

    currentTest = 0;

    loadTest();
}


// ========================================
// LOAD CURRENT TEST
// ========================================

function loadTest() {

    document.getElementById("next-button").style.display = "none";

    const gameArea = document.getElementById("game-area");

    gameArea.innerHTML = "";

    const test = tests[currentTest];

    if (test === "target") {
        targetTapping();
    }

    if (test === "reaction") {
        reactionTime();
    }

    if (test === "alternating") {
        alternatingTaps();
    }

    if (test === "moving") {
        movingTarget();
    }
}


// ========================================
// TEST 1 — TARGET TAPPING
// ========================================

function targetTapping() {

    document.getElementById("test-title").textContent =
        "Test 1 — Target Tapping";

    document.getElementById("test-instruction").textContent =
        "Tap the targets as quickly as you can for 15 seconds.";

    const gameArea = document.getElementById("game-area");

    gameArea.style.position = "relative";
    gameArea.style.height = "300px";
    gameArea.style.background = "#eef0ff";
    gameArea.style.borderRadius = "15px";

    tapCount = 0;

    createTarget();

    testStartTime = Date.now();

    const timer = setInterval(() => {

        const elapsed = Date.now() - testStartTime;

        if (elapsed >= 15000) {

            clearInterval(timer);

            gameArea.innerHTML =
                "<h3>Finished!</h3>" +
                "<p>Targets tapped: " + tapCount + "</p>";

            results.targetTapping = tapCount;

            document.getElementById("next-button").style.display = "inline-block";
        }

    }, 100);
}


function createTarget() {

    const gameArea = document.getElementById("game-area");

    const target = document.createElement("button");

    target.textContent = "●";

    target.style.position = "absolute";
    target.style.width = "55px";
    target.style.height = "55px";
    target.style.borderRadius = "50%";
    target.style.border = "none";
    target.style.cursor = "pointer";
    target.style.fontSize = "25px";

    target.style.left =
        Math.random() * (gameArea.clientWidth - 60) + "px";

    target.style.top =
        Math.random() * (gameArea.clientHeight - 60) + "px";

    target.onclick = function () {

        tapCount++;

        target.remove();

        createTarget();
    };

    gameArea.appendChild(target);
}


// ========================================
// TEST 2 — REACTION TIME
// ========================================

function reactionTime() {

    document.getElementById("test-title").textContent =
        "Test 2 — Reaction Time";

    document.getElementById("test-instruction").textContent =
        "Wait for the button to change, then tap it as quickly as possible.";

    const gameArea = document.getElementById("game-area");

    const button = document.createElement("button");

    button.textContent = "Wait...";

    button.style.width = "100%";
    button.style.height = "180px";
    button.style.fontSize = "28px";
    button.style.border = "none";
    button.style.borderRadius = "15px";
    button.style.cursor = "pointer";

    gameArea.appendChild(button);

    const delay = 1500 + Math.random() * 3000;

    setTimeout(() => {

        button.textContent = "TAP NOW!";

        reactionStart = performance.now();

        button.onclick = function () {

            const reaction =
                performance.now() - reactionStart;

            results.reactionTime = Math.round(reaction);

            button.textContent =
                "Reaction time: " +
                Math.round(reaction) +
                " ms";

            document.getElementById("next-button").style.display =
                "inline-block";
        };

    }, delay);
}


// ========================================
// TEST 3 — ALTERNATING TAPS
// ========================================

function alternatingTaps() {

    document.getElementById("test-title").textContent =
        "Test 3 — Alternating Taps";

    document.getElementById("test-instruction").textContent =
        "Tap the two buttons alternately for 10 seconds.";

    const gameArea = document.getElementById("game-area");

    alternatingCount = 0;

    let expected = "A";

    const buttonA = document.createElement("button");
    const buttonB = document.createElement("button");

    buttonA.textContent = "A";
    buttonB.textContent = "B";

    buttonA.style.width = "45%";
    buttonB.style.width = "45%";

    buttonA.style.height = "150px";
    buttonB.style.height = "150px";

    buttonA.style.fontSize = "40px";
    buttonB.style.fontSize = "40px";

    buttonA.style.margin = "2%";
    buttonB.style.margin = "2%";

    gameArea.appendChild(buttonA);
    gameArea.appendChild(buttonB);

    function tap(letter) {

        if (letter === expected) {

            alternatingCount++;

            if (expected === "A") {
                expected = "B";
            } else {
                expected = "A";
            }
        }
    }

    buttonA.onclick = () => tap("A");
    buttonB.onclick = () => tap("B");

    const start = Date.now();

    const timer = setInterval(() => {

        if (Date.now() - start >= 10000) {

            clearInterval(timer);

            results.alternatingTaps = alternatingCount;

            gameArea.innerHTML =
                "<h3>Finished!</h3>" +
                "<p>Correct alternating taps: " +
                alternatingCount +
                "</p>";

            document.getElementById("next-button").style.display =
                "inline-block";
        }

    }, 100);
}


// ========================================
// TEST 4 — MOVING TARGET
// ========================================

function movingTarget() {

    document.getElementById("test-title").textContent =
        "Test 4 — Moving Target";

    document.getElementById("test-instruction").textContent =
        "Tap the moving target as many times as you can for 15 seconds.";

    const gameArea = document.getElementById("game-area");

    gameArea.style.position = "relative";
    gameArea.style.height = "300px";
    gameArea.style.background = "#eef0ff";
    gameArea.style.borderRadius = "15px";

    movingHits = 0;

    const target = document.createElement("button");

    target.textContent = "●";

    target.style.position = "absolute";
    target.style.width = "55px";
    target.style.height = "55px";
    target.style.borderRadius = "50%";
    target.style.border = "none";
    target.style.cursor = "pointer";
    target.style.fontSize = "25px";

    gameArea.appendChild(target);

    function moveTarget() {

        target.style.left =
            Math.random() * (gameArea.clientWidth - 60) + "px";

        target.style.top =
            Math.random() * (gameArea.clientHeight - 60) + "px";
    }

    target.onclick = function () {

        movingHits++;

        moveTarget();
    };

    moveTarget();

    const start = Date.now();

    const timer = setInterval(() => {

        if (Date.now() - start >= 15000) {

            clearInterval(timer);

            results.movingTarget = movingHits;

            gameArea.innerHTML =
                "<h3>Finished!</h3>" +
                "<p>Targets hit: " +
                movingHits +
                "</p>";

            document.getElementById("next-button").style.display =
                "inline-block";
        }

    }, 100);
}


// ========================================
// NEXT TEST
// ========================================

function nextTest() {

    currentTest++;

    if (currentTest < tests.length) {

        loadTest();

    } else {

        finishTest();
    }
}


// ========================================
// FINISH TEST
// ========================================

function finishTest() {

    document.getElementById("test-area").style.display = "none";

    document.getElementById("final-results").style.display = "block";

    const resultsDisplay =
        document.getElementById("results-display");

    resultsDisplay.innerHTML = `
        <p><strong>Target tapping:</strong>
        ${results.targetTapping} taps</p>

        <p><strong>Reaction time:</strong>
        ${results.reactionTime} ms</p>

        <p><strong>Alternating taps:</strong>
        ${results.alternatingTaps}</p>

        <p><strong>Moving target:</strong>
        ${results.movingTarget} hits</p>
    `;


    // Save the result to the browser

    const previousResults =
        JSON.parse(localStorage.getItem("motorTrackResults")) || [];

    previousResults.push({

        date: new Date().toISOString(),

        targetTapping: results.targetTapping,

        reactionTime: results.reactionTime,

        alternatingTaps: results.alternatingTaps,

        movingTarget: results.movingTarget

    });

    localStorage.setItem(
        "motorTrackResults",
        JSON.stringify(previousResults)
    );
}
