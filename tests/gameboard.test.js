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
    "places ship length $length $direction from $start",
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

  const hitCountCases = [
    {
      ship: ship,
      coord: [1, 0],
      hits: 0,
    },
    {
      ship: ship,
      coord: [0, 0],
      hits: 1,
    },
  ];

  const locationCases = [
    {
      coord: [1, 0],
      shot: null,
    },
    {
      coord: [0, 0],
      shot: "hit",
    },
  ];

  test.each(hitCountCases)("$hits hits for $coord", ({ ship, coord, hits }) => {
    gameboard.receiveAttack(coord);
    expect(ship.hits).toBe(hits);
  });

  test.each(locationCases)("shot '$shot' for $coord", ({ coord, shot }) => {
    const [row, col] = coord;
    expect(gameboard.board[row][col]).toBe(shot);
  });
});

describe("allShipsSunk method", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  gameboard.placeShip(ship, [0, 0], "right");
  gameboard.receiveAttack([0, 0]);

  test("false for 1 hit on ship of length 2", () => {
    expect(gameboard.allShipsSunk()).toBe(false);
  });

  test("true for 2 hits on ship of length 2", () => {
    gameboard.receiveAttack([0, 1]);
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
