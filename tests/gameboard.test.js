import { Gameboard } from "../gameboard.js";
import { Ship } from "../ship.js";

test("Gameboard creates a 10x10 grid", () => {
  const gameboard = new Gameboard();

  expect(gameboard.board.length).toBe(10);
  gameboard.board.forEach((row) => {
    expect(row.length).toBe(10);
  });
});

describe("valid ship placements", () => {
  const cases = [
    {
      start: [0, 0],
      length: 2,
      direction: "right",
      endPos: [
        [0, 0],
        [0, 1],
      ],
    },
    {
      start: [0, 1],
      length: 2,
      direction: "left",
      endPos: [
        [0, 1],
        [0, 0],
      ],
    },
    {
      start: [1, 0],
      length: 2,
      direction: "up",
      endPos: [
        [1, 0],
        [0, 0],
      ],
    },
    {
      start: [0, 0],
      length: 2,
      direction: "down",
      endPos: [
        [0, 0],
        [1, 0],
      ],
    },
  ];

  test.each(cases)(
    "places ship $direction from $start",
    ({ start, length, direction, endPos }) => {
      const gameboard = new Gameboard();
      const ship = new Ship(length);
      gameboard.placeShip(ship, start, direction);

      for (const [row, col] of endPos) {
        expect(gameboard.board[row][col]).toBe(ship);
      }
    }
  );
});

describe("invalid ship placements", () => {
  const cases = [
    {
      start: [0, 0],
      length: 2,
      direction: "left",
    },
    {
      start: [0, 0],
      length: 2,
      direction: "up",
    },
    {
      start: [9, 0],
      length: 2,
      direction: "down",
    },
    {
      start: [0, 9],
      length: 2,
      direction: "right",
    },
  ];

  test.each(cases)(
    "throw error for placing ship $direction from $start",
    ({ start, length, direction }) => {
      const gameboard = new Gameboard();
      const ship = new Ship(length);

      expect(() => {
        gameboard.placeShip(ship, start, direction);
      }).toThrow();
    }
  );
});

describe("receiveAttack method", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  gameboard.placeShip(ship, [0, 0], "right");

  const cases = [
    {
      coord: [0, 0],
      hits: 1,
    },
    {
      coord: [1, 0],
      hits: null,
    },
  ];

  test.each(cases)("$hits hits for $coord", ({ coord, hits }) => {
    const [row, col] = coord;
    gameboard.receiveAttack(coord);
    expect(gameboard.board[row][col].hits).toBe(hits);
  });
});
