import {
  point,
  start,
  random_color,
  random,
  loop,
  map,
} from "../functionalModules.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const audioPlayer = document.getElementById("audio");
const audioCtx = new AudioContext();
const file = document.getElementById("file");

let audioSource;
let analyser;
let isPaused = Boolean;
let animateStarted = Boolean;
let animationFrame;

file.addEventListener("input", setInput);

function setInput(e) {
  console.log(this);
  audioPlayer.src = URL.createObjectURL(this.files[0]);
}

audioPlayer.addEventListener("play", function () {
  isPaused = false;
  if (!animateStarted) {
    animation();
    return;
  }
  setInput.bind(file)();
  audioSource = audioCtx.createMediaElementSource(audioPlayer);
  analyser = audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fttSize = 2048;
  animation();
  animateStarted = !animateStarted;
});

audioPlayer.addEventListener("pause", function () {
  isPaused = !isPaused;
});

let size = window.innerWidth;
let dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;

ctx.scale(dpr, dpr);

ctx.lineWidth = 2;
ctx.strokeStyle = "white";

let lines = [];
const gap = 10;

const nLines = 2;
const nPoints = 1024;

// Create the lines
for (let i = 0; i < nLines; i++) {
  let line = [];
  for (let j = 0; j < nPoints; j++) {
    let point = {
      x: j * gap,
      y: i * gap,
      originalX: j * gap + 300,
      originalY: i * gap + 300,
    };
    line.push(point);
  }
  lines.push(line);
}

const aux = Math.floor(1024 / nPoints);
function animation() {
  if (isPaused) return;

  const bufferL = analyser.frequencyBinCount;
  const data = new Uint8Array(bufferL);
  analyser.getByteFrequencyData(data);
  animationFrame = requestAnimationFrame(animation);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < lines.length; i++) {
    // ctx.beginPath();
    ctx.moveTo(lines[i][0].x, lines[i][0].y);
    // console.log(data)
    let j = 0;
    for (; j < lines[i].length - 2; j++) {
      let distanceToCenter = Math.abs(j * gap - size / 2);
      let variance = Math.max(size / 2 - 50 - distanceToCenter, 0);
      // let mapped = map(variance, 0, 640, 0, 200);
      lines[i][j].y = lines[i][j].originalY + variance * data[j * aux] * -.001 + random(0,1);
      let xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
      let yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
      ctx.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
    }
    ctx.quadraticCurveTo(
      lines[i][j].x,
      lines[i][j].y,
      lines[i][j + 1].x,
      lines[i][j + 1].y
    );
    
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    
    ctx.fill();
    
    ctx.restore();
    
    ctx.stroke();
  
  }
}
