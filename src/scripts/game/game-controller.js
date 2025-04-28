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

  isHitAt(row, col) {
    return this.currentPlayer.gameboard.board[row][col] === "hit"
      ? true
      : false;
  }

  attackAndCheck(row, col) {
    this.currentPlayer.gameboard.receiveAttack([row, col]);
    const isHit = this.isHitAt(row, col);
    return isHit;
  }

  resolveWinner() {
    if (this.currentPlayer.gameboard.allShipsSunk()) {
      this.humanPlayer = new Player();
      this.cpuPlayer = new Player();
      return true;
    } else {
      this.swapPlayer();
      return false;
    }
  }
}
