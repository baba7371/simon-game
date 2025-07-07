let UserSeq = [];
let gameSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let h2 = document.querySelector("h2");
let level = 0;
let started = false;
let highScore = 0;

let timeLimit = 5000; // 5 seconds to start
let timer;

// document.addEventListener("keypress", function () {
//     if (started == false) {
//         console.log("game started");
//         started = true;

//         levelUp();
//     }
// });

function gameFlash(btn) {
    btn.classList.add("flash");

    let sound = new Audio(`sounds/${btn.id}.mp3`);
    sound.play();
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");

    let sound = new Audio(`sounds/${btn.id}.mp3`);
    sound.play();
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    UserSeq = [];
    level++;
    h2.innerText = `Level ${level}`;


    let btnIndx = Math.floor(Math.random() * 4);
    let randomColor = btns[btnIndx]
    let randombtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randombtn);
    startTimer();
}

function startTimer() {
    clearTimeout(timer); // Clear previous if any
    timer = setTimeout(() => {
        document.querySelector("#level-title").innerHTML = `
        ⏰ Time's up!<br>Your score: <b>${level}</b><br>High Score: <b>${highScore}</b><br>
        Click "Start Game" to play again.`;
        reset();
    }, timeLimit);
}


function checkAns(idx) {

    if (UserSeq[idx] == gameSeq[idx]) {
        if (UserSeq.length == gameSeq.length) {
            clearTimeout(timer);
            setTimeout(levelUp, 1000);
        }
    } else {
        //h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
        if (level > highScore) {
            highScore = level;
        }

        document.querySelector("#level-title").innerHTML = `
        🚫 <b>Game Over!</b><br>
        Your score: <b>${level}</b><br>
        High Score: <b>${highScore}</b><br>
        Click <b>"Start Game"</b> to play again.`;

        document.body.classList.add("game-over");

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        reset();
    }
}


function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    UserSeq.push(userColor);

    checkAns(UserSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    UserSeq = [];
    level = 0;
    clearTimeout(timer);
}

document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("game-modal").style.display = "flex";
});

document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("game-modal").style.display = "none";
    if (!started) {
        startGame();
    }
});

function startGame() {
    started = true;
    levelUp();
}


document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

//Now players can use WASD or Arrow keys to play the game.

document.addEventListener("keydown", (e) => {
    if (!started) return;

    let key = e.key.toLowerCase();
    let colorMap = {
        w: "green",
        a: "red",
        s: "yellow",
        d: "blue",
        ArrowUp: "green",
        ArrowLeft: "red",
        ArrowDown: "yellow",
        ArrowRight: "blue"
    };

    if (colorMap[key]) {
        let color = colorMap[key];
        let btn = document.querySelector(`.${color}`);
        flashBtn(btn);
        userSeq.push(color);
        checkAns(userSeq.length - 1);
    }
});