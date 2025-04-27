export function setupHandlers() {
  handleStart();
  handleReset();
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
