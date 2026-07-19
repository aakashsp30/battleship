import { Ship } from "./Ship";

export function GameBoard() {
  const board = Array.from({ length: 10 }, () => Array(10).fill(null));
  const attackedCells = [];
  const missedAttacks = [];

  function getShipCells(x, y, length, direction) {
    const cells = [];
    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        cells.push([x + i, y]);
      } else {
        cells.push([x, y + i]);
      }
    }
    return cells;
  }

  function placeShip(length, x, y, direction) {
    const ship = Ship(length);
    const cells = getShipCells(x, y, length, direction);
    for (let i = 0; i < cells.length; i++) {
      const [cx, cy] = cells[i];
      if (cx < 0 || cx > 9 || cy < 0 || cy > 9) {
        return false;
      }
    }

    for (let i = 0; i < cells.length; i++) {
      const [cx, cy] = cells[i];
      if (board[cx][cy] != null) {
        return false;
      }
    }

    for (let i = 0; i < cells.length; i++) {
      const [cx, cy] = cells[i];
      board[cx][cy] = ship;
    }
    return true;
  }

  function getBoard() {
    return board;
  }

  function getAttackedCells() {
    return attackedCells;
  }

  function getMissedAttacks() {
    return missedAttacks;
  }

  function receiveAttack(x, y) {
    attackedCells.push([x, y]);
    if (board[x][y] != null) {
      board[x][y].hit();
    } else {
      missedAttacks.push([x, y]);
    }
  }

  function allShipsSunk() {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (board[x][y] !== null && !board[x][y].isSunk()) {
          return false;
        }
      }
    }
    return true;
  }

  return {
    placeShip,
    receiveAttack,
    getBoard,
    getAttackedCells,
    getMissedAttacks,
    allShipsSunk,
  };
}
