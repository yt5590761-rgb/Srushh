/* =========================================================
   PERSONAL STORY WEBSITE
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

// Add your WhatsApp number here.
// India example: 919876543210
// Do NOT use +, spaces or hyphens.
const whatsappNumber = "917337864080";

// Password for the final Kannada message.
const finalPassword = "Tilak143";


/* =========================================================
   BASIC SCREEN CONTROL
========================================================= */

let currentScreen = "screen1";

function nextScreen(screenId) {

    const current = document.getElementById(currentScreen);
    const next = document.getElementById(screenId);

    if (!next) return;

    if (current) {
        current.classList.remove("active");
    }

    setTimeout(() => {
        next.classList.add("active");
        currentScreen = screenId;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 120);

}


/* =========================================================
   BACKGROUND MOOD
========================================================= */

let loveTimer = null;
let sadTimer = null;

function clearMood() {

    document.body.classList.remove("love-mode");
    document.body.classList.remove("sad-mode");

    stopLoveAnimation();
    stopSadAnimation();
}


function startLoveAnimation() {

    clearMoodOnly();

    document.body.classList.add("love-mode");

    createLoveParticle();

    loveTimer = setInterval(() => {
        createLoveParticle();
    }, 650);
}


function startSadAnimation() {

    clearMoodOnly();

    document.body.classList.add("sad-mode");

    createSadParticle();

    sadTimer = setInterval(() => {
        createSadParticle();
    }, 700);
}


function clearMoodOnly() {

    document.body.classList.remove("love-mode");
    document.body.classList.remove("sad-mode");

    stopLoveAnimation();
    stopSadAnimation();
}


/* =========================================================
   LOVE PARTICLES
========================================================= */

function createLoveParticle() {

    const particle = document.createElement("div");

    particle.className = "love-particle";

    const symbols = [
        "♡",
        "♥",
        "❤",
        "✨",
        "·"
    ];

    particle.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.left =
        Math.random() * 100 + "vw";

    particle.style.fontSize =
        (10 + Math.random() * 13) + "px";

    particle.style.setProperty(
        "--drift",
        ((Math.random() - 0.5) * 130) + "px"
    );

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 5000);
}


function stopLoveAnimation() {

    if (loveTimer) {
        clearInterval(loveTimer);
        loveTimer = null;
    }

    document
        .querySelectorAll(".love-particle")
        .forEach(particle => particle.remove());
}


/* =========================================================
   SAD PARTICLES
========================================================= */

function createSadParticle() {

    const particle = document.createElement("div");

    particle.className = "sad-particle";

    particle.style.left =
        Math.random() * 100 + "vw";

    particle.style.width =
        (2 + Math.random() * 2) + "px";

    particle.style.height =
        particle.style.width;

    particle.style.setProperty(
        "--drift",
        ((Math.random() - 0.5) * 80) + "px"
    );

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 5500);
}


function stopSadAnimation() {

    if (sadTimer) {
        clearInterval(sadTimer);
        sadTimer = null;
    }

    document
        .querySelectorAll(".sad-particle")
        .forEach(particle => particle.remove());
}


/* =========================================================
   MAIN QUESTION
========================================================= */

function chooseOption(option) {

    const responseTitle =
        document.getElementById("responseTitle");

    const responseLabel =
        document.getElementById("responseLabel");

    const responseSymbol =
        document.getElementById("responseSymbol");

    const responseText =
        document.getElementById("responseText");

    const friendshipArea =
        document.getElementById("friendshipArea");

    const whatsappArea =
        document.getElementById("whatsappArea");

    const continueButton =
        document.getElementById("continueResponseBtn");


    friendshipArea.classList.add("hidden");
    whatsappArea.classList.add("hidden");
    continueButton.classList.add("hidden");


    /* -----------------------------------------
       SOMEONE SPECIAL
    ----------------------------------------- */

    if (option === "someone") {

        startSadAnimation();

        responseSymbol.textContent = "🥺";

        responseLabel.textContent =
            "I DIDN'T KNOW";

        responseTitle.textContent =
            "Okay… I understand.";

        responseText.innerHTML = `
            <p>
                I honestly didn't know that someone already had
                a special place in your life.
            </p>

            <p>
                Maybe my feelings came at the wrong time,
                but I'm still glad I was honest about them.
            </p>

            <p>
                I don't want to come between you and anyone.
                If you are happy, that's what matters.
            </p>

            <p>
                I just wanted you to know that my feelings
                were genuine. That's all.
            </p>

            <p class="highlight-text">
                Take care of yourself and keep smiling. ❤️
            </p>
        `;

        continueButton.textContent =
            "Continue  →";

        continueButton.classList.remove("hidden");

        continueButton.onclick = function () {

            clearMood();
            nextScreen("screen6");
        };

        nextScreen("screen5");

        return;
    }


    /* -----------------------------------------
       NO ONE
    ----------------------------------------- */

    if (option === "noone") {

        clearMood();

        responseSymbol.textContent = "🤍";

        responseLabel.textContent =
            "THANK YOU FOR BEING HONEST";

        responseTitle.textContent =
            "I understand.";

        responseText.innerHTML = `
            <p>
                Then can I ask you one more thing?
            </p>

            <p>
                I'm not asking because I want to judge you.
                I just want to understand what you feel.
            </p>
        `;

        continueButton.textContent =
            "Tell me  →";

        continueButton.classList.remove("hidden");

        continueButton.onclick = function () {
            nextScreen("screen4");
        };

        nextScreen("screen5");

        return;
    }


    /* -----------------------------------------
       NOT INTERESTED IN LOVE
    ----------------------------------------- */

    if (option === "not-interested") {

        startSadAnimation();

        responseSymbol.textContent = "🤍";

        responseLabel.textContent =
            "I RESPECT THAT";

        responseTitle.textContent =
            "I understand.";

        responseText.innerHTML = `
            <p>
                If you're not interested in love, I completely
                respect that.
            </p>

            <p>
                I'm not asking you to change your feelings
                or to start something with me.
            </p>

            <p>
                I just wanted to be honest about how I feel.
            </p>

            <p>
                Maybe we can simply start with friendship,
                with no expectations and no pressure.
            </p>
        `;

        friendshipArea.classList.remove("hidden");

        nextScreen("screen5");

        return;
    }


    /* -----------------------------------------
       PAST LOVE
    ----------------------------------------- */

    if (option === "past-love") {

        clearMood();

        responseSymbol.textContent = "🌷";

        responseLabel.textContent =
            "I UNDERSTAND";

        responseTitle.textContent =
            "Your past matters.";

        responseText.innerHTML = `
            <p>
                I understand that you've been through something
                before.
            </p>

            <p>
                You don't have to forget your past or change
                your feelings for me.
            </p>

            <p>
                I'm not asking for a relationship.
                I just want to know if you would be comfortable
                having me as a friend.
            </p>
        `;

        friendshipArea.classList.remove("hidden");

        nextScreen("screen5");

        return;
    }


    /* -----------------------------------------
       ALREADY LIKE SOMEONE
    ----------------------------------------- */

    if (option === "like-someone") {

        startSadAnimation();

        responseSymbol.textContent = "🥺";

        responseLabel.textContent =
            "I RESPECT YOUR FEELINGS";

        responseTitle.textContent =
            "I understand.";

        responseText.innerHTML = `
            <p>
                If your heart already likes someone,
                I don't want to compete with that.
            </p>

            <p>
                I won't ask you to choose between anyone.
            </p>

            <p>
                I only wanted to be honest about my own feelings
                because they have been real for me.
            </p>

            <p>
                I hope things work out the way you want.
            </p>
        `;

        continueButton.textContent =
            "One more thing  →";

        continueButton.classList.remove("hidden");

        continueButton.onclick = function () {

            clearMood();

            responseSymbol.textContent = "❤️";

            responseLabel.textContent =
                "ONLY IF YOU'RE COMFORTABLE";

            responseTitle.textContent =
                "Can I ask something?"

            responseText.innerHTML = `
                <p>
                    You already have someone special in your heart,
                    and I respect that.
                </p>

                <p>
                    I'm just a little curious.
                </p>

                <p class="main-question">
                    Would you tell me who the lucky boy is?
                </p>

                <p>
                    Only if you're comfortable sharing.
                    You don't have to tell me anything you don't want to.
                </p>
            `;

            continueButton.textContent =
                "I'd rather not  →";

            continueButton.onclick = function () {

                startSadAnimation();

                responseTitle.textContent =
                    "That's completely okay.";

                responseText.innerHTML = `
                    <p>
                        You don't have to share anything
                        you're not comfortable sharing.
                    </p>

                    <p>
                        I respect your privacy.
                    </p>
                `;

                continueButton.textContent =
                    "Continue  →";

                continueButton.onclick = function () {
                    clearMood();
                    nextScreen("screen6");
                };
            };
        };

        nextScreen("screen5");

        return;
    }


    /* -----------------------------------------
       OTHER REASON
    ----------------------------------------- */

    if (option === "other") {

        clearMood();

        responseSymbol.textContent = "💬";

        responseLabel.textContent =
            "YOU CAN BE HONEST";

        responseTitle.textContent =
            "You can tell me.";

        responseText.innerHTML = `
            <p>
                Maybe there is something I don't know.
            </p>

            <p>
                You don't have to explain it here if you don't want to.
                If you'd rather tell me directly, you can message me.
            </p>
        `;

        whatsappArea.classList.remove("hidden");

        nextScreen("screen5");

        return;
    }

}


/* =========================================================
   FRIENDSHIP ANSWER
========================================================= */

function friendshipAnswer(accepted) {

    const responseTitle =
        document.getElementById("responseTitle");

    const responseLabel =
        document.getElementById("responseLabel");

    const responseSymbol =
        document.getElementById("responseSymbol");

    const responseText =
        document.getElementById("responseText");

    const friendshipArea =
        document.getElementById("friendshipArea");

    const continueButton =
        document.getElementById("continueResponseBtn");


    friendshipArea.classList.add("hidden");


    /* -----------------------------------------
       ACCEPTED
    ----------------------------------------- */

    if (accepted) {

        startLoveAnimation();

        responseSymbol.textContent = "🥹❤️";

        responseLabel.textContent =
            "THANK YOU";

        responseTitle.textContent =
            "I'm really happy.";

        responseText.innerHTML = `
            <p>
                Thank you for accepting me as your friend.
            </p>

            <p>
                I honestly didn't know what your answer would be,
                so this means a lot to me.
            </p>

            <p>
                I'll respect your boundaries and your space.
                I won't expect anything from you just because
                we're friends.
            </p>

            <p class="highlight-text">
                We can just talk normally, whenever you feel comfortable.
                ❤️
            </p>
        `;

        continueButton.textContent =
            "More Information  ♡";

        continueButton.classList.remove("hidden");

        continueButton.onclick = function () {

            clearMood();
            nextScreen("screen6");
        };

        return;
    }


    /* -----------------------------------------
       REJECTED
    ----------------------------------------- */

    startSadAnimation();

    responseSymbol.textContent = "🥺";

    responseLabel.textContent =
        "I UNDERSTAND";

    responseTitle.textContent =
        "Okay… I understand.";

    responseText.innerHTML = `
        <p>
            I'm sorry if this made you uncomfortable.
        </p>

        <p>
            Thank you for being honest with me.
        </p>

        <p>
            I won't argue with you or try to change your mind.
            I'll respect your decision.
        </p>

        <p class="highlight-text">
            Take care of yourself and always be happy. ❤️
        </p>
    `;

    continueButton.textContent =
        "Close  ♡";

    continueButton.classList.remove("hidden");

    continueButton.onclick = function () {
        closeWebsite();
    };

}


/* =========================================================
   WHATSAPP
========================================================= */

function openWhatsApp() {

    const cleanNumber =
        whatsappNumber.replace(/\D/g, "");

    if (
        !cleanNumber ||
        cleanNumber === "91XXXXXXXXXX"
    ) {

        alert(
            "Please add your WhatsApp number in script.js first."
        );

        return;
    }

    window.open(
        "https://wa.me/" + cleanNumber,
        "_blank"
    );
}


/* =========================================================
   PASSWORD
========================================================= */

function unlockFinalMessage() {

    const input =
        document.getElementById("passwordInput");

    const error =
        document.getElementById("passwordError");

    const value =
        input.value.trim();


    if (value === finalPassword) {

        error.textContent = "";

        input.value = "";

        clearMood();

        nextScreen("screen8");

        return;
    }


    error.textContent =
        "That password isn't correct. Please try again.";

    input.classList.remove("password-shake");

    void input.offsetWidth;

    input.classList.add("password-shake");
}


/* =========================================================
   ENTER KEY FOR PASSWORD
========================================================= */

document.addEventListener("keydown", function(event) {

    if (
        event.key === "Enter" &&
        currentScreen === "screen7"
    ) {

        unlockFinalMessage();
    }

});


/* =========================================================
   FINISH WEBSITE
========================================================= */

function finishWebsite() {

    clearMood();

    nextScreen("finalScreen");
}


/* =========================================================
   CLOSE WEBSITE
========================================================= */

function closeWebsite() {

    clearMood();

    const allScreens =
        document.querySelectorAll(".screen");

    allScreens.forEach(screen => {
        screen.classList.remove("active");
    });

    const final =
        document.getElementById("finalScreen");

    final.classList.add("active");

    currentScreen = "finalScreen";
}


/* =========================================================
   PASSWORD SHAKE
========================================================= */

const style = document.createElement("style");

style.textContent = `
    .password-shake {
        animation: passwordShake 0.4s ease;
    }

    @keyframes passwordShake {

        0%,
        100% {
            transform: translateX(0);
        }

        20% {
            transform: translateX(-7px);
        }

        40% {
            transform: translateX(7px);
        }

        60% {
            transform: translateX(-5px);
        }

        80% {
            transform: translateX(5px);
        }
    }
`;

document.head.appendChild(style);


/* =========================================================
   INITIALISE
========================================================= */

document.addEventListener("DOMContentLoaded", function() {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const first =
        document.getElementById("screen1");

    if (first) {
        first.classList.add("active");
    }

    currentScreen = "screen1";

});