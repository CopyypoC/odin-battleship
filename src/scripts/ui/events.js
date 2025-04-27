export function setupHandlers() {
  handleStart();
  handleReset();
}

const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
function handleStart() {
  const cpuGameboard = document.querySelector(".cpu-gameboard");

  startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    resetBtn.disabled = false;
    cpuGameboard.style.pointerEvents = "auto";
  });
}

function handleReset() {
  const cpuGameboard = document.querySelector(".cpu-gameboard");

  resetBtn.addEventListener("click", () => {
    resetBtn.disabled = true;
    startBtn.disabled = false;
    cpuGameboard.style.pointerEvents = "none";
  });
}
