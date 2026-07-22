import { getCellDisplayState } from "../../Domcontroller";
import { GameBoard } from "../factories/Gameboard";

describe("Domcontroller", () => {
  test("Not attacked, no ship", () => {
    const gameboard = GameBoard();
    const result = getCellDisplayState(gameboard, 2, 5, true);
    expect(result).toBe("empty");
  });

  test("Not attacked, has ship", () => {
    const gameboard = GameBoard();
    gameboard.placeShip(3, 2, 5, "horizontal");
    const result = getCellDisplayState(gameboard, 2, 5, true);
    expect(result).toBe("ship");
  });

  test("Not attacked, has shippp", () => {
    const gameboard = GameBoard();
    gameboard.placeShip(3, 2, 5, "horizontal");
    const result = getCellDisplayState(gameboard, 2, 5, false);
    expect(result).toBe("empty");
  });

  test("Attacked, was a miss", () => {
    const gameboard = GameBoard();
    gameboard.placeShip(3, 2, 5, "horizontal");
    gameboard.receiveAttack(0, 0);
    const result = getCellDisplayState(gameboard, 0, 0, false);
    expect(result).toBe("miss");
  });

  test("Attacked, was a hit", () => {
    const gameboard = GameBoard();
    gameboard.placeShip(3, 2, 5, "horizontal");
    gameboard.receiveAttack(2, 5);
    const result = getCellDisplayState(gameboard, 2, 5, false);
    expect(result).toBe("hit");
  });
});
