import { Player } from "./factories/Player.js";
let human, computer, winner;
let targetQueue = [];
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

function clearHumanShips() {
  human = Player("human");
}

function placeHumanShip(length, x, y, direction) {
  return human.gameboard.placeShip(length, x, y, direction);
}

function playRound(x, y) {
  let humanAttackResult, computerAttackResult;
  if (!isGameOver()) {
    humanAttackResult = computer.gameboard.receiveAttack(x, y);
    if (!isGameOver()) {
      const [compX, compY] = getComputerMove();
      computerAttackResult = human.gameboard.receiveAttack(compX, compY);
      if (computerAttackResult === "hit") {
        const neighbors = getAdjacentCells(compX, compY);
        const validNeighbors = neighbors.filter(([nx, ny]) => {
          const inBounds = nx >= 0 && nx <= 9 && ny >= 0 && ny <= 9;
          const alreadyAttacked = human.gameboard
            .getAttackedCells()
            .some(([ax, ay]) => ax === nx && ay === ny);
          return inBounds && !alreadyAttacked;
        });
        targetQueue.push(...validNeighbors);
      }
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

function getAdjacentCells(x, y) {
  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
}

function getComputerMove() {
  if (targetQueue.length !== 0) {
    return targetQueue.pop();
  } else {
    return legalCompMove();
  }
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

export {
  initGame,
  playRound,
  currentState,
  rerollHumanShips,
  clearHumanShips,
  placeHumanShip,
  SHIP_LENGTHS,
};
