import { GameController } from "./game/game-controller.js";
import { displayBoard, displayShips } from "./ui/dom.js";

const gameController = new GameController();
displayBoard(gameController.humanGameboard.board);
displayBoard(gameController.cpuGameboard.board, false);
gameController.placeShips();
displayShips(gameController.humanGameboard.board);
// Make new gameController
// Set up event listeners
// Pass board to dom.js for initial rendering
