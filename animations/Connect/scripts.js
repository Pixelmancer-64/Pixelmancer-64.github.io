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

function usableColor(color, alpha = 1) {
  return `rgba(${color.r},${color.g},${color.b}, ${alpha})`;
}

class Configs {
  static colors = random_color(9);
  static mirrors = Math.ceil(Math.random() * 6);
}

class Particle {

  constructor(x, y) {
    this.angle = 0;
    this.radius = Math.random() * 9;
    this.pos = {
      x: x + y * Math.cos(this.angle),
      y: x + y * Math.sin(this.angle)
    }

    this.lastPos = {
      x: 0,
      y: 0
    }

    this.color = Canvas.gradient;

  }

  update() {
    this.angle += this.radius;
    let r = this.angle;

    this.pos = {
      x: this.angle * Math.cos(r),
      y: this.angle * Math.sin(r)
    }

      // this.draw();
      this.line();
      this.lastPos.x = this.pos.x
      this.lastPos.y = this.pos.y

  }

  draw() {
    Canvas.ctx.beginPath();

    Canvas.ctx.arc(this.pos.x, this.pos.y, Canvas.scale * 10000, 0, Math.PI * 2);
    Canvas.ctx.fillStyle = this.color;
    Canvas.ctx.fill();

  }

  line() {
    Canvas.ctx.lineWidth = 1;
    Canvas.ctx.beginPath();
    Canvas.ctx.lineTo(this.lastPos.x, this.lastPos.y);
    Canvas.ctx.lineTo(this.pos.x, this.pos.y);

    Canvas.ctx.strokeStyle = this.color;
    Canvas.ctx.stroke();

  }

}

class Canvas {
  static ctx;
  static width;
  static height;
  static scale;
  static showAll = true
  static gradient;

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

    Canvas.ctx.translate(Canvas.width / 2, Canvas.height / 2)
    Canvas.scale = 1;
    Canvas.ctx.scale(Canvas.scale, Canvas.scale)

    this.gradient();
    this.guide = new Particle(0, 0);

  }

  animation() {
    this.animationRequest = requestAnimationFrame(this.animation.bind(this))

    for (let i = 0; i < 1; i++) {

      this.guide.update();

    }

    if(this.guide.angle > 100000) cancelAnimationFrame(this.animationRequest)
  }

  gradient() {
    Canvas.gradient = Canvas.ctx.createRadialGradient(
      0,
      0,
      100,
      0,
      0,
      1000
    );

    Canvas.gradient.addColorStop(0, usableColor(Configs.colors[0]));
    // Canvas.gradient.addColorStop("0.2", usableColor(Configs.colors[1]));
    Canvas.gradient.addColorStop(.3, usableColor(Configs.colors[2]));
    // Canvas.gradient.addColorStop("0.4", usableColor(Configs.colors[3]));
    // Canvas.gradient.addColorStop(.5, usableColor(Configs.colors[4]));
    // Canvas.gradient.addColorStop("0.6", usableColor(Configs.colors[5]));
    Canvas.gradient.addColorStop(.7, usableColor(Configs.colors[6]));
    // Canvas.gradient.addColorStop("0.8", usableColor(Configs.colors[7]));
    Canvas.gradient.addColorStop(1, usableColor(Configs.colors[8]));
  }

}

window.onload = function () {
  let canvas = new Canvas();

  // document.addEventListener('mousedown', function(){
    canvas.animation()
  // })
}


