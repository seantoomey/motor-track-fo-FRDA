// ==========================================
// MOTORTRACK - WEEKLY MOTOR TEST
// ==========================================

// Supabase connection
const SUPABASE_URL =
    "https://lihamiyfzlvfmmpcorlb.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_6FLGvCfBrAmvQP9F6SbpFA_bzGdr8kd";

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

            document.getElementById("next-button").style.display =
                "inline-block";
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

    button.style.width = "100%";
    button.style.height = "300px";
    button.style.display = "block";
    button.style.fontSize = "32px";
    button.style.margin = "0";
    button.style.boxSizing = "border-box";

    gameArea.appendChild(button);

    let startTime = null;
    let finished = false;

    const delay = 1500 + Math.random() * 3000;

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
// FINISH TEST AND SAVE TO SUPABASE
// ==========================================

let saveInProgress = false;

async function finishTest() {
    if (saveInProgress) return;

    saveInProgress = true;

    const testArea = document.getElementById("test-area");
    const finalResults = document.getElementById("final-results");
    const resultsDisplay = document.getElementById("results-display");

    if (testArea) {
        testArea.style.display = "none";
    }

    if (finalResults) {
        finalResults.style.display = "block";
    }

    function showSaveMessage(message) {
        if (resultsDisplay) {
            resultsDisplay.textContent = message;
        } else if (finalResults) {
            const messageElement = document.createElement("p");
            messageElement.textContent = message;
            messageElement.setAttribute("role", "status");
            finalResults.appendChild(messageElement);
        }
    }

    // Find the participant's login token
    const accessToken =
        sessionStorage.getItem("motorMonitorAccessToken") ||
        localStorage.getItem("motorMonitorAccessToken");

    if (!accessToken) {
        console.error("MotorMonitor: no login token found.");

        showSaveMessage(
            "Your test is complete, but your results could not be saved because your sign-in session was not found. Please sign in again."
        );

        saveInProgress = false;
        return;
    }

    // Prepare scores
    const result = {
        target_tapping: Number(sessionResults.targetTapping),
        reaction_time: Number(sessionResults.reactionTime),
        alternating_taps: Number(sessionResults.alternatingTaps),
        moving_target: Number(sessionResults.movingTarget)
    };

    const validScores = Object.values(result).every(
        value => Number.isFinite(value) && value >= 0
    );

    if (!validScores) {
        console.error("MotorMonitor: invalid scores.", result);

        showSaveMessage(
            "Your test is complete, but the scores were invalid and could not be saved."
        );

        saveInProgress = false;
        return;
    }

    showSaveMessage("Saving your results securely...");

    console.log("MotorMonitor: sending results to Supabase.");

    try {
        const response = await fetch(
            `${SUPABASE_URL}/functions/v1/sign-in-system`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_PUBLISHABLE_KEY,
                    "Authorization": `Bearer ${accessToken}`
                },

                body: JSON.stringify({
                    action: "save-results",
                    ...result
                })
            }
        );

        const responseText = await response.text();

        let data = {};

        try {
            data = responseText ? JSON.parse(responseText) : {};
        } catch {
            throw new Error(
                `Supabase returned an unreadable response (HTTP ${response.status}).`
            );
        }

        console.log(
            "MotorMonitor Supabase response:",
            response.status,
            data
        );

        if (!response.ok) {
            throw new Error(
                data.error ||
                data.message ||
                `Supabase request failed (HTTP ${response.status}).`
            );
        }

        if (data.success !== true) {
            throw new Error(
                data.error ||
                data.message ||
                "Supabase did not confirm that the results were saved."
            );
        }

        // Show confirmation only after Supabase confirms success
        showSaveMessage(
            "Your weekly test has been completed successfully. Your results have been securely recorded for research purposes. Your previous scores will not be displayed. Thank you for participating."
        );

        console.log(
            "MotorMonitor: Supabase confirmed the results were saved."
        );

    } catch (error) {
        console.error("MOTORMONITOR RESULT SAVE ERROR:", error);

        showSaveMessage(
            "Your test is complete, but your results could not be confirmed as saved. Please check your internet connection and sign in again. If the problem continues, tell the researcher. Error: " +
            error.message
        );

    } finally {
        saveInProgress = false;
    }
}

// ==========================================
// SCROLL-TRIGGERED CARD ANIMATIONS
// ==========================================

function initialiseScrollAnimations() {
    const cards = document.querySelectorAll(
        ".mm-process-card, .mm-test-card"
    );

    if (!cards.length) return;

    if (!("IntersectionObserver" in window)) return;

    document.documentElement.classList.add(
        "mm-scroll-animations"
    );

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("mm-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    cards.forEach(card => {
        observer.observe(card);
    });
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initialiseScrollAnimations
    );
} else {
    initialiseScrollAnimations();
}
