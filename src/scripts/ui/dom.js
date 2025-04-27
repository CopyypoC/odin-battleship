import { createCustomElement } from "./dom-helpers.js";
import { Ship } from "../game/ship.js";

const gameboardContainer = document.querySelector(".gameboard-container");

export function displayBoard(board, isHuman = true) {
  let gameboard;
  if (isHuman) {
    gameboard = createCustomElement("div", ["gameboard", "human-gameboard"]);
  } else {
    gameboard = createCustomElement("div", ["gameboard", "cpu-gameboard"]);
  }

  for (let row = 0; row < board.length; row++) {
    const rowElement = createCustomElement(
      "div",
      ["row"],
      undefined,
      undefined,
      {
        row: row,
      },
    );

    for (let col = 0; col < board[row].length; col++) {
      const colElement = createCustomElement(
        "div",
        ["col"],
        undefined,
        undefined,
        {
          col: col,
        },
      );
      rowElement.appendChild(colElement);
    }
    gameboard.appendChild(rowElement);
  }
  gameboardContainer.appendChild(gameboard);
}

export function displayShips(board) {
  for (let row = 0; row < board.length; row++) {
    const rowElement = document.querySelector(
      `.human-gameboard [data-row="${row}"]`,
    );

    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] instanceof Ship) {
        const shipElement = rowElement.querySelector(`[data-col="${col}"]`);
        shipElement.classList.add("ship");
      }
    }
  }
}
