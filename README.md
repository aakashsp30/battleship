# Battleship

A browser implementation of the classic Battleship game, built with vanilla JavaScript using Test Driven Development. 

## Features

- Play against a computer opponent with legal random moves
- **Smart AI**: after landing a hit, the computer targets adjacent cells before falling back to random search
- Randomized ship placement by default, with a full manual setup flow:
  - **Reroll** — regenerate a fresh random layout
  - **Clear Board** — wipe your board and place ships yourself via **drag and drop**, with a **rotate** control per ship
  - **Start Game** — locked until all 5 ships are placed
- Fully separated game logic and DOM rendering — the core game (ships, boards, players, turns) has no dependency on the DOM and is unit tested; only the rendering/event-wiring layer touches `document`


## How the pieces fit together

- **`Ship`** is a factory tracking a ship's length and hit count.
- **`Gameboard`** owns a 10x10 grid of `Ship | null` cells, places ships (with bounds/overlap validation), and resolves attacks into hits or misses.
- **`Player`** pairs a type (`"human"` / `"computer"`) with its own `Gameboard`.
- **`Gamecontroller`** is the only place that knows about turns, the computer's move selection, and win conditions. It exposes a small public API (`initGame`, `playRound`, `currentState`, `rerollHumanShips`, `clearHumanShips`, `placeHumanShip`) that both the game logic and the DOM layer are built around.
- **`Domcontroller`** only renders — it turns gameboard state into grid `div`s and ship palette pieces, and never touches game logic directly.
- **`index.js`** is the glue: it listens for clicks/drags, calls into `Gamecontroller`, and asks `Domcontroller` to re-render.