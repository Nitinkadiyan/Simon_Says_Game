let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "blue", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game on any key press
document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    console.log("Game Started");
    levelUp();
  }
});

// Flash animation for game button
function btnFlash(button) {
  button.classList.add("flash");
  setTimeout(function () {
    button.classList.remove("flash");
  }, 300);
}

// Flash animation when user clicks
function userFlash(button) {
  button.classList.add("userflash");
  setTimeout(function () {
    button.classList.remove("userflash");
  }, 300);
}

// Go to next level
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.getElementById(randColor);

  gameSeq.push(randColor);
  console.log("Game Sequence:", gameSeq);

  btnFlash(randBtn);
}

// Handle button press by user
function btnPress() {
  const userColor = this.getAttribute("id");
  userSeq.push(userColor);

  userFlash(this);
  console.log("User Sequence:", userSeq);

  checkAnswer(userSeq.length - 1);
}

// Add click event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let buttonElement of allBtns) {
  buttonElement.addEventListener("click", btnPress);
}

// Check user's current input
function checkAnswer(currentIdx) {
  if (userSeq[currentIdx] === gameSeq[currentIdx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    // Game Over
    h2.innerText = "Game Over! Press any key to restart.";
    document.body.style.backgroundColor = "red";

    setTimeout(() => {
      document.body.style.backgroundColor = "#f0f0f0";
    }, 300);

    resetGame();
  }
}

// Reset game variables
function resetGame() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  started = false;
}