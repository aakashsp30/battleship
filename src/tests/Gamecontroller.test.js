import { initGame, playRound, currentState } from "../Gamecontroller";
describe("Gamecontroller", () => {
  test("human attack on a known ship coordinate registers a hit", () => {
    initGame();
    const result = playRound(0, 0);
    expect(result.humanAttackResult).toBe("hit");
  });

  test("attacking an empty cell registers a miss", () => {
    initGame();
    const result = playRound(9, 9);
    expect(result.humanAttackResult).toBe("miss");
  });
});
