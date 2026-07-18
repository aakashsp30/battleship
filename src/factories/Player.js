import { GameBoard } from "./Gameboard";

export function Player(type) {
  const gameboard = GameBoard();
  return {
    type,
    gameboard,
  };
}
