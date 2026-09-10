// ==========================================
// MOTORTRACK - WEEKLY MOTOR TEST
// ==========================================

// Current test number
let currentTest = 0;

// Store results for this weekly session
let sessionResults = {
    targetTapping: 0,
    reactionTime: 0,
    alternatingTaps: 0,
    movingTarget: 0
};

// Test order
const tests = [
    "target",
    "reaction",
    "alternating",
    "moving"
];

// ==========================================
// START THE TEST
// ==========================================

function startTest() {

    currentTest = 0;

    sessionResults = {
        targetTapping: 0,
        reactionTime: 0,
        alternatingTaps: 0,
        movingTarget: 0
    };

    document.getElementById("instructions").style.display = "none";
    document.getElementById("test-area").style.display = "block";

    runCurrentTest();
}

// ==========================================
// RUN CURRENT TEST
// ==========================================

function runCurrentTest() {

    const test = tests[currentTest];

    document.getElementById("next-button").style.display = "none";

    if (test === "target") {
        targetTappingTest();
    }

    if (test === "reaction") {
        reactionTimeTest();
    }

    if (test === "alternating") {
        alternatingTapsTest();
    }

    if (test === "moving") {
        movingTargetTest();
    }
}

// ==========================================
// GO TO NEXT TEST
// ==========================================

function nextTest() {

    currentTest++;

    if (currentTest >= tests.length) {
        finishTest();
        return;
    }

    runCurrentTest();
}

// ==========================================
// 1. TARGET TAPPING TEST
// ==========================================

function targetTappingTest() {

    document.getElementById("test-title").textContent =
        "🎯 Target Tapping";

    document.getElementById("test-instruction").textContent =
        "Tap the target as many times as you can in 15 seconds.";

    const gameArea = document.getElementById("game-area");

    gameArea.innerHTML = "";

    let taps = 0;
    let timeLeft = 15;

    const target = document.createElement("button");

    target.textContent = "TAP";
    target.style.position = "absolute";
    target.style.width = "80px";
    target.style.height = "80px";
    target.style.borderRadius = "50%";
    target.style.border = "none";
    target.style.background = "#5b5ce2";
    target.style.color = "white";
    target.style.fontSize = "18px";
    target.style.fontWeight = "bold";
    target.style.cursor = "pointer";

    gameArea.style.position = "relative";
    gameArea.style.height = "300px";

    gameArea.appendChild(target);

    function moveTarget() {

        const maxX = gameArea.clientWidth - 90;
        const maxY = gameArea.clientHeight - 90;

        target.style.left =
            Math.random() * Math.max(maxX, 0) + "px";

        target.style.top =
            Math.random() * Math.max(maxY, 0) + "px";
    }

    target.onclick = function () {

        taps++;

        moveTarget();
    };

    moveTarget();

    const timer = setInterval(function () {

        timeLeft--;

        document.getElementById("test-instruction").textContent =
            "Time left: " + timeLeft + " seconds";

        if (timeLeft <= 0) {

            clearInterval(timer);

            sessionResults.targetTapping = taps;

            gameArea.innerHTML =
                "<h3>Test complete!</h3>" +
                "<p>You tapped the target <strong>" +
                taps +
                "</strong> times.</p>";

            document.getElementById("next-button").style.display = "inline-block";
        }

    }, 1000);
}

// ==========================================
// 2. REACTION TIME TEST
// ==========================================

function reactionTimeTest() {

    document.getElementById("test-title").textContent =
        "⚡ Reaction Time";

    document.getElementById("test-instruction").textContent =
        "Wait for the screen to change, then tap the button as quickly as possible.";

    const gameArea = document.getElementById("game-area");

    gameArea.innerHTML = "";

    const button = document.createElement("button");

    button.textContent = "WAIT...";
    button.className = "start-button reaction-button";

    gameArea.appendChild(button);

    let startTime = null;
    let finished = false;

    const delay =
        1500 + Math.random() * 3000;

    setTimeout(function () {

        if (finished) return;

        button.textContent = "TAP NOW!";
        button.style.background = "#22c55e";

        startTime = performance.now();

    }, delay);

    button.onclick = function () {

        if (finished) return;

        if (startTime === null) {

            document.getElementById("test-instruction").textContent =
                "Too early! Wait for TAP NOW.";

            return;
        }

        finished = true;

        const reaction =
            Math.round(performance.now() - startTime);

        sessionResults.reactionTime = reaction;

        gameArea.innerHTML =
            "<h3>Test complete!</h3>" +
            "<p>Your reaction time was <strong>" +
            reaction +
            " ms</strong>.</p>";

        document.getElementById("next-button").style.display =
            "inline-block";
    };
}

// ==========================================
// 3. ALTERNATING TAPS TEST
// ==========================================

function alternatingTapsTest() {

    document.getElementById("test-title").textContent =
        "🔄 Alternating Taps";

    document.getElementById("test-instruction").textContent =
        "Press A and B alternately for 10 seconds.";

    const gameArea = document.getElementById("game-area");

    gameArea.innerHTML = "";

    let expected = "A";
    let correct = 0;
    let timeLeft = 10;

    const buttonA = document.createElement("button");
    const buttonB = document.createElement("button");

    buttonA.textContent = "A";
    buttonB.textContent = "B";

    buttonA.className = "start-button";
    buttonB.className = "start-button";

    buttonA.style.margin = "10px";
    buttonB.style.margin = "10px";

    gameArea.appendChild(buttonA);
    gameArea.appendChild(buttonB);

    function press(letter) {

        if (letter === expected) {

            correct++;

            if (expected === "A") {
                expected = "B";
            } else {
                expected = "A";
            }

        }
    }

    buttonA.onclick = function () {
        press("A");
    };

    buttonB.onclick = function () {
        press("B");
    };

    const timer = setInterval(function () {

        timeLeft--;

        document.getElementById("test-instruction").textContent =
            "Time left: " + timeLeft + " seconds";

        if (timeLeft <= 0) {

            clearInterval(timer);

            sessionResults.alternatingTaps = correct;

            gameArea.innerHTML =
                "<h3>Test complete!</h3>" +
                "<p>Correct alternating taps: <strong>" +
                correct +
                "</strong>.</p>";

            document.getElementById("next-button").style.display =
                "inline-block";
        }

    }, 1000);
}

// ==========================================
// 4. MOVING TARGET TEST
// ==========================================

function movingTargetTest() {

    document.getElementById("test-title").textContent =
        "✋ Moving Target";

    document.getElementById("test-instruction").textContent =
        "Tap the moving target as many times as possible in 15 seconds.";

    const gameArea = document.getElementById("game-area");

    gameArea.innerHTML = "";

    gameArea.style.position = "relative";
    gameArea.style.height = "300px";

    let hits = 0;
    let timeLeft = 15;

    const target = document.createElement("button");

    target.textContent = "●";

    target.style.position = "absolute";
    target.style.width = "70px";
    target.style.height = "70px";
    target.style.borderRadius = "50%";
    target.style.border = "none";
    target.style.background = "#7c3aed";
    target.style.color = "white";
    target.style.fontSize = "25px";
    target.style.cursor = "pointer";

    gameArea.appendChild(target);

    function moveTarget() {

        const maxX = gameArea.clientWidth - 80;
        const maxY = gameArea.clientHeight - 80;

        target.style.left =
            Math.random() * Math.max(maxX, 0) + "px";

        target.style.top =
            Math.random() * Math.max(maxY, 0) + "px";
    }

    target.onclick = function () {

        hits++;

        moveTarget();
    };

    moveTarget();

    const movement = setInterval(function () {

        moveTarget();

    }, 700);

    const timer = setInterval(function () {

        timeLeft--;

        document.getElementById("test-instruction").textContent =
            "Time left: " + timeLeft + " seconds";

        if (timeLeft <= 0) {

            clearInterval(timer);
            clearInterval(movement);

            sessionResults.movingTarget = hits;

            gameArea.innerHTML =
                "<h3>Test complete!</h3>" +
                "<p>Moving-target hits: <strong>" +
                hits +
                "</strong>.</p>";

            document.getElementById("next-button").style.display =
                "inline-block";
        }

    }, 1000);
}

// ==========================================
// FINISH THE WEEKLY TEST
// ==========================================

function finishTest() {

    document.getElementById("test-area").style.display = "none";
    document.getElementById("final-results").style.display = "block";

    const today = new Date();

    const result = {

        date: today.toISOString(),

        targetTapping: sessionResults.targetTapping,

        reactionTime: sessionResults.reactionTime,

        alternatingTaps: sessionResults.alternatingTaps,

        movingTarget: sessionResults.movingTarget

    };

    // Get previous results
    let savedResults =
        JSON.parse(localStorage.getItem("motorTrackResults")) || [];

    // Add this week's result
    savedResults.push(result);

    // Save everything
    localStorage.setItem(
        "motorTrackResults",
        JSON.stringify(savedResults)
    );

    // Display results
    document.getElementById("results-display").innerHTML =

        "<div class='result-card'>" +

        "<div class='result-measure'>" +
        "<span>🎯</span>" +
        "<div><small>Target Tapping</small>" +
        "<strong>" +
        result.targetTapping +
        "</strong></div></div>" +

        "<div class='result-measure'>" +
        "<span>⚡</span>" +
        "<div><small>Reaction Time</small>" +
        "<strong>" +
        result.reactionTime +
        " ms</strong></div></div>" +

        "<div class='result-measure'>" +
        "<span>🔄</span>" +
        "<div><small>Alternating Taps</small>" +
        "<strong>" +
        result.alternatingTaps +
        "</strong></div></div>" +

        "<div class='result-measure'>" +
        "<span>✋</span>" +
        "<div><small>Moving Target</small>" +
        "<strong>" +
        result.movingTarget +
        "</strong></div></div>" +

        "</div>";
}

// ==========================================
// END OF SCRIPT
// ==========================================
 
