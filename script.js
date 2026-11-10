
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

async function finishTest() {

    document.getElementById("test-area").style.display = "none";
    document.getElementById("final-results").style.display = "block";

    const resultsDisplay =
        document.getElementById("results-display");

    // Check login
    const accessToken =
        sessionStorage.getItem("motorMonitorAccessToken");

    if (!accessToken) {

        resultsDisplay.textContent =
            "You are not logged in. Please sign in before saving your results.";

        return;
    }

    // Prepare scores
    const result = {
        target_tapping: Number(sessionResults.targetTapping),
        reaction_time: Number(sessionResults.reactionTime),
        alternating_taps: Number(sessionResults.alternatingTaps),
        moving_target: Number(sessionResults.movingTarget)
    };

    resultsDisplay.textContent = "Saving your results...";

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

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.error || "Could not save your results."
            );
        }

        // Display saved results
        resultsDisplay.innerHTML = "";

        const card = document.createElement("div");
        card.className = "result-card";

        const measurements = [
            ["🎯", "Target Tapping", result.target_tapping, "taps"],
            ["⚡", "Reaction Time", result.reaction_time, "ms"],
            ["🔄", "Alternating Taps", result.alternating_taps, "taps"],
            ["✋", "Moving Target", result.moving_target, "hits"]
        ];

        measurements.forEach(function(item) {

            const measure = document.createElement("div");
            measure.className = "result-measure";

            const icon = document.createElement("span");
            icon.textContent = item[0];

            const details = document.createElement("div");

            const label = document.createElement("small");
            label.textContent = item[1];

            const score = document.createElement("strong");
            score.textContent = item[2];

            const unit = document.createElement("em");
            unit.textContent = item[3];

            details.append(label, score, unit);
            measure.append(icon, details);
            card.appendChild(measure);

        });

        resultsDisplay.appendChild(card);

        const confirmation = document.createElement("p");

        confirmation.textContent =
            "Your results have been successfully saved to Supabase.";

        resultsDisplay.appendChild(confirmation);

    } catch (error) {

        console.error("RESULT SAVE ERROR:", error);

        resultsDisplay.textContent =
            "Your test finished, but saving failed: " +
            error.message +
            " Please sign in again and try another test.";
    }
}

// ==========================================
// END OF SCRIPT
// ==========================================

// ========================================
// SCROLL-TRIGGERED CARD ANIMATIONS
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(
        ".mm-process-card, .mm-test-card"
    );

    // Show cards immediately if reduced motion is enabled
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        cards.forEach(card => card.classList.add("mm-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("mm-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    cards.forEach(card => observer.observe(card));
});
