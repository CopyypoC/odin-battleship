import { Gameboard } from "../gameboard.js";

test("Gameboard creates a 10x10 grid", () => {
  const gameboard = new Gameboard();

  expect(gameboard.board.length).toBe(10);
  gameboard.board.forEach((row) => {
    expect(row.length).toBe(10);
  });
});

test.todo("places a 2 length ship on [0,0] and [0,1]");
