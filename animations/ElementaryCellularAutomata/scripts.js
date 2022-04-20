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

    this.animationRequest;
    this.inc = 0;
    this.i = 0;

    // if(a == 1 && b == 1 && c == 1) return this.rule[0]
    // if(a == 1 && b == 1 && c == 0) return this.rule[1]
    // if(a == 1 && b == 0 && c == 1) return this.rule[2]
    // if(a == 1 && b == 0 && c == 0) return this.rule[3]
    // if(a == 0 && b == 1 && c == 1) return this.rule[4]
    // if(a == 0 && b == 1 && c == 0) return this.rule[5]
    // if(a == 0 && b == 0 && c == 1) return this.rule[6]

    this.rule = [randomInt(1),randomInt(1),randomInt(1),randomInt(1),randomInt(1),randomInt(1),randomInt(1),randomInt(1)]
    console.log(this.rule);
    // [ 1, 0, 1, 0, 0, 0, 0, 1 ]
    // this.rule = [1, 0, 0, 1, 0, 1, 1, 0];
    this.ruleValue = {
      111: this.rule[0],
      110: this.rule[1],
      101: this.rule[2],
      100: this.rule[3],
      "011": this.rule[4],
      "010": this.rule[5],
      "001": this.rule[6],
      "000": this.rule[7],
    };

    this.generation = new Array(Canvas.cols).fill(0);
    this.generation[Math.ceil(Canvas.cols / 2)] = 1;
    this.nextGeneration = [];
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

      this.generation.forEach((e, index) => {
        const size = Canvas.cellSize;

        new Square(size, size, e ? "white" : "black", {
          x: index * size,
          y: this.i * size,
        }).fill();
      });

      this.generation.forEach((e, index) => {
        this.nextGeneration.push(this.getRule(index));
      });

      this.generation = [...this.nextGeneration];
      this.nextGeneration = [];
      this.i++;

    if (this.i >= Canvas.height / Canvas.cellSize)
    cancelAnimationFrame(this.animationRequest);
  }

  getRule(index) {
    let [a, b, c] = [
      this.generation[index - 1],
      this.generation[index],
      this.generation[index + 1],
    ];
    a = a || 0;
    b = b || 0;
    c = c || 0;

    return this.ruleValue[`${a}${b}${c}`];
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
  }
}

window.onload = function () {
  let canvas = new Canvas();
  // canvas.startEvents();
  canvas.animation();
};
