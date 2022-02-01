const random_rgb = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return {
    r: r,
    g: g,
    b: b
  }
};

function random_color(num) {
  let aux = []
  for (let i = 0; i < num; i++) {
    aux.push(random_rgb())
  }
  return aux;
};

isPrime = function (n) {
  if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
  if (n == leastFactor(n)) return true;
  return false;
}

leastFactor = function (n) {
  if (isNaN(n) || !isFinite(n)) return NaN;
  if (n == 0) return 0;
  if (n % 1 || n * n < 2) return 1;
  if (n % 2 == 0) return 2;
  if (n % 3 == 0) return 3;
  if (n % 5 == 0) return 5;
  var m = Math.sqrt(n);
  for (var i = 7; i <= m; i += 30) {
    if (n % i == 0) return i;
    if (n % (i + 4) == 0) return i + 4;
    if (n % (i + 6) == 0) return i + 6;
    if (n % (i + 10) == 0) return i + 10;
    if (n % (i + 12) == 0) return i + 12;
    if (n % (i + 16) == 0) return i + 16;
    if (n % (i + 22) == 0) return i + 22;
    if (n % (i + 24) == 0) return i + 24;
  }
  return n;
}

class Configs {
  static colors = random_color(5);
  static mirrors = Math.ceil(Math.random() * 6);
}

class Particle {

  constructor(x, y) {
    this.angle = 0;
    this.radius = 1;
    this.pos = {
      x: x + y * Math.cos(this.angle),
      y: x + y * Math.sin(this.angle)
    }
    this.color = 'white';

  }

  update() {
    this.angle += this.radius;
    let r = this.angle;
    let prime = isPrime(this.angle)

    if (prime) {
      this.color = '#49FDF4'
    } else this.color = '#FDF548';

    this.pos = {
      x: this.angle * Math.cos(r),
      y: this.angle * Math.sin(r)
    }

    if (Canvas.showAll) {
      this.draw();
    } else if (prime) {
      this.draw();
    }


  }

  draw() {
    Canvas.ctx.beginPath();

    Canvas.ctx.arc(this.pos.x, this.pos.y, Canvas.scale * 10000, 0, Math.PI * 2);
    Canvas.ctx.fillStyle = this.color;
    Canvas.ctx.fill();

  }

}

class Canvas {
  static ctx;
  static width;
  static height;
  static scale;
  static showAll = false
  constructor() {
    let canvas = document.getElementById('canvas');
    Canvas.ctx = canvas.getContext('2d');

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

    this.animationRequest;
    this.i = 0;

    this.guide = new Particle(0, 0);


    Canvas.ctx.translate(Canvas.width / 2, Canvas.height / 2)
    Canvas.scale = .01;
    Canvas.ctx.scale(Canvas.scale, Canvas.scale)


  }

  animation() {

    for (let i = 0; i < 10; i++) {

      this.guide.update();

    }


    this.animationRequest = requestAnimationFrame(this.animation.bind(this))
  }

}

window.onload = function () {
  let canvas = new Canvas();
  canvas.animation();
}


