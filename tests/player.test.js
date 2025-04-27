import { Player } from "../src/scripts/player.js";
import { Gameboard } from "../src/scripts/gameboard.js";

describe("player init", () => {
  const player = new Player();
  test("player has gameboard", () => {
    expect(player.gameboard instanceof Gameboard).toBe(true);
  });
});
