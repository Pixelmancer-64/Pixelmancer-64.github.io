class Canvas {
  static ctx;
  static width;
  static height;
  static cols;
  static rows;
  static gradient;
  static cellSize = 10;
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

    this.generation = new Array(Canvas.cols).fill(0);
    this.generation[Math.ceil(Canvas.cols / 2)] = 1;
    this.nextGeneration = new Array(Canvas.cols).fill(0);
    // Canvas.ctx.translate(Canvas.width / 2, Canvas.height / 2);
  }

  animation() {
    // this.animationRequest = requestAnimationFrame(this.animation.bind(this));

    // Canvas.ctx.clearRect(
    //   0,
    //   0,
    //   Canvas.width,
    //   Canvas.height,
    // );

    for (let i = 0; i < 3; i++) {
      this.generation.forEach((e, index) => {
        const size = Canvas.cellSize;

        new Square(size, size, (e) ? 'white' : 'black', {
          x: index * size,
          y: this.i * size,
        }).fill();
      });

      this.generation.forEach((e, index) => {
        console.log(this.generation[index + 1], e, this.generation[index - 1])
        if(this.generation[index + 1] || e || this.generation[index - 1]) this.nextGeneration[index] = 1
      });

      this.generation = this.nextGeneration;
      this.i++;
    }
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
