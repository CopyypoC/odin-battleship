import { Ship } from "./ship.js";

export class Gameboard {
  constructor() {
    this.board = this.#createBoard();
  }

  #createBoard() {
    const board = [];
    for (let row = 0; row < 10; row++) {
      const rowArr = [];
      for (let col = 0; col < 10; col++) {
        rowArr.push(col);
      }
      board.push(rowArr);
    }

    return board;
  }

  placeShip(ship, start, direction) {
    let [row, col] = start;
    for (let i = 0; i < ship.length; i++) {
      switch (direction) {
        case "up":
          this.board[row--][col] = ship;
        case "down":
          this.board[row++][col] = ship;
        case "left":
          this.board[row][col--] = ship;
        case "right":
          this.board[row][col++] = ship;
      }
    }
  }
}
