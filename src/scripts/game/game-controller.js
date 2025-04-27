import { Player } from "./player.js";

export class GameController {
  constructor() {
    this.humanPlayer = new Player();
    this.cpuPlayer = new Player();
    this.humanGameboard = this.humanPlayer.gameboard;
    this.cpuGameboard = this.cpuPlayer.gameboard;
    this.currentPlayer = this.humanPlayer;
  }

  placeShips() {
    // Hardcode for now
    const cpuShips = this.cpuPlayer.gameboard.getShips();
    for (let i = 0; i < cpuShips.length; i++) {
      this.cpuGameboard.placeShip(cpuShips[i], [i, 0], "right");
    }

    const humanShips = this.humanPlayer.gameboard.getShips();
    for (let i = 0; i < humanShips.length; i++) {
      this.humanGameboard.placeShip(humanShips[i], [i, 0], "right");
    }
  }

  swapPlayer() {
    if (this.currentPlayer === this.humanPlayer) {
      this.currentPlayer = this.cpuPlayer;
    } else {
      this.currentPlayer = this.humanPlayer;
    }
  }

  playRound(row, col) {
    this.currentPlayer.receiveAttack([row, col]);
    if (this.currentPlayer.allShipsSunk()) {
      // some winning conditions
    }
    this.swapPlayer();
  }
}

const test = new GameController();
test.placeShips();
console.log(test.humanPlayer);
console.log(test.cpuPlayer);
