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
}
