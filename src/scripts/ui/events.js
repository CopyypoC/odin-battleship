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

function handleAttack(gameController) {
  const cpuGameboard = document.querySelector(".cpu-gameboard");

  cpuGameboard.addEventListener("mousedown", (e) => {
    const row = e.target.closest("[data-row]").dataset.row;
    const col = e.target.dataset.col;
    const cell = e.target;

    if (!cell.dataset.col) return;

    if (gameController.attackAndCheck(row, col)) {
      // If ship, set hit styles
      cell.classList.add("hit");
    } else {
      // If miss, set miss styles
      cell.classList.add("miss");
    }
    cell.style.pointerEvents = "none";
    // pointer-events none on that cell
  });
}
