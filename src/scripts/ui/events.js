export function setupHandlers() {
  handleStart();
}

function handleStart() {
  const startBtn = document.querySelector(".start-btn");
  const cpuGameboard = document.querySelector(".cpu-gameboard");

  // pointer-events
  // disabled property
  startBtn.addEventListener("click", () => {
    console.log(1);
    startBtn.style.pointerEvents = "none";
    cpuGameboard.style.pointerEvents = "auto";
  });
}
