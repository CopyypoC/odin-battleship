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

  #outOfBounds(row, col) {
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      return true;
    }
    return false;
  }

  placeShip(ship, start, direction) {
    let [row, col] = start;
    for (let i = 0; i < ship.length; i++) {
      if (this.#outOfBounds(row, col)) {
        throw new Error("Ships placed out of bounds, 0-9 limit");
      }
      switch (direction) {
        case "up":
          this.board[row--][col] = ship;
          break;
        case "down":
          this.board[row++][col] = ship;
          break;
        case "left":
          this.board[row][col--] = ship;
          break;
        case "right":
          this.board[row][col++] = ship;
          break;
      }
    }
  }

  receiveAttack(coord) {
    const [row, col] = coord;
    this.board[row][col].hit();
  }
}
