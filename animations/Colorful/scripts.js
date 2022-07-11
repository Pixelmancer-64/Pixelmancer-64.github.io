const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
let hue = 150;
const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop("0.2", "red");
gradient.addColorStop("0.4", "green");
gradient.addColorStop("0.6", "yellow");
gradient.addColorStop("0.8", "blue");
gradient.addColorStop("1", "orange");

// particles
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    if (this.x + this.size > canvas.width || this.x < 0 + this.size) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y < 0 + this.size) {
      this.directionY = -this.directionY;
    }
    //move
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

// controller
function init() {
  particlesArray = [];
  let nParticles = (canvas.height * canvas.width) / 1000;
  for (i = 0; i < nParticles; i++) {
    let size = Math.random() * 15 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 3;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 3;

    //speed
    let directionX = Math.random() * 5 - 1.3;
    let directionY = Math.random() * 5 - 1.3;
    let hue = Math.random() * 360;
    let color = "hsl(" + hue + ",100%,50%)";

    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  for (i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}

//To not screw up the page if the window space change
window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.height / 110) * (canvas.height / 110);
  init();
});

init();
animate();
