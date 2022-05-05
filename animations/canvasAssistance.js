function random_rgb(offset = 0) {
  const mult = 255 - offset;
  let r = Math.floor(random(mult) + offset);
  let g = Math.floor(random(mult) + offset);
  let b = Math.floor(random(mult) + offset);
  return {
    r,
    g,
    b,
  };
}

function random_color(num) {
  let aux = [];
  for (let i = 0; i < num; i++) {
    aux.push(random_rgb());
  }
  return aux;
}

function randomColor() {
  return usableColor(random_rgb());
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
  if (hasNegativeRange)
    return Math.random() * r * (Math.round(Math.random()) ? 1 : -1);
  return Math.random() * r;
}

function randomInt(r, hasNegativeRange = false) {
  r = Math.floor(r + 1);
  if (hasNegativeRange)
    return Math.floor(random(r) * (Math.round(Math.random()) ? 1 : -1));
  return Math.floor(Math.random() * r);
}

function usableColor(color, alpha = 1) {
  return `rgba( ${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function map(n, start, stop, start2, stop2) {
  return ((n - start) / (stop - start)) * (stop2 - start2) + start2;
}

class Particle {
  constructor(
    pos = { x: 0, y: 0 },
    vel = { x: 0, y: 0 },
    acc = { x: 0, y: 0 },
    speed = { x: 0, y: 0 },
    maxForce = { x: 0, y: 0 }
  ) {
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.speed = speed;
    this.maxForce = maxForce;

    this.ctx = Canvas.ctx;
  }

  seek(target) {
    const displaciment = { x: target.x - this.pos.x, y: target.y - this.pos.y };
    const normalized = this.normalize(displaciment);
    let force = this.applyForce(normalized, { x: -this.vel.x, y: -this.vel.y });
    force = this.limit(force, this.maxForce);
    this.acc = this.applyForce(this.acc, force);
  }

  getMag(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  }

  normalize(vector2) {
    const mag = this.getMag(vector2);
    return {
      x: (this.speed.x * vector2.x) / mag,
      y: (this.speed.y * vector2.y) / mag,
    };
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
    this.pos = this.applyForce(this.pos, this.vel);
    this.vel = this.applyForce(this.vel, this.acc);
    this.vel = this.limit(this.vel, this.speed);
    this.acc = { x: 0, y: 0 };
  }
}

class Point extends Particle {
  constructor(radius, color, ...particles) {
    super(...particles);
    this.radius = radius;
    this.color = color;
  }

  fill(cellSize = 1) {
    const { x, y } = this.pos;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(x * cellSize, y * cellSize, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  stroke(cellSize = 1) {
    const { x, y } = this.pos;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.arc(x * cellSize, y * cellSize, this.radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }
}

class Square extends Particle {
  constructor(width, height, color, ...particles) {
    super(...particles);
    this.width = width;
    this.height = height;
    this.color = color;
  }

  fill(cellSize = 1) {
    const { x, y } = this.pos;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x * cellSize, y * cellSize, this.width, this.height);
  }

  stroke(cellSize = 1) {
    const { x, y } = this.pos;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.rect(x * cellSize, y * cellSize, this.width, this.height);
    this.ctx.stroke();
  }
}

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
    y: 0
  }

  constructor(cellSize, isSquare = false) {
    this.cellSize = cellSize;
    this.isSquare = isSquare
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

    Canvas.cols = Math.floor(Canvas.width / this.cellsize);
    Canvas.rows = Math.floor(Canvas.height / this.cellsize);

    Canvas.middle.x = Math.ceil(Canvas.cols / 2);
    Canvas.middle.y = Math.ceil(Canvas.rows / 2);

    this.animationRequest;
    this.iterationsPerFrame = 99;

    const size = this.cellsize;
    for (let i = 0; i < Canvas.rows; i++) {
      Canvas.grid[i] = [];

      for (let j = 0; j < Canvas.cols; j++) {
        Canvas.grid[i][j] = false;
      }
    }

  }

  animation(callback) {
    this.animationRequest = requestAnimationFrame(this.animation.bind(this));

    for(let i =0; i<this.iterationsPerFrame; i++){
      callback()
    }
    // Canvas.ctx.clearRect(
    //   0,
    //   0,
    //   Canvas.width,
    //   Canvas.height,
    // );

    // cancelAnimationFrame(this.animationRequest);
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

    document.addEventListener("resize", ()=> {
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
    })
  }
}
