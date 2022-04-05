const gmail = document.getElementById("gmail");
const outlook = document.getElementById("outlook");
const outlookText = document.getElementById("outlookText");
const gmailText = document.getElementById("gmailText");

gmail.onclick = function () {
  navigator.clipboard.writeText("hugobillemartins@gmail.com");
  gmailText.innerHTML = "Copiado! ";
};

gmail.addEventListener("dblclick", function () {
  navigator.clipboard.writeText("hugobillemartins@gmail.com");
  gmailText.innerHTML = "Copiado duas vezes! ";
});

outlook.onclick = function () {
  navigator.clipboard.writeText("hugobillemartins@outlook.com");
  outlookText.innerHTML = "Copiado!";
};
outlook.addEventListener("dblclick", function () {
  navigator.clipboard.writeText("hugobillemartins@outlook.com");
  outlookText.innerHTML = "Copiado duas vezes! ";
});

function usableColor(color, alpha = 1) {
  return `rgba(${color.r},${color.g},${color.b}, ${alpha})`;
}

class Configs {
  static colors = [
    "rgba(82,22,64,1)",
    "rgba(138,10,57,1)",
    "rgba(190,0,50,1)",
    "rgba(246,80,45,1)",
  ];
  static cellSize = 50;
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
    this.startRadius = 1;
    this.endRadius = 1;
    this.positiveStop = 0;
    this.negativeStop = 0;
    this.inc = 1;

    this.grid = [];
    this.init();
    // Canvas.ctx.font = "10vh Verdana";
  }

  init() {
    Canvas.canvas.width = window.innerWidth;
    Canvas.canvas.height = window.innerHeight;

    Canvas.width = canvas.width;
    Canvas.height = canvas.height;

    Canvas.cols = Math.floor(Canvas.width / Configs.cellSize) + 2;
    Canvas.rows = Math.floor(Canvas.height / Configs.cellSize) + 2;
    const scale = Canvas.width / Canvas.height;

    this.startRadius = scale * 50;
    this.endRadius = scale * 500;
    this.inc = scale * 2;
    this.positiveStop = scale * 999;
    this.negativeStop = -scale * 999;

    this.gradient();

    Canvas.ctx.strokeStyle = Canvas.gradient;
    Canvas.ctx.lineWidth = Configs.lineWidth;

    let inc = 10;
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
    // Canvas.ctx.strokeText("Hello World", 100, 100);

    this.gradient();
    if (this.i >= this.positiveStop || this.i <= this.negativeStop)
      this.j = this.j * -1;
    this.i += this.inc * this.j;
    Canvas.ctx.strokeStyle = Canvas.gradient;
    Canvas.ctx.lineWidth = Configs.lineWidth;
    // cancelAnimationFrame(this.animationRequest)
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

    // Canvas.gradient.addColorStop("0.1", usableColor(Configs.colors[0]))
    Canvas.gradient.addColorStop("0.2", Configs.colors[0]);
    // Canvas.gradient.addColorStop("0.3", usableColor(Configs.colors[2]))
    Canvas.gradient.addColorStop("0.4", Configs.colors[1]);
    // Canvas.gradient.addColorStop("0.5", usableColor(Configs.colors[4]))
    Canvas.gradient.addColorStop("0.6", Configs.colors[2]);
    // Canvas.gradient.addColorStop("0.7", usableColor(Configs.colors[6]))
    Canvas.gradient.addColorStop("0.8", Configs.colors[3]);
    // Canvas.gradient.addColorStop("0.9", usableColor(Configs.colors[8]))
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
