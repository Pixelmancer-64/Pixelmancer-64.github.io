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
  static colors = random_color(101);
  static gradient = random_color(9);
  static cellSize = 1;
  static lineWidth = 1;
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
    // this.x = map(this.x, -Configs.r - 2, Configs.r + 2, 0, Canvas.width);
    // this.y = map(this.y, -Configs.r - 2, Configs.r + 2, Canvas.height, 0);

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
    //   canvas.height = window.innerWidth;
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
    
    //   this.i < Configs.colors.length - 1 ? this.i++ : (this.i = 0);
    this.gradient();
    Canvas.ctx.strokeStyle = Canvas.gradient;
    Canvas.ctx.fillStyle = Canvas.gradient;
    Canvas.ctx.lineWidth = Configs.lineWidth;

    // this.i < Configs.colors.length - 1 ? this.i++ : (this.i = 0);
  }

  animation() {
    // this.animationRequest = requestAnimationFrame(this.animation.bind(this));
    // Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    // cancelAnimationFrame(this.animationRequest)

    const max = Math.ceil(random(100)) + 1;

    for (let x = 0; x < Canvas.cols; x++) {
      for (let y = 0; y < Canvas.rows; y++) {
        
        let a = map(x, 0, Canvas.width, -3.5, 2.5)
        let b = map(y, 0, Canvas.height, -2.5, 2.5)

        let ca = a;
        let cb = b;

        let n = 0
        for(; n < max; n++){
          let aa = a * a - b * b;
          let bb = 2 * a * b;

          a = aa + ca;
          b = bb + cb;

          if(a * a + b * b > 16) break;
          
        }

        let alpha = map(n, 0, max, 0, 1)
        if(n == max){
          alpha = 0;
        }

        let color 
        if(alpha == 0) color = 'black'
        else color =  usableColor(Configs.colors[n], alpha)


        Canvas.ctx.fillStyle = color
        Canvas.ctx.fillRect(x * Configs.cellSize, y * Configs.cellSize, Configs.cellSize, Configs.cellSize)
      }
    }
  }

  gradient() {
    Canvas.gradient = Canvas.ctx.createLinearGradient(
      0,
      0,
      Canvas.width,
      Canvas.height
    );

    Canvas.gradient.addColorStop(0, usableColor(Configs.gradient[0]));
    // Canvas.gradient.addColorStop("0.2", usableColor(Configs.gradient[1]));
    Canvas.gradient.addColorStop(0.3, usableColor(Configs.gradient[2]));
    // Canvas.gradient.addColorStop("0.4", usableColor(Configs.gradient[3]));
    // Canvas.gradient.addColorStop(.5, usableColor(Configs.gradient[4]));
    // Canvas.gradient.addColorStop("0.6", usableColor(Configs.gradient[5]));
    Canvas.gradient.addColorStop(0.7, usableColor(Configs.gradient[6]));
    // Canvas.gradient.addColorStop("0.8", usableColor(Configs.gradient[7]));
    Canvas.gradient.addColorStop(1, usableColor(Configs.gradient[8]));
  }
}

window.onload = function () {
  let canvas = new Canvas();
  canvas.animation();
};
