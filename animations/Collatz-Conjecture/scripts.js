/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let FlowField;
let animationRequest;
let particlesArray;
let animation;
let hue = 0;

window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  if (window.innerWidth <= window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
  } else {
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;
  }

  slider();
};

class Particle {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.translateX = this.width / 5;
    this.translateY = this.height / 2;
    this.angle = Math.PI / 16;
    this.hue = 0;
    this.n = 1;
    this.i = 1;
    this.length = this.width / 120;
    this.sequence = [];
    this.ctx.translate(this.translateX, this.translateY);
  }
  collatz(num) {
    if (num % 2 == 0) return num / 2;
    else return (num * 3 + 1) / 2;
  }
  draw() {
    this.ctx.beginPath();
    let color = "hsl(" + this.hue + ",100%,50%)";
    this.ctx.strokeStyle = color;
    this.hue += 0.01;
    // this.ctx.shadowBlur = 10;
    // this.ctx.shadowColor = '#ff6800';
    this.ctx.lineWidth = 0.2;
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.length, 0);
    this.ctx.stroke();
    this.ctx.translate(this.length, 0);
  }

  update() {
    requestAnimationFrame(this.update.bind(this));

    this.sequence = [];
    this.n = this.i;
    this.i++;

    while (this.n != 1) {
      this.sequence.push(this.n);
      this.n = this.collatz(this.n);
    }

    this.sequence.push(1);
    this.sequence.reverse();

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.translate(this.translateX, this.translateY);

    for (let j = 0; j < this.sequence.length; j++) {
      let aux = this.sequence[j];
      if (aux % 2 == 0) this.ctx.rotate(this.angle);
      else this.ctx.rotate(-this.angle);
      this.draw();
    }
  }
}

function slider() {
  hue = Math.random() * 360;
  newParticle = new Particle(ctx, canvas.width, canvas.height);
  newParticle.update();
}

window.addEventListener("resize", function () {
  if (window.innerWidth <= window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
  } else {
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;
  }
  slider();
});
