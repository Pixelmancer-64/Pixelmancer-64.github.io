/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let animationRequest;

window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = 300;
  canvas.height = 300;

  slider();
};

class Particle {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.sandpiles = [];
    this.highest = {
      x: 0,
      y: 0,
    };
    for (let i = 0; i < this.height; i++) {
      this.sandpiles[i] = [];

      for (let j = 0; j < this.width; j++) {
        this.sandpiles[i][j] = null;
      }
    }

    this.colors = ["#703529", "#283D70", "#C6934B", "#2E3546", "#E0DDD5"];

    this.distribution = this.colors.length - 1;

    this.middle = {
      y: Math.floor(this.height / 2),
      x: Math.floor(this.width / 2),
    };

    this.sandpiles[this.middle.x][this.middle.y] = 400000;
  }

  draw(y, x) {
    const color = this.colors[this.sandpiles[y][x]];
    if (color) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, 1, 1);
    }
  }

  drawAll(y, x) {
    this.draw(y, x);

    this.draw(y + 1, x);
    this.draw(y - 1, x);
    this.draw(y, x + 1);
    this.draw(y, x - 1);
  }

  changeNeighbors(y, x, aux) {
    this.sandpiles[y + 1][x] += aux;
    this.sandpiles[y - 1][x] += aux;
    this.sandpiles[y][x + 1] += aux;
    this.sandpiles[y][x - 1] += aux;
  }

  topple() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const num = this.sandpiles[y][x];
        if (num && num >= this.distribution) {
          if (num % this.distribution == 0) {
            const aux = num / this.distribution;
            this.sandpiles[y][x] = 0;
            this.changeNeighbors(y, x, aux);
          } else {
            this.sandpiles[y][x] -= this.distribution;
            this.changeNeighbors(y, x, 1);
          }
          this.drawAll(y, x);
        }
      }
    }
  }

  animate() {
    this.topple();
    animationRequest = requestAnimationFrame(this.animate.bind(this));
  }
}

function slider() {
  cancelAnimationFrame(animationRequest);
  newParticle = new Particle(ctx, canvas.width, canvas.height);
  newParticle.animate();
}
