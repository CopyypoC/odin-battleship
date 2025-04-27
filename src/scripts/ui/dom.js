import { createCustomElement } from "./dom-helpers.js";

const gameboardContainer = document.querySelector(".gameboard-container");

export function displayBoard(board) {
  const gameboard = createCustomElement("div", ["gameboard"]);

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
