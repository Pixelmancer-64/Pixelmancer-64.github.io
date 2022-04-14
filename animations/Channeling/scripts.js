const random_rgb = (offset = 0) => {
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

function gradientColors(color, num) {
  let aux = [];
  for (let i = 0; i < num; i++) {
    aux.push({
      r: color.r + i,
      g: color.g + i,
      b: color.b + i,
    });
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
  static colors = gradientColors(random_rgb(100), 101);
  static gradient = random_color(9);
  static cellSize = 1;
  static lineWidth = 1;
  static ca = 0.285;
  static cb = 0.01;
}

class Particle {
  constructor(x, y) {
    this.pos = { x: x, y: y };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.speed = { x: 10, y: 10 };
    this.maxForce = { x: .2, y: .2 };
    this.r = 1;
    this.noise = 100;
  }

  seek(target) {
    const displaciment = { x: target.x - this.pos.x, y: target.y - this.pos.y };
    const mag = this.getMag(displaciment);
    const normalized = {
      x: (this.speed.x * displaciment.x) / mag,
      y: (this.speed.y * displaciment.y) / mag,
    };

    let force = this.applyForce(normalized, { x: -this.vel.x, y: -this.vel.y });

    force = this.limit(force, this.maxForce);
    this.acc = this.applyForce(this.acc, force);
  }

  getMag(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  }

  limit(force, limit) {
    if (force.x > limit.x) force.x = limit.x;
    else if (force.x < -limit.x) force.x = -limit.x;
    if (force.y > limit.y) force.y = limit.y;
    else if (force.y < -limit.y) force.y = -limit.y;

    return force;
  }
  applyForce(force, appliedForece) {
    return { x: (force.x += appliedForece.x), y: (force.y += appliedForece.y) };
  }

  update() {
    if (Canvas.mouse.pressed)
      this.seek({
        x: Canvas.mouse.x + random(this.noise, true),
        y: Canvas.mouse.y + random(this.noise, true),
      });
    this.pos = this.applyForce(this.pos, this.vel);
    this.vel = this.applyForce(this.vel, this.acc);
    this.vel = this.limit(this.vel, this.speed);
    this.acc = { x: 0, y: 0 };

    this.draw();
  }

  draw() {
    Canvas.ctx.fillStyle = "hsla(168, 98%, 41%, 1)";
    Canvas.ctx.beginPath();
    Canvas.ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
    Canvas.ctx.fill();
    Canvas.ctx.closePath();
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
  static mouse = {
    x: 0,
    y: 0,
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

    Canvas.cols = Math.floor(Canvas.width / Configs.cellSize);
    Canvas.rows = Math.floor(Canvas.height / Configs.cellSize);

    this.i = 0;
    this.animationRequest;
    this.particles = [];

    //   this.i < Configs.colors.length - 1 ? this.i++ : (this.i = 0);
    this.gradient();
    Canvas.ctx.strokeStyle = Canvas.gradient;
    Canvas.ctx.fillStyle = Canvas.gradient;
    Canvas.ctx.lineWidth = Configs.lineWidth;

    // this.i < Configs.colors.length - 1 ? this.i++ : (this.i = 0);
    for (let i = 0; i < 1000; i++) {
      this.particles.push(
        new Particle(random(Canvas.width), random(Canvas.height))
      );
    }
  }

  animation() {
    this.animationRequest = requestAnimationFrame(this.animation.bind(this));
    // Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    Canvas.ctx.fillStyle = 'rgba(0,0,0, .1)'
    Canvas.ctx.fillRect(0,0,innerWidth,innerHeight);
    for (let particles of this.particles) {
      particles.update();
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

  startEvents() {
    window.addEventListener("mousemove", function (event) {
      Canvas.mouse.last.x = Canvas.mouse.x;
      Canvas.mouse.last.y = Canvas.mouse.y;
      Canvas.mouse.x = event.x;
      Canvas.mouse.y = event.y;
    });

    document.body.onmousedown = function () {
      Canvas.mouse.pressed = true;
    };
    document.body.onmouseup = function () {
      Canvas.mouse.pressed = false;
    };
  }
}

window.onload = function () {
  let canvas = new Canvas();
  canvas.startEvents();
  canvas.animation();
};
