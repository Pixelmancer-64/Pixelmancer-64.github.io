const random_rgb = () => {
  let offset = 130;
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

class Configs {
  static colors = random_color(5);
}

class Particle {
  constructor(x, y, radius, color) {
    this.pos = {
      x: x,
      y: y,
    };

    this.blur = Math.random() * 25;
    this.radius = radius;
    this.color = color;
    this.signal = 1
    this.brightness = Math.random() * .1
  }

  draw() {
    Canvas.ctx.beginPath();

    Canvas.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);

    Canvas.ctx.shadowColor = this.color;
    Canvas.ctx.shadowBlur = this.blur;
    Canvas.ctx.fillStyle = this.color;
    Canvas.ctx.fill();
  }

  update() {
    if (this.blur < 1 || this.blur > 25) this.signal *= -1;
    this.blur += this.signal * this.brightness
  }
}

class Canvas {
  static ctx;
  static width;
  static height;

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

    this.animationRequest;
    this.i = 0;
    this.arcs = [];
    this.trace = [];

    Canvas.ctx.translate(Canvas.width / 2, Canvas.height / 2);
  }

  animation() {
    Canvas.ctx.clearRect(
      -Canvas.width / 2,
      -Canvas.height / 2,
      Canvas.width,
      Canvas.height
    );

    Canvas.ctx.beginPath();

    this.trace.forEach((shape) => {
      Canvas.ctx.lineTo(shape.pos.x, shape.pos.y);
    });

    Canvas.ctx.closePath();
    Canvas.ctx.strokeStyle = "white";
    Canvas.ctx.lineWidth = 1;
    Canvas.ctx.shadowColor = "white";
    Canvas.ctx.shadowBlur = 10;
    Canvas.ctx.stroke();

    this.arcs.forEach((shape) => {
      shape.update();
      shape.draw();
    });

    this.animationRequest = requestAnimationFrame(this.animation.bind(this));
  }

  init() {
    let nParticles = 150;
    let overlapping = false;
    let guardian = 400;
    let guardian_counter = 0;

    while (this.arcs.length < nParticles && guardian_counter < guardian) {
      let eye = {
        x:
          ((Math.random() * Canvas.width) / 2) *
          (Math.round(Math.random()) ? 1 : -1),
        y:
          ((Math.random() * Canvas.height) / 2) *
          (Math.round(Math.random()) ? 1 : -1),
        radius: (Math.random() * 11) + 3 
      };

      overlapping = false;
      for (let i = 0; i < this.arcs.length; i++) {
        let previousEye = this.arcs[i];
        let dx = eye.x - previousEye.pos.x;
        let dy = eye.y - previousEye.pos.y;
        let distance = dx * dx + dy * dy;
        if (distance < (eye.radius + previousEye.radius) * (eye.radius + previousEye.radius)) {
          overlapping = true;
          break;
        }
      }

      if (!overlapping) {
        let color = Configs.colors[this.i];

        this.arcs.push(
          new Particle(
            eye.x,
            eye.y,
            eye.radius,
            `rgba(${color.r},${color.g},${color.b}, 1)`
          )
        );

        this.i == Configs.colors.length - 1 ? (this.i = 0) : this.i++;
      }

      guardian_counter++;
    }

    this.arcs.forEach((shape) => {
      if ( shape.radius > 11 && Math.random() > .8) {
        this.trace.push(shape);
      }
    });

  }
  

  events() {
    document.body.onmousedown = function () {
      Configs.direction *= -1;
    };
  }
}

window.onload = function () {
  let canvas = new Canvas();
  canvas.init();
  canvas.animation();
  //   canvas.events();
};
