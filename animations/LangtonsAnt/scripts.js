class Canvas {
  static ctx;
  static width;
  static height;
  static cols;
  static rows;
  static gradient;
  static cellSize = 2;
  static grid = [];
  static mouse = {
    x: null,
    y: null,
    last: {
      x: null,
      y: null,
    },
    pressed: false,
  };

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

    Canvas.cols = Math.floor(Canvas.width / Canvas.cellSize);
    Canvas.rows = Math.floor(Canvas.height / Canvas.cellSize);

    Canvas.middleX = Math.ceil(Canvas.cols / 2);
    Canvas.middleY = Math.ceil(Canvas.rows / 2);

    this.animationRequest;
    this.inc = 0;
    this.i = 0;
    this.iterationsPerFrame = 99;
    this.nAnts = 10

    const size = Canvas.cellSize;
    for (let i = 0; i < Canvas.rows; i++) {
      Canvas.grid[i] = [];

      for (let j = 0; j < Canvas.cols; j++) {
        Canvas.grid[i][j] = false;
        new Square(size, size, "black", {
          x: j * size,
          y: i * size,
        }).fill();
      }
    }

    this.ants = [];

    for (let i = 0; i < this.nAnts; i++) {
      this.ants.push({
        ant: new Square(size, size, randomColor(), {
          x: randomInt(Canvas.middleX) * size,
          y: randomInt(Canvas.middleY) * size,
        }),
        angle: 0,
      });
    }

    Canvas.grid[Canvas.middleY][Canvas.middleX] = true;

    this.angle = 0;
    this.clock = {
      0: {
        cw: { x: 1, y: 0 },
        ccw: { x: -1, y: 0 },
      },
      90: {
        cw: { x: 0, y: 1 },
        ccw: { x: 0, y: -1 },
      },
      180: {
        cw: { x: -1, y: 0 },
        ccw: { x: 1, y: 0 },
      },
      270: {
        cw: { x: 0, y: -1 },
        ccw: { x: 0, y: 1 },
      },
    };

    // Canvas.ctx.translate(Canvas.width / 2, Canvas.height / 2);
  }

  animation() {
    this.animationRequest = requestAnimationFrame(this.animation.bind(this));
    // Canvas.ctx.clearRect(
    //   0,
    //   0,
    //   Canvas.width,
    //   Canvas.height,
    // );

    const size = Canvas.cellSize;

    for (let i = 0; i < this.iterationsPerFrame; i++) {
      this.ants.forEach((ant, index) => {
        const pos = ant.ant.pos;
        if (Canvas.grid[pos.y][pos.x]) {
          this.antBrain(false, index);
        } else {
          this.antBrain(true, index);
        }
      });
    }

    // cancelAnimationFrame(this.animationRequest);
  }

  antBrain(clockwise, index) {
    const e = this.ants[index];
    const pos = e.ant.pos;
    const size = Canvas.cellSize;
    const value = Canvas.grid[pos.y][pos.x];

    Canvas.grid[pos.y][pos.x] = !value;

    new Square(size, size, value ? "black" : e.color, {
      x: pos.x * size,
      y: pos.y * size,
    }).fill();

    this.checkAngle(index);
    if (clockwise) {
      this.rotate(this.clock[e.angle].cw, index);
      this.ants[index].angle += 90;
    } else {
      this.rotate(this.clock[e.angle].ccw, index);
      this.ants[index].angle -= 90;
    }
    e.ant.fill(size);
  }

  checkAngle(index) {
    if (this.ants[index].angle == 360) this.ants[index].angle = 0;
    else if (this.ants[index].angle == -90) this.ants[index].angle = 270;
  }

  rotate(rotation, index) {
    let x = this.ants[index].ant.pos.x + rotation.x;
    let y = this.ants[index].ant.pos.y + rotation.y;

    if (x < 0) {
      x = Canvas.cols - 1;
    } else if (x >= Canvas.cols) {
      x = 0;
    }
    if (y < 0) {
      y = Canvas.rows - 1;
    } else if (y >= Canvas.rows) {
      y = 0;
    }

    this.ants[index].ant.pos.x = x;
    this.ants[index].ant.pos.y = y;
  }

  startEvents() {
    window.addEventListener("mousemove", function (event) {
      Canvas.mouse.last.x = Canvas.mouse.x;
      Canvas.mouse.last.y = Canvas.mouse.y;
      Canvas.mouse.x = event.x;
      Canvas.mouse.y = event.y;
    });

    document.body.onmousedown = function () {
      Canvas.mouse.pressed = true;
      if (Canvas.mouse.x != null && document.querySelector("h1")) {
        document.querySelector("h1").remove();
      }
    };
    document.body.onmouseup = function () {
      Canvas.mouse.pressed = false;
    };

    document
      .getElementById("canvas")
      .addEventListener("touchstart", function (event) {
        Canvas.mouse.last.x = Canvas.mouse.x;
        Canvas.mouse.last.y = Canvas.mouse.y;
        Canvas.mouse.x = event.touches[0].clientX;
        Canvas.mouse.y = event.touches[0].clientY;
        Canvas.mouse.pressed = true;
      });

    document
      .getElementById("canvas")
      .addEventListener("touchend", function (event) {
        Canvas.mouse.pressed = false;
      });

    document.addEventListener("click", (e) => {
      cancelAnimationFrame(this.animationRequest);
      console.log("cancelou");
    });
  }
}

window.onload = function () {
  let canvas = new Canvas();
  // canvas.startEvents();
  canvas.animation();
};
