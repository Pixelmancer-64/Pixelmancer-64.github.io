const random_rgb = () => {
  let offset = 100;
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

function random(r, hasNegativeRange = false) {
  if (hasNegativeRange) {
    return Math.random() * r * (Math.round(Math.random()) ? 1 : -1);
  } else return Math.random() * r;
}

function usableColor(color, alpha = 1) {
  return `rgba(${color.r},${color.g},${color.b}, ${alpha})`;
}

function map(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

class Configs {
  static colors = random_color(3);
  static gradient = random_color(9);
  static cellSize = 30;
  static lineWidth = 1;
  static radius = 6;
  static h = Math.random() * 0.1;
  static r = Math.random() * 0.1;
  static dx = 10;
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw() {
    Canvas.ctx.fillStyle = this.color;
    Canvas.ctx.beginPath();
    this.x = map(this.x, -Configs.r - 2, Configs.r + 2, 0, Canvas.width);
    this.y = map(this.y, -Configs.r - 2, Configs.r + 2, Canvas.height, 0);

    Canvas.ctx.fillRect(this.x, this.y, 1, 1);
  }
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
    //   canvas.height = window.innerWidth;-
    // } else {
    //   canvas.width = window.innerHeight;
    //   canvas.height = window.innerHeight;
    // }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    Canvas.width = canvas.width;
    Canvas.height = canvas.height;

    Canvas.cols = Math.floor(Canvas.width / Configs.cellSize);
    Canvas.rows = Math.floor(Canvas.height / Configs.cellSize);

    this.i = 0;

    this.animationRequest;

    this.seed = new Particle(0, 1, 'white')

    Canvas.ctx.strokeStyle = Canvas.gradient;
    Canvas.ctx.fillStyle = Canvas.gradient;
    Canvas.ctx.lineWidth = Configs.lineWidth;


    for (let i = 0; i < 2000; i++) {
      this.popcorn(
        random(this.seed.x, true),
        random(this.seed.y, true),
        Configs.h,
        9999
      );

      this.i < Configs.colors.length - 1 ? this.i++ : (this.i = 0);
    }

  }

  popcorn(x, y, h, iters) {
    let color = usableColor(Configs.colors[this.i]);

    for (let i = 0; i < iters; i++) {
      if (i % Configs.dx == 0) {
        let aux = x;

        x = x - h * Math.sin(y + Math.tan(3 * y));
        y = y - h * Math.sin(aux + Math.tan(3 * aux));

        let particle = new Particle(x, y, color);
        particle.draw();
        this.seed.x = x;
        this.seed.y = y;

      }
    }
  }
}

window.onload = function () {
  let canvas = new Canvas();
  canvas.animation();
};
