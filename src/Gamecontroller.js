import { Player } from "./factories/Player.js";
let human, computer, winner;
const SHIP_LENGTHS = [5, 4, 3, 3, 2];

function placeShipsRandomly(gameboard) {
  SHIP_LENGTHS.forEach((length) => {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
      placed = gameboard.placeShip(length, x, y, direction);
    }
  });
}

function initGame() {
  human = Player("human");
  computer = Player("computer");
  placeShipsRandomly(human.gameboard);
  placeShipsRandomly(computer.gameboard);
}

function rerollHumanShips() {
  human = Player("human");
  placeShipsRandomly(human.gameboard);
}

function playRound(x, y) {
  let humanAttackResult, computerAttackResult;
  if (!isGameOver()) {
    humanAttackResult = computer.gameboard.receiveAttack(x, y);
    if (!isGameOver()) {
      const [compX, compY] = legalCompMove();
      computerAttackResult = human.gameboard.receiveAttack(compX, compY);
    }
  }

  if (human.gameboard.allShipsSunk()) {
    winner = computer.type;
  } else if (computer.gameboard.allShipsSunk()) {
    winner = human.type;
  }
  return {
    humanAttackResult,
    gameOver: isGameOver(),
    winner,
    computerAttackResult,
  };
}

function legalCompMove() {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  while (
    human.gameboard.getAttackedCells().some(([ax, ay]) => ax === x && ay === y)
  ) {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  }
  return [x, y];
}

function isGameOver() {
  return human.gameboard.allShipsSunk() || computer.gameboard.allShipsSunk();
}

function currentState() {
  return {
    isGameOver: isGameOver(),
    winner,
    human,
    computer,
  };
}

export { initGame, playRound, currentState, rerollHumanShips };
