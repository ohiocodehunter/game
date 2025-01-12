const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector(".board");
const statusText = document.querySelector(".status");
const resetButton = document.querySelector(".reset-btn");
const popupOverlay = document.querySelector(".popup-overlay");
const popupButton = document.querySelector(".popup-btn");
const winnerMessage = document.getElementById("winner-message");
let xIsNext = true;

startGame();

resetButton.addEventListener("click", startGame);
popupButton.addEventListener("click", () => {
  popupOverlay.style.display = "none";
  startGame();
});

function startGame() {
  xIsNext = true;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.classList.remove("winner");
    cell.textContent = "";
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setStatusText();
  popupOverlay.style.display = "none";
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = xIsNext ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setStatusText();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
}

function swapTurns() {
  xIsNext = !xIsNext;
}

function setStatusText() {
  statusText.textContent = `${xIsNext ? "X" : "O"}'s turn`;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    if (
      combination.every((index) => {
        return cellElements[index].classList.contains(currentClass);
      })
    ) {
      combination.forEach((index) => {
        cellElements[index].classList.add("winner");
      });
      return true;
    }
    return false;
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  if (draw) {
    statusText.textContent = "Draw!";
    winnerMessage.textContent = "It's a Draw! 🤝";
  } else {
    const winner = xIsNext ? "X" : "O";
    statusText.textContent = `${winner} Wins!`;
    winnerMessage.textContent = `Player ${winner} Wins! 👑`;
  }

  // Show popup with slight delay for better UX
  setTimeout(() => {
    popupOverlay.style.display = "flex";
  }, 500);
}
