import { Player } from "./factories/Player";
let human, computer, winner;
const SHIP_LAYOUT = [
  { length: 5, x: 0, y: 0, direction: "horizontal" },
  { length: 4, x: 0, y: 2, direction: "horizontal" },
  { length: 3, x: 0, y: 4, direction: "horizontal" },
  { length: 3, x: 0, y: 6, direction: "horizontal" },
  { length: 2, x: 0, y: 8, direction: "horizontal" },
];

function initGame() {
  human = Player("human");
  computer = Player("computer");
  SHIP_LAYOUT.forEach((ship) => {
    human.gameboard.placeShip(ship.length, ship.x, ship.y, ship.direction);
    computer.gameboard.placeShip(ship.length, ship.x, ship.y, ship.direction);
  });
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

export { initGame, playRound, currentState };
