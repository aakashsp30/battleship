import { GameBoard } from "../factories/Gameboard";

describe("GameBoard Factory", () => {
  test("Placing a ship successfully within bounds", () => {
    const gameboard = GameBoard();
    gameboard.placeShip(3, 2, 5, "horizontal");
    const board = gameboard.getBoard();
    expect(board[2][5]).not.toBeNull();
    expect(board[3][5]).not.toBeNull();
    expect(board[4][5]).not.toBeNull();
  });

  test("Placing a ship that goes off the edge", () => {
    const gameboard = GameBoard();
    const result = gameboard.placeShip(3, 2, 9, "vertical");
    expect(result).toBe(false);
  });

  test("Attacking a cell with a ship", () => {
    const gameboard = GameBoard();
    gameboard.placeShip(3, 2, 5, "horizontal");
    gameboard.receiveAttack(2, 5);
    const board = gameboard.getBoard();
    expect(board[2][5].hits).toBe(1);
  });

  test("Attacking a cell with no ship", () => {
    const gameboard = GameBoard();
    gameboard.placeShip(3, 2, 5, "horizontal");
    gameboard.receiveAttack(0, 0);
    const misses = gameboard.getMissedAttacks();
    expect(misses).toContainEqual([0, 0]);
  });

  test("allShipsSunk / GameOver check", () => {
    const gameboard = GameBoard();
    gameboard.placeShip(1, 2, 5, "horizontal");
    gameboard.receiveAttack(2, 5);
    const report = gameboard.allShipsSunk();
    expect(report).toBe(true);
  });

  test("allShipsSunk returns false when a ship is still afloat", () => {
    const gameboard = GameBoard();
    gameboard.placeShip(2, 2, 5, "horizontal");
    gameboard.receiveAttack(2, 5);
    const report = gameboard.allShipsSunk();
    expect(report).toBe(false);
  });

  test("getAttackedCells tracks all attacked coordinates", () => {
    const gameboard = GameBoard();
    gameboard.placeShip(2, 2, 5, "horizontal");
    expect(gameboard.receiveAttack(2, 5)).toBe("hit");
    expect(gameboard.receiveAttack(3, 5)).toBe("hit");
    expect(gameboard.receiveAttack(4, 5)).toBe("miss");
    const report = gameboard.getAttackedCells();
    expect(report).toContainEqual([2, 5]);
    expect(report).toContainEqual([3, 5]);
  });
});
