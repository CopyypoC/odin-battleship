import { Gameboard } from "../gameboard.js";
import { Ship } from "../ship.js";

test("Gameboard creates a 10x10 grid", () => {
  const gameboard = new Gameboard();

  expect(gameboard.board.length).toBe(10);
  gameboard.board.forEach((row) => {
    expect(row.length).toBe(10);
  });
});

test("places a 2 length ship on [0,0] and [0,1]", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  const start = [0, 0];
  gameboard.placeShip(ship, start, "right");
  expect(gameboard.board[0][0] && gameboard.board[0][1]).toBe(ship);
});
