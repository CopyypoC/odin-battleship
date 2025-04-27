import { Ship } from "../src/scripts/ship.js";

test("ship with 2 hits", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("ship is sunk with 2 length and 2 hits", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("throw when ship is not between 2-5 length", () => {
  expect(() => {
    new Ship(1);
  }).toThrow("Must be between 2-5 length.");
});
