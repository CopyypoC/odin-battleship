export function setupHandlers(gameController) {
  handleStart();
  handleReset();
  preventDrag();
  handleAttack(gameController);
}

const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
const randomizeBtn = document.querySelector(".randomize-btn");
function handleStart() {
  // cpuGameboard is dynamically generated, must be in function
  const cpuGameboard = document.querySelector(".cpu-gameboard");

  startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    randomizeBtn.disabled = true;
    resetBtn.disabled = false;
    cpuGameboard.style.pointerEvents = "auto";
  });
}

function handleReset() {
  const cpuGameboard = document.querySelector(".cpu-gameboard");

  resetBtn.addEventListener("click", () => {
    resetBtn.disabled = true;
    startBtn.disabled = false;
    randomizeBtn.disabled = false;
    cpuGameboard.style.pointerEvents = "none";
  });
}

function preventDrag() {
  const cpuGameboard = document.querySelector(".cpu-gameboard");

  cpuGameboard.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });
}

const modalWinner = document.querySelector(".modal-winner");
const modalLoser = document.querySelector(".modal-loser");
function handleAttack(gameController) {
  const cpuGameboard = document.querySelector(".cpu-gameboard");

  cpuGameboard.addEventListener("mousedown", (e) => {
    attackOnCpu(e, gameController);
    if (gameController.resolveWinner()) {
      modalWinner.showModal();
      return;
    }

    attackOnHuman(gameController);
    if (gameController.resolveWinner()) {
      modalLoser.showModal();
      return;
    }
  });
}

function attackOnCpu(e, gameController) {
  const row = e.target.closest("[data-row]").dataset.row;
  const col = e.target.dataset.col;
  const cell = e.target;

  if (!cell.dataset.col) return;

  if (gameController.attackAndCheck(row, col)) {
    cell.classList.add("hit");
  } else {
    cell.classList.add("miss");
  }

  cell.style.pointerEvents = "none";
}

function attackOnHuman(gameController) {
  const humanGameboard = document.querySelector(".human-gameboard");
  const coord = gameController.getCpuAttack();
  const [row, col] = coord;
  const cell = humanGameboard.querySelector(
    `[data-row="${row}"] [data-col="${col}"]`,
  );

  if (gameController.attackAndCheck(row, col)) {
    cell.classList.add("hit");
  } else {
    cell.classList.add("miss");
  }

  cell.style.pointerEvents = "none";
}
