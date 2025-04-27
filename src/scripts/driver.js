import { GameController } from "./game/game-controller.js";
import { displayBoard, displayShips } from "./ui/dom.js";
import { setupHandlers } from "./ui/events.js";

const gameController = new GameController();
const humanBoard = gameController.humanGameboard.board;
const cpuBoard = gameController.cpuGameboard.board;
displayBoard(humanBoard);
displayBoard(cpuBoard, false);
gameController.placeShips();
displayShips(humanBoard);
setupHandlers();
// Make new gameController
// Set up event listeners
// Pass board to dom.js for initial rendering
