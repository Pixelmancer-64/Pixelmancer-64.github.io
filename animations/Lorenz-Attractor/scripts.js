const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = window.innerHeight


const width = canvas.width;
const height = canvas.height;

const x0 = 0;
const y0 = 1;
const z0 = 1.05;

const a = 10;
const b = 28;
const c = 8 / 3;

let x = x0;
let y = y0;
let z = z0;

ctx.translate(width / 2, height / 2);
ctx.strokeStyle = 'black'
function draw() {
  requestAnimationFrame(draw);

  for(let i = 0; i < 2; i++){
  let dx = a * (y - x);
  let dy = x * (b - z) - y;
  let dz = x * y - c * z;

  x += dx * 0.01;
  y += dy * 0.01;
  z += dz * 0.01;

  let scale = canvas.width/100;

  let ox = x * scale;
  let oy = y * scale;
  let oz = z * scale;

  ctx.beginPath();
  ctx.arc(ox, oy, 3, 0, Math.PI*2)

  ctx.stroke();

  }
}

draw();