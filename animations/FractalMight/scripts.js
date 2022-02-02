const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

let rand = Math.random() / 9999;
let anotherRand = Math.random() / (Math.random() * 300);

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.speed = 0;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.x += this.directionX * Math.cos(this.speed);
    this.y += this.directionY * Math.sin(this.speed);
    this.speed += anotherRand;

    this.directionX += rand;
    this.directionY += rand;
    this.draw();
  }
}

// controller
function init() {
  let nParticles = Math.floor(Math.random() * 10) + 1;
  for (i = 0; i < nParticles; i++) {
    let signal = Math.round(Math.random()) ? 1 : -1;
    let otherSignal = Math.round(Math.random()) ? 1 : -1;

    let size = 1;
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    //speed
    let directionX = Math.random() * signal;
    let directionY = Math.random() * otherSignal;

    let color = "rgba(255,255,255, .1)";
    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}

function animate() {
  // ctx.clearRect(0,0,innerWidth,innerHeight);

  for (let j = 0; j < 99999; j++) {
    particlesArray.map((particle) => particle.update());
  }

  // requestAnimationFrame(animate);
}

init();
animate();
