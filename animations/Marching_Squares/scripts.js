function usableColor(color, alpha = 1) {
  return `rgba(${color.r},${color.g},${color.b}, ${alpha})`;
}

class Configs {
  static colors = [
    "rgba(143, 98, 127, 1)",
    "rgba(138,10,57,1)",
    "rgba(190,0,50,1)",
    "rgba(246,80,45,1)",
  ];
  static cellSize = 70;
  static lineWidth = 2;
  static moves = [
    {
      x: Configs.cellSize / 2,
      y: 0,
    },
    {
      x: Configs.cellSize,
      y: Configs.cellSize / 2,
    },
    {
      x: Configs.cellSize / 2,
      y: Configs.cellSize,
    },
    {
      x: 0,
      y: Configs.cellSize / 2,
    },
  ];
}

class Canvas {
  static ctx;
  static width;
  static height;
  static cols;
  static rows;
  static gradient;
  static grid = [];
  static canvas = document.getElementById("canvas");

  constructor() {
    Canvas.ctx = Canvas.canvas.getContext("2d");

    this.animationRequest;

    this.i = 0;
    this.j = 1;
    this.grid = [];
  }

  init() {
    Canvas.canvas.width = window.innerWidth;
    Canvas.canvas.height = window.innerHeight;

    Canvas.width = canvas.width;
    Canvas.height = canvas.height;

    Canvas.cols = Math.floor(Canvas.width / Configs.cellSize) + 2;
    Canvas.rows = Math.floor(Canvas.height / Configs.cellSize) + 2;
    const scale = Canvas.cols / Canvas.rows;

    this.startRadius = Canvas.rows * 3;
    this.endRadius = Canvas.rows * 18;
    this.inc = 1;
    this.positiveStop = scale * 500;
    this.negativeStop = -scale * 500;

    this.gradient();

    Canvas.ctx.strokeStyle = Canvas.gradient;
    Canvas.ctx.lineWidth = Configs.lineWidth;

    let inc = 0.3;
    noise.seed(Math.random() * 255);
    let x = 0;
    for (let i = 0; i < Canvas.rows; i++) {
      x += inc;
      let y = 0;
      Canvas.grid[i] = [];
      for (let j = 0; j < Canvas.cols; j++) {
        y += inc;
        Canvas.grid[i][j] = noise.simplex2(x, y);
      }
    }

    for (let i = 0; i < Canvas.rows - 1; i++) {
      this.grid[i] = [];
      for (let j = 0; j < Canvas.cols - 1; j++) {
        const y = i * Configs.cellSize;
        const x = j * Configs.cellSize;
        let state = [];
        Configs.moves.forEach((e) =>
          state.push({
            x: x + e.y,
            y: y + e.x,
          })
        );

        let status = this.getState(
          Math.ceil(Canvas.grid[i][j]),
          Math.ceil(Canvas.grid[i + 1][j]),
          Math.ceil(Canvas.grid[i + 1][j + 1]),
          Math.ceil(Canvas.grid[i][j + 1])
        );

        // this was the best aproach that I found. Due to the 2 cases where
        //  the function is composed of 4 values I can't just store the state

        let aux = [
          () => this.drawLine(state[2], state[3]),
          () => this.drawLine(state[1], state[2]),
          () => this.drawLine(state[1], state[3]),
          () => this.drawLine(state[0], state[1]),
          () => {
            this.drawLine(state[0], state[3]);
            this.drawLine(state[1], state[2]);
          },
          () => this.drawLine(state[0], state[2]),
          () => this.drawLine(state[0], state[3]),
          () => this.drawLine(state[0], state[3]),
          () => this.drawLine(state[0], state[2]),
          () => {
            this.drawLine(state[0], state[1]);
            this.drawLine(state[2], state[3]);
          },
          () => this.drawLine(state[0], state[1]),
          () => this.drawLine(state[1], state[3]),
          () => this.drawLine(state[1], state[2]),

          () => this.drawLine(state[2], state[3]),
        ];

        this.grid[i][j] = aux[status - 1];
      }
    }

    this.animation();
  }

  animation() {
    this.animationRequest = requestAnimationFrame(this.animation.bind(this));

    Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    Canvas.ctx.beginPath();

    for (let i = 0; i < Canvas.rows - 1; i++) {
      for (let j = 0; j < Canvas.cols - 1; j++) {
        if (this.grid[i][j]) this.grid[i][j]();
      }
    }

    Canvas.ctx.stroke();

    this.gradient();
    if (this.i >= this.positiveStop || this.i <= this.negativeStop)
      this.j = this.j * -1;
    this.i += this.inc * this.j;
    Canvas.ctx.strokeStyle = Canvas.gradient;
    Canvas.ctx.lineWidth = Configs.lineWidth;
  }

  drawLine(a, b) {
    Canvas.ctx.moveTo(a.x, a.y);
    Canvas.ctx.lineTo(b.x, b.y);
  }

  getState(a, b, c, d) {
    return a * 8 + b * 4 + c * 2 + d * 1;
  }

  gradient() {
    Canvas.gradient = Canvas.ctx.createRadialGradient(
      Canvas.width,
      Canvas.height,
      this.startRadius,
      this.i,
      0,
      this.endRadius
    );

    Canvas.gradient.addColorStop("0.2", Configs.colors[0]);
    Canvas.gradient.addColorStop("0.4", Configs.colors[1]);
    Canvas.gradient.addColorStop("0.6", Configs.colors[2]);
    Canvas.gradient.addColorStop("0.8", Configs.colors[3]);
  }

  resize() {
    cancelAnimationFrame(this.animationRequest);
    this.init();
  }
}

window.onload = function () {
  let canvas = new Canvas();
  canvas.init();
  window.addEventListener("resize", function () {
    canvas.resize();
  });
};
