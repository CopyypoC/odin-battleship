import { Ship } from "./ship.js";

export class Gameboard {
  constructor() {
    this.board = this.#createBoard();
  }

  #ships = this.#createShips();

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

  #createShips() {
    const arr = [];
    arr.push(new Ship(2));
    arr.push(new Ship(3));
    arr.push(new Ship(3));
    arr.push(new Ship(4));
    arr.push(new Ship(5));
    return arr;
  }

  getShips() {
    return this.#ships;
  }

  #outOfBounds(row, col) {
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      return true;
    }
    return false;
  }

  // Ship object, start [x, y], direction "left"
  placeShip(ship, start, direction) {
    let [row, col] = start;

    for (let i = 0; i < ship.length; i++) {
      if (this.#outOfBounds(row, col)) {
        throw new Error("Ships placed out of bounds, 0-9 limit");
      }

      if (this.board[row][col] instanceof Ship) {
        throw new Error("Ships cannot overlap");
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

  // coord [x, y]
  receiveAttack(coord) {
    const [row, col] = coord;
    if (this.board[row][col] instanceof Ship) {
      this.board[row][col].hit();
      this.board[row][col] = "hit";
    } else {
      this.board[row][col] = null;
    }
  }

  checkValidCell(coord) {
    const [row, col] = coord;
    if (
      this.board[row][col] instanceof Ship ||
      this.board[row][col] === "hit" ||
      this.board[row][col] === null
    ) {
      return false;
    } else {
      return true;
    }
  }

  allShipsSunk() {
    for (const ship of this.#ships) {
      if (ship.isSunk() === false) return false;
    }
    return true;
  }
}
