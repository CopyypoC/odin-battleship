import { Ship } from "../ship.js";

test("ship with 2 hit", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("ship is sunk with 2 length and 2 hit", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("ship is between 2-5 length", () => {
  expect(() => {
    new Ship(1);
  }).toThrow("Must be between 2-5 length.");
});
