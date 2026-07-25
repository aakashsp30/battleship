export function getCellDisplayState(gameboard, x, y, revealShips) {
  const board = gameboard.getBoard();
  const wasAttacked = gameboard
    .getAttackedCells()
    .some(([ax, ay]) => ax === x && ay === y);

  if (wasAttacked) {
    const wasMiss = gameboard
      .getMissedAttacks()
      .some(([ax, ay]) => ax === x && ay === y);
    return wasMiss ? "miss" : "hit";
  }

  if (board[x][y] !== null && revealShips) {
    return "ship";
  }
  return "empty";
}

export function renderBoard(gameboard, container, revealShips) {
  container.innerHTML = "";

  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 9; y++) {
      const state = getCellDisplayState(gameboard, x, y, revealShips);
      const cell = document.createElement("div");
      cell.className = `cell ${state}`;
      cell.dataset.x = x;
      cell.dataset.y = y;
      container.appendChild(cell);
    }
  }
}

export function renderGame(state) {
  renderBoard(
    state.human.gameboard,
    document.getElementById("human-board"),
    true
  );
  renderBoard(
    state.computer.gameboard,
    document.getElementById("computer-board"),
    false
  );
}
