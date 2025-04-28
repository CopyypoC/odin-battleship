import { Player } from "./player.js";

export class GameController {
  constructor() {
    this.humanPlayer = new Player();
    this.cpuPlayer = new Player();
    this.humanGameboard = this.humanPlayer.gameboard;
    this.cpuGameboard = this.cpuPlayer.gameboard;
    this.currentTarget = this.cpuPlayer;
    this.placeShips();
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

  swapTarget() {
    if (this.currentTarget === this.humanPlayer) {
      this.currentTarget = this.cpuPlayer;
    } else {
      this.currentTarget = this.humanPlayer;
    }
  }

  isHitAt(row, col) {
    return this.currentTarget.gameboard.board[row][col] === "hit"
      ? true
      : false;
  }

  attackAndCheck(row, col) {
    this.currentTarget.gameboard.receiveAttack([row, col]);
    const isHit = this.isHitAt(row, col);
    return isHit;
  }

  getCpuAttack() {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);

    while (!this.currentTarget.gameboard.checkValidCell([row, col])) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    }

    return [row, col];
  }

  resolveWinner() {
    if (this.currentTarget.gameboard.allShipsSunk()) {
      this.reset();
      return true;
    } else {
      this.swapTarget();
      return false;
    }
  }

  reset() {
    this.humanPlayer = new Player();
    this.cpuPlayer = new Player();
    this.humanGameboard = this.humanPlayer.gameboard;
    this.cpuGameboard = this.cpuPlayer.gameboard;
    this.currentTarget = this.cpuPlayer;
    this.placeShips();
  }
}
