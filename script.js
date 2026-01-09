const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const themeToggle = document.getElementById("themeToggle");

let input = "";

buttons.forEach(btn => {
  btn.addEventListener("click", () => handle(btn.dataset.value));
});

function handle(value) {

  if (value === "AC") {
    input = "";
  }

  else if (value === "DEL") {
    input = input.slice(0, -1);
  }

  else if (value === "=") {
    try {
      input = eval(input).toString();
    } catch {
      input = "Error";
    }
  }

  else if (["+", "-", "*", "/", "%"].includes(value)) {
    if (input === "" || isOperator(input.slice(-1))) return;
    input += value;
  }

  else if (["sin", "cos", "tan"].includes(value)) {
    if (input === "") return;
    let angle = Number(input) * Math.PI / 180;
    if (value === "sin") input = Math.sin(angle).toFixed(4);
    if (value === "cos") input = Math.cos(angle).toFixed(4);
    if (value === "tan") input = Math.tan(angle).toFixed(4);
  }

  else {
    input += value;
  }

  display.value = input;
}

function isOperator(char) {
  return ["+", "-", "*", "/", "%"].includes(char);
}

/* Keyboard support */
document.addEventListener("keydown", e => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") handle(e.key);
  if (["+", "-", "*", "/", "%"].includes(e.key)) handle(e.key);
  if (e.key === "Enter") handle("=");
  if (e.key === "Backspace") handle("DEL");
  if (e.key === "Escape") handle("AC");
});

/* Theme toggle */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent =
    document.body.classList.contains("light") ? "☀️" : "🌙";
});
