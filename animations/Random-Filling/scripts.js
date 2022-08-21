const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let eyes;
canvas.width = innerWidth;
canvas.height = innerHeight;
let colorsArray = [];
let max = 10;
let min = 2;

const random_rgb = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);

  return "rgb(" + r + "," + g + "," + b + ")";
};

function random_color(num) {
  for (let i = 0; i < num; i++) {
    colorsArray.push(random_rgb());
  }
}

function usableColor(color, alpha = 1) {
  return `rgba(${color.r},${color.g},${color.b}, ${alpha})`;
}

// random_color(3);

colorsArray.push('#46C19A');
colorsArray.push('#CBC37D');
colorsArray.push('#35827D');

// particles
class Eye {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function init() {
  eyes = [];
  let nParticles = 9999;
  let guardian = 99;
  let counter = 0;

  let cols = Math.floor(canvas.width);
  let rows = Math.floor(canvas.height);

  let grid = []
  let inc = 9999;
  
  let x = 0;
  for (let i = 0; i < rows; i++) {
    x += inc;
    let y = 0;
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      y += inc;
      grid[i][j] = colorsArray[Math.floor(Math.abs(noise.simplex2(x, y)) * colorsArray.length)];

    }
  }

  while (eyes.length < nParticles && counter < guardian) {
    counter = 0;

    let eye = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: min,
    };

    while (!isValid(eye)) {
      eye.x = Math.random() * canvas.width;
      eye.y = Math.random() * canvas.height;
      eye.radius = min;
      counter++;
    }

    while (isValid(eye)) {
      eye.radius += 1;
    }

    eyes.push(new Eye(eye.x, eye.y, eye.radius));
  }

  for (i = 0; i < eyes.length; i++) {
    eyes[i].radius -= 1
    eyes[i].color = grid[Math.floor(eyes[i].y)][Math.floor(eyes[i].x)]
    eyes[i].draw();
  }
}

function isValid(c) {
  if (c.radius > max) return false;

  if (c.y + c.radius > canvas.height) {
    return false;
  }

  if (c.y - c.radius < 0) {
    return false;
  }

  if (c.x + c.radius > canvas.width) {
    return false;
  }

  if (c.x - c.radius < 0) {
    return false;
  }

  for (i = 0; i < eyes.length; i++) {
    let previousEye = eyes[i];
    let dx = c.x - previousEye.x;
    let dy = c.y - previousEye.y;
    let distance = dx * dx + dy * dy;
    if (
      distance <
      c.radius * c.radius * 2 + previousEye.radius * previousEye.radius * 2
    ) {
      return false;
    }
  }

  return true;
}

init();
