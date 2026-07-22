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
