import { Player } from "../factories/Player";

describe("Player Factory", () => {
  test("A player is created with the correct type", () => {
    const player = Player("human");
    expect(player.type).toBe("human");
  });

  test("A player has a board that is a working Gameboard", () => {
    const player = Player("computer");
    player.gameboard.placeShip(3, 2, 5, "horizontal");
    const board = player.gameboard.getBoard();
    expect(board[2][5]).not.toBeNull();
    expect(board[3][5]).not.toBeNull();
    expect(board[4][5]).not.toBeNull();
  });
});
