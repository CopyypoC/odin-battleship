import { GameController } from "./game/game-controller.js";
import { displayBoard } from "./ui/dom.js";

const gameController = new GameController();
displayBoard(gameController.humanGameboard.board);
displayBoard(gameController.cpuGameboard.board);
// Make new gameController
// Set up event listeners
// Pass board to dom.js for initial rendering
