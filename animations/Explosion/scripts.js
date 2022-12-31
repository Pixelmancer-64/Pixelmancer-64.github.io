import { random_color } from "../functionalModules.js";

// Set up canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set up explosion parameters
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 100;
const particleCount = 1000;
let explosionForce = 10;
const gravity = 0.001;
// Set up array to store particles
const particles = [];
let routine = nothing;

function EXPLOSION() {
  routine == constant_fill ? (routine = nothing) : (routine = constant_fill);
  ctx.fillStyle = random_color(0.7, 150);

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radius;
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);
    const dx = explosionForce * (Math.random() - 0.5);
    const dy = explosionForce * (Math.random() - 0.5);
    const size = Math.random() + 1.1;

    const particle = { x, y, dx, dy, size };
    particles.push(particle);
  }
}

// Animate the explosion
function animate() {
  // Clear the canvas
  routine();
  // Update particle positions and velocities
  for (let i = 0; i < particles.length; i++) {
    // console.log(i)
    const particle = particles[i];
    particle.x += particle.dx;
    particle.y += particle.dy;
    particle.dy += gravity;
    particle.size -= 0.005;

    if (particle.size <= 0.9) {
      particles.splice(i, 1);
      i--;
      if (particles.length < 650) {
        EXPLOSION();
      }
    }
  }

  // Draw the particles on the canvas
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    ctx.beginPath();

    ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Animate the next frame
  requestAnimationFrame(animate);
}

function constant_fill() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function nothing() {}

// Start the animation
EXPLOSION();
animate();
