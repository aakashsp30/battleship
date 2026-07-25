import { GameBoard } from "./Gameboard.js";

export function Player(type) {
  const gameboard = GameBoard();
  return {
    type,
    gameboard,
  };
}
