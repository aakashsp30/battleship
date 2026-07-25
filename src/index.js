import { renderGame } from "./Domcontroller.js";
import { currentState, initGame, playRound } from "./Gamecontroller.js";
initGame();
renderGame(currentState());
const cb = document.getElementById("computer-board");
cb.addEventListener("click", (e) => {
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
