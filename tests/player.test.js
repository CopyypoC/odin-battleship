import { Player } from "../player.js";
import { Gameboard } from "../gameboard.js";

describe("player init", () => {
  const player = new Player();
  test("player has gameboard", () => {
    expect(player.gameboard instanceof Gameboard).toBe(true);
  });
});
