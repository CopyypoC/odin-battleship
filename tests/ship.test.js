import { Ship } from "../ship.js";

test("ship with 1 hit", () => {
  const ship = new Ship(1);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("ship is sunk with 1 length and 1 hit", () => {
  const ship = new Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
