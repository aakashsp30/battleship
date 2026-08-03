import { renderBoard, renderGame, renderPalette } from "./Domcontroller.js";
import {
  clearHumanShips,
  currentState,
  initGame,
  placeHumanShip,
  playRound,
  rerollHumanShips,
  SHIP_LENGTHS,
} from "./Gamecontroller.js";
initGame();

renderGame(currentState());
const rerollbtn = document.getElementById("reroll-btn");
rerollbtn.addEventListener("click", () => {
  rerollHumanShips();
  remainingShips = []
  renderGame(currentState());
  renderPalette(remainingShips, document.getElementById("ship-palette"));
});

const cb = document.getElementById("computer-board");
cb.classList.add("hidden");

const startbtn = document.getElementById("start-btn");
let gameStarted = false;
startbtn.addEventListener("click", () => {
  if (!allHumanShipsPlaced()) {
    document.getElementById("status").textContent =
      "Place all your ships before starting!";
    return;
  }
  document.getElementById("status").textContent =
    "Game started! Attack the enemy board.";
  rerollbtn.classList.add("hidden");
  clearbtn.classList.add("hidden");
  startbtn.classList.add("hidden");
  cb.classList.remove("hidden");
  gameStarted = true;
  renderGame(currentState());
});

const clearbtn = document.getElementById("clear-btn");
let remainingShips = [];
clearbtn.addEventListener("click", () => {
  if (gameStarted) return;
  clearHumanShips();
  remainingShips = [...SHIP_LENGTHS];
  renderPlacementPhase();
});

function renderPlacementPhase() {
  const humanBoardEl = document.getElementById("human-board");
  renderBoard(
    currentState().human.gameboard,
    humanBoardEl,
    true,
    true,
    handleDrop
  );
  renderPalette(remainingShips, document.getElementById("ship-palette"));
}

function handleDrop(x, y, length, direction) {
  const success = placeHumanShip(length, x, y, direction);
  if (success) {
    const index = remainingShips.indexOf(length);
    remainingShips.splice(index, 1);
    renderPlacementPhase();
  }
}

function allHumanShipsPlaced() {
  const board = currentState().human.gameboard.getBoard();
  let occupiedCount = 0;
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell !== null) occupiedCount++;
    });
  });
  return occupiedCount === 17;
}

cb.addEventListener("click", (e) => {
  if (!gameStarted) return;
  if (!e.target.classList.contains("cell")) return;
  let x = parseInt(e.target.dataset.x);
  let y = parseInt(e.target.dataset.y);
  const alreadyAttacked = currentState()
    .computer.gameboard.getAttackedCells()
    .some(([ax, ay]) => ax === x && ay === y);
  if (alreadyAttacked) return;
  const result = playRound(x, y);
  renderGame(currentState());
  const status = document.getElementById("status");
  if (result.gameOver) {
    status.textContent = `Game Over! ${result.winner} wins!`;
  }
});
