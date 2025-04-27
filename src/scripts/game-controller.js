import { Player } from "./player.js";

export class GameController {
  constructor() {
    this.humanPlayer = new Player();
    this.cpuPlayer = new Player();
  }

  placeShips() {
    const humanBoard = this.humanPlayer.gameboard;
    const cpuBoard = this.cpuPlayer.gameboard;
    // Hardcode for now, need a check to make sure all
    // ships are placed
    const cpuShips = this.cpuPlayer.gameboard.getShips();
    for (let i = 0; i < cpuShips.length; i++) {
      cpuBoard.placeShip(cpuShips[i], [i, 0], "right");
    }

    const humanShips = this.humanPlayer.gameboard.getShips();
    for (let i = 0; i < humanShips.length; i++) {
      humanBoard.placeShip(humanShips[i], [i, 0], "right");
    }
  }
}
