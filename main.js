import {Car} from './car.js';
import { Tile } from './tile.js';

const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");

let controlsWASD = {
  forward: 'w',
  backward: 's',
  left: 'a',
  right: 'd',
};

let controlsArrow = {
  forward: 'ArrowUp',
  backward: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
};


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let keys = {};

document.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

document.addEventListener("keydown", (event) => {
    if (event.key === 'w') keys.w = true;
    if (event.key === 'a') keys.a = true;
    if (event.key === 's') keys.s = true;
    if (event.key === 'd') keys.d = true;
});

document.addEventListener("keyup", (event) => {
    if (event.key === 'w') keys.w = false;
    if (event.key === 'a') keys.a = false;
    if (event.key === 's') keys.s = false;
    if (event.key === 'd') keys.d = false;
});

const tiles = [];

const cars = [];

cars.push(new Car(0.5, 0.5, controlsWASD, keys, "/assets/car/red_truck.png", "/assets/tile/red_tile.png", "red"));
cars.push(new Car(0.5, 0.5, controlsArrow, keys, "/assets/car/blue_truck.png", "/assets/tile/blue_tile.png", "blue"));

for(let i = 0; i < 32; i++) {
  for(let j = 0; j < 16; j++) {
    tiles.push(new Tile(i, j, "/assets/tile/default_tile.png"));
  }
}

const startTime = Date.now();

function loop() {
  let timeLeft = Math.max(0, 60 - (Date.now() - startTime) / 1000);
  let hasTimeLeft = timeLeft > 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let redCount = 0;
  let blueCount = 0;

  for (let tile of tiles) {
    tile.draw();
    tile.update(cars);

    if (tile.color === "red") redCount++;
    if (tile.color === "blue") blueCount++;
  }

  for (let car of cars) {
    car.draw();
    if (hasTimeLeft) car.update();
  }

  let redPercentage = Math.floor((redCount / tiles.length) * 100);
  let bluePercentage = Math.floor((blueCount / tiles.length) * 100);

  ctx.fillStyle = "green";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(`${redPercentage}%   ${bluePercentage}%`, canvas.width / 2, 10);

  ctx.fillStyle = "green";
  ctx.font = "30px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`${Math.ceil(timeLeft)}s`, 10, 10);

  if (!hasTimeLeft) {
    ctx.fillRect(canvas.width / 2 - 200, canvas.height / 2 - 100, 400, 200);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    let doneText = "Tie!";
    if (redPercentage > bluePercentage) doneText = "Red wins!";
    else if (bluePercentage > redPercentage) doneText = "Blue wins!";

    ctx.fillText(doneText, canvas.width / 2, canvas.height / 2);
  }

  requestAnimationFrame(loop);
}

loop();