const audioPlayer = document.getElementById("audio");
const audioCtx = new AudioContext();
const file = document.getElementById("file");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

let audioSource;
let analyser;
let isPaused = Boolean;
let animateStarted = Boolean;

window.addEventListener("load", function () {
  file.value = "";
});

file.addEventListener("input", function () {
  console.log(this.files[0])
  audioPlayer.src = URL.createObjectURL(this.files[0]);
  isPaused = !isPaused;
  audioPlayer.load();
  init();
});

audioPlayer.addEventListener("play", function () {
  isPaused = false;
  audioSource = audioCtx.createMediaElementSource(audioPlayer);
  analyser = audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fttSize = 2048;
  if (animateStarted) {
    animate();
    animateStarted = !animateStarted;
  }
});
// ctx.shadowOffsetX = 0;
// ctx.shadowOffsetY = 0;
// ctx.shadowBlur = 10;

audioPlayer.addEventListener("pause", function () {
  isPaused = !isPaused;
});

class Particle {
  constructor(x, y, mass, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.mass = mass;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    // ctx.shadowColor = this.color;
    ctx.fill();
  }
  update(y) {
    this.y = canvas.height - this.size;
    this.y -= y * this.mass;
    this.draw();
  }
}

let hue = 0;
function init() {
  particlesArray = [];
  let nParticles = 2048 / 4;
  for (i = 0; i < nParticles; i++) {
    let size = 5;
    let hue = Math.random() * 360;
    let color = "hsl(" + hue + ",100%,50%)";
    let mass = Math.random() + 2;
    let x = Math.random() * canvas.width;
    let y = canvas.height - size;
    particlesArray.push(new Particle(x, y, mass, size, color));
  }
}

function animate() {
  const bufferL = analyser.frequencyBinCount;
  const data = new Uint8Array(bufferL);
  analyser.getByteFrequencyData(data);
  requestAnimationFrame(animate);
  if (!isPaused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update(data[i]);
    }
  }
}
window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

init();
