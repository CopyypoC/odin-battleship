import { Gameboard } from "../gameboard.js";

describe("Gameboard creation", () => {
  test("Gameboard creates a 10x10 grid", () => {
    const gameboard = new Gameboard();

    expect(gameboard.board.length).toBe(10);
    gameboard.board.forEach((row) => {
      expect(row.length).toBe(10);
    });
  });
});

describe("valid ship placements", () => {
  const cases = [
    {
      start: [0, 0],
      direction: "right",
      endPos: [
        [0, 0],
        [0, 1],
      ],
    },
    {
      start: [0, 1],
      direction: "left",
      endPos: [
        [0, 1],
        [0, 0],
      ],
    },
    {
      start: [1, 0],
      direction: "up",
      endPos: [
        [1, 0],
        [0, 0],
      ],
    },
    {
      start: [0, 0],
      direction: "down",
      endPos: [
        [0, 0],
        [1, 0],
      ],
    },
  ];

  test.each(cases)(
    "places ship length $length $direction from $start",
    ({ start, direction, endPos }) => {
      const gameboard = new Gameboard();
      const ships = gameboard.getShips();
      const ship = ships[0];
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
      direction: "left",
    },
    {
      start: [0, 0],
      direction: "up",
    },
    {
      start: [9, 0],
      direction: "down",
    },
    {
      start: [0, 9],
      direction: "right",
    },
  ];

  test.each(cases)(
    "throw error for placing ship $direction from $start",
    ({ start, direction }) => {
      const gameboard = new Gameboard();
      const ships = gameboard.getShips();
      const ship = ships[0];

      expect(() => {
        gameboard.placeShip(ship, start, direction);
      }).toThrow();
    }
  );

  test("throw error for overlapping ships", () => {
    const gameboard = new Gameboard();
    const ships = gameboard.getShips();
    gameboard.placeShip(ships[0], [0, 0], "right");

    expect(() => {
      gameboard.placeShip(ships[1], [1, 0], "up");
    }).toThrow();
  });
});

describe("receiveAttack method", () => {
  const gameboard = new Gameboard();
  const ships = gameboard.getShips();
  const ship = ships[0];

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
  const ships = gameboard.getShips();

  for (let i = 0; i < ships.length; i++) {
    gameboard.placeShip(ships[i], [i, 0], "right");
  }

  test("false for 0 hits on ships", () => {
    expect(gameboard.allShipsSunk()).toBe(false);
  });

  test("true for all ships sunk", () => {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        gameboard.receiveAttack([row, col]);
      }
    }

    expect(gameboard.allShipsSunk()).toBe(true);
  });
});

describe("create ships", () => {
  const gameboard = new Gameboard();
  const ships = gameboard.getShips();
  test("5 ships max", () => {
    expect(ships.length).toBe(5);
  });
});
