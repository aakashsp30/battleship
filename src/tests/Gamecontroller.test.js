import { initGame, playRound, currentState } from "../Gamecontroller";
describe("Gamecontroller", () => {
  test("attacking a cell known to have a ship registers a hit", () => {
    initGame();
    const state = currentState();
    const board = state.computer.gameboard.getBoard();

    let targetX, targetY;
    outer: for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (board[x][y] !== null) {
          targetX = x;
          targetY = y;
          break outer;
        }
      }
    }

    const result = playRound(targetX, targetY);
    expect(result.humanAttackResult).toBe("hit");
  });

  test("attacking a cell known to be empty registers a miss", () => {
    initGame();
    const state = currentState();
    const board = state.computer.gameboard.getBoard();

    let targetX, targetY;
    outer: for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (board[x][y] === null) {
          targetX = x;
          targetY = y;
          break outer;
        }
      }
    }

    const result = playRound(targetX, targetY);
    expect(result.humanAttackResult).toBe("miss");
  });

  test("initGame places all ships (17 total occupied cells)", () => {
    initGame();
    const state = currentState();
    const board = state.human.gameboard.getBoard();
    let occupiedCount = 0;
    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell !== null) occupiedCount++;
      });
    });
    expect(occupiedCount).toBe(17);
  });
});
