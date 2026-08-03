export function getCellDisplayState(gameboard, x, y, revealShips) {
  const board = gameboard.getBoard();
  const wasAttacked = gameboard
    .getAttackedCells()
    .some(([ax, ay]) => ax === x && ay === y);

  if (wasAttacked) {
    const wasMiss = gameboard
      .getMissedAttacks()
      .some(([ax, ay]) => ax === x && ay === y);
    return wasMiss ? "miss" : "hit";
  }

  if (board[x][y] !== null && revealShips) {
    return "ship";
  }
  return "empty";
}

export function renderBoard(
  gameboard,
  container,
  revealShips,
  isDroppable,
  onDrop
) {
  container.innerHTML = "";

  for (let y = 0; y <= 9; y++) {
    for (let x = 0; x <= 9; x++) {
      const state = getCellDisplayState(gameboard, x, y, revealShips);
      const cell = document.createElement("div");
      cell.className = `cell ${state}`;
      cell.dataset.x = x;
      cell.dataset.y = y;

      if (isDroppable) {
        cell.addEventListener("dragover", (e) => e.preventDefault());
        cell.addEventListener("drop", (e) => {
          e.preventDefault();
          const length = parseInt(e.dataTransfer.getData("length"));
          const direction = e.dataTransfer.getData("direction");
          const x = parseInt(cell.dataset.x);
          const y = parseInt(cell.dataset.y);
          onDrop(x, y, length, direction);
        });
      }
      container.appendChild(cell);
    }
  }
}

export function renderPalette(remainingShips, container) {
  container.innerHTML = "";
  remainingShips.forEach((length) => {
    const pdiv = document.createElement("div");
    pdiv.className = "palette-ship";
    pdiv.dataset.length = length;
    pdiv.dataset.direction = "horizontal";

    const segementsContainer = document.createElement("div");
    segementsContainer.className = "palette-ship-segments";
    segementsContainer.draggable = true;

    segementsContainer.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("length", pdiv.dataset.length);
      e.dataTransfer.setData("direction", pdiv.dataset.direction);
    });

    for (let i = 0; i < length; i++) {
      const cdiv = document.createElement("div");
      cdiv.className = "palette-ship-segment";
      segementsContainer.appendChild(cdiv);
    }
    pdiv.appendChild(segementsContainer);

    const rotateBtn = document.createElement("button");
    rotateBtn.textContent = "Rotate";
    rotateBtn.addEventListener("click", () => {
      pdiv.dataset.direction =
        pdiv.dataset.direction === "horizontal" ? "vertical" : "horizontal";
      segementsContainer.classList.toggle("vertical");
    });
    pdiv.appendChild(rotateBtn);

    container.appendChild(pdiv);
  });
}

export function renderGame(state) {
  renderBoard(
    state.human.gameboard,
    document.getElementById("human-board"),
    true
  );
  renderBoard(
    state.computer.gameboard,
    document.getElementById("computer-board"),
    false
  );
}
