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
    const cpuShips = this.cpuPlayer.gameboard.getShips();
    this.cpuGameboard.clearBoard();
    for (let i = 0; i < cpuShips.length; i++) {
      let invalidPlace = true;
      while (invalidPlace) {
        try {
          const row = Math.floor(Math.random() * 10);
          const col = Math.floor(Math.random() * 10);
          const direction = this.getRandomDirection();

          this.cpuGameboard.placeShip(cpuShips[i], [row, col], direction);
          invalidPlace = false;
        } catch {
          // Continue trying random numbers until a valid input
          // No need to do anything with error
        }
      }
    }
    console.log(this.cpuGameboard.board);

    const humanShips = this.humanPlayer.gameboard.getShips();
    for (let i = 0; i < humanShips.length; i++) {
      let invalidPlace = true;
      while (invalidPlace) {
        try {
          const row = Math.floor(Math.random() * 10);
          const col = Math.floor(Math.random() * 10);
          const direction = this.getRandomDirection();

          this.humanGameboard.placeShip(humanShips[i], [row, col], direction);
          invalidPlace = false;
        } catch {
          // Same as above
        }
      }
    }
  }

  getRandomDirection() {
    const directionNum = Math.floor(Math.random() * 4);
    if (directionNum === 0) return "up";
    if (directionNum === 1) return "down";
    if (directionNum === 2) return "left";
    if (directionNum === 3) return "right";
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
