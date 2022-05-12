class Canvas {
  static ctx;
  static width;
  static height;
  static cols;
  static rows;
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
  static middle = {
    x: 0,
    y: 0,
  };

  constructor(cellSize = 1, isSquare = false, nIterationsPerSecond=1) {
    this.cellSize = cellSize;
    this.isSquare = isSquare;
    this.nIterationsPerSecond = nIterationsPerSecond;
    let canvas = document.getElementById("canvas");
    Canvas.ctx = canvas.getContext("2d");

    if (isSquare) {
      if (window.innerWidth <= window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth;
      } else {
        canvas.width = window.innerHeight;
        canvas.height = window.innerHeight;
      }
    } else {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    Canvas.width = canvas.width;
    Canvas.height = canvas.height;

    Canvas.cols = Math.floor(Canvas.width / this.cellSize);
    Canvas.rows = Math.floor(Canvas.height / this.cellSize);

    Canvas.middle.x = Math.ceil(Canvas.width / 2);
    Canvas.middle.y = Math.ceil(Canvas.height / 2);

    this.animationRequest;

    for (let i = 0; i < Canvas.rows; i++) {
      Canvas.grid[i] = [];

      for (let j = 0; j < Canvas.cols; j++) {
        Canvas.grid[i][j] = false;
      }
    }
  }

  animation() {
    this.animationRequest = requestAnimationFrame(this.animation.bind(this));
    easyLoop(this.nIterationsPerSecond, ()=> this.animationCallback())
    // cancelAnimationFrame(this.animationRequest);
  }

  static clear(){
    Canvas.ctx.clearRect(
      0,
      0,
      Canvas.width,
      Canvas.height,
    );
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

    document.addEventListener("dblclick", (e) => {
      cancelAnimationFrame(this.animationRequest);
    });

    document.addEventListener("resize", () => {
      if (this.isSquare) {
        if (window.innerWidth <= window.innerHeight) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerWidth;
        } else {
          canvas.width = window.innerHeight;
          canvas.height = window.innerHeight;
        }
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    });
  }
}
