const random_rgb = () => {
  let offset = 50;
  let mult = 255 - offset;
  let r = Math.floor(Math.random() * mult + offset);
  let g = Math.floor(Math.random() * mult + offset);
  let b = Math.floor(Math.random() * mult + offset);
  return {
    r: r,
    g: g,
    b: b,
  };
};

function random_color(num) {
  let aux = [];
  for (let i = 0; i < num; i++) {
    aux.push(random_rgb());
  }
  return aux;
}

function usableColor(color, alpha = 1) {
  return `rgba(${color.r},${color.g},${color.b}, ${alpha})`;
}

class Configs {
  static colors = random_color(9);
  static cellSize = 15;
  static lineWidth = 1;
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

  constructor() {
    let canvas = document.getElementById("canvas");
    Canvas.ctx = canvas.getContext("2d");

    // if (window.innerWidth <= window.innerHeight) {
    //   canvas.width = window.innerWidth;
    //   canvas.height = window.innerWidth;
    // } else {
    //   canvas.width = window.innerHeight;
    //   canvas.height = window.innerHeight;
    // }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    Canvas.width = canvas.width;
    Canvas.height = canvas.height;

    Canvas.cols = Math.floor(Canvas.width / Configs.cellSize) + 2;
    Canvas.rows = Math.floor(Canvas.height / Configs.cellSize) + 2;

    let inc = 1;
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

    this.animationRequest;

    this.gradient();

    Canvas.ctx.strokeStyle = Canvas.gradient;
    Canvas.ctx.lineWidth = Configs.lineWidth;
  }

  setup() {}
  animation() {
    // this.animationRequest = requestAnimationFrame(this.animation.bind(this));

    // Canvas.ctx.clearRect(
    //     0,
    //     0,
    //     Canvas.width,
    //     Canvas.height
    // );

    for (let i = 0; i < Canvas.rows; i++) {
      for (let j = 0; j < Canvas.cols; j++) {
        Canvas.ctx.beginPath();
        Canvas.ctx.arc(
          j * Configs.cellSize,
          i * Configs.cellSize,
          Configs.cellSize / 5,
          0,
          Math.PI * 2
        );
        let grayScale = Canvas.grid[i][j] * 255;
        Canvas.ctx.fillStyle = usableColor(
          {
            r: grayScale,
            g: grayScale,
            b: grayScale,
          },
          Canvas.grid[i][j]
        );
        Canvas.ctx.fill();
      }
    }

    for (let i = 0; i < Canvas.rows - 1; i++) {
      for (let j = 0; j < Canvas.cols - 1; j++) {
        const x = i * Configs.cellSize;
        const y = j * Configs.cellSize;
        let state = [];
        Configs.moves.forEach((e) =>
          state.push({
            x: y + e.y,
            y: x + e.x,
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
          () => this.drawLine(state[2], state[3]),
          () => this.drawLine(state[2], state[3]),
        ];

        if (status && status < aux.length - 1) {
          aux[status - 1]();
        }
      }
    }
    Canvas.ctx.stroke();

    // cancelAnimationFrame(this.animationRequest)
  }

  test(){
    for (let i = 0; i < Canvas.rows - 1; i++) {
      for (let j = 0; j < Canvas.cols - 1; j++) {
        console.log(this.drawGrid[i][j])
        this.drawGrid[i][j]()
      }
    }
    Canvas.ctx.stroke();

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
      Canvas.width / 2,
      Canvas.height / 2,
      Canvas.width / 5,
      Canvas.width,
      Canvas.height,
      Canvas.width / 30
    );

    // Canvas.gradient.addColorStop("0.1", usableColor(Configs.colors[0]))
    Canvas.gradient.addColorStop("0.2", usableColor(Configs.colors[1]));
    // Canvas.gradient.addColorStop("0.3", usableColor(Configs.colors[2]))
    Canvas.gradient.addColorStop("0.4", usableColor(Configs.colors[3]));
    // Canvas.gradient.addColorStop("0.5", usableColor(Configs.colors[4]))
    Canvas.gradient.addColorStop("0.6", usableColor(Configs.colors[5]));
    // Canvas.gradient.addColorStop("0.7", usableColor(Configs.colors[6]))
    Canvas.gradient.addColorStop("0.8", usableColor(Configs.colors[7]));
    // Canvas.gradient.addColorStop("0.9", usableColor(Configs.colors[8]))
  }
}

window.onload = function () {
  let canvas = new Canvas();
  canvas.animation();
};
