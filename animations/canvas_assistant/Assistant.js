function map(n, start, stop, start2, stop2) {
  return ((n - start) / (stop - start)) * (stop2 - start2) + start2;
}

function easyLoop(times, callback) {
  for (let i = 0; i < times; i++) callback(i);
}

class Colors {
  static random_rgb(offset = 0) {
    const mult = 255 - offset;
    let r = Math.floor(Random.randomInt(mult) + offset);
    let g = Math.floor(Random.randomInt(mult) + offset);
    let b = Math.floor(Random.randomInt(mult) + offset);
    return {
      r,
      g,
      b,
    };
  }

  static randomColor() {
    return this.usableColor(this.random_rgb());
  }

  static usableColor(color, alpha = 1) {
    return `rgba( ${color.r}, ${color.g}, ${color.b}, ${alpha})`;
  }

  static grayScale(number) {
    return this.usableColor({
      r: number,
      g: number,
      b: number,
    });
  }
}

class Random {
  static randomFloat(r, hasNegativeRange = false) {
    if (hasNegativeRange)
      return Math.random() * r * (Math.round(Math.random()) ? 1 : -1);
    return Math.random() * r;
  }

  static randomInt(r, hasNegativeRange = false) {
    r = Math.floor(r + 1);
    if (hasNegativeRange)
      return Math.floor(random(r) * (Math.round(Math.random()) ? 1 : -1));
    return Math.floor(Math.random() * r);
  }
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

  pacman() {
    if (this.pos.y + this.height > Canvas.height) {
      this.pos.y = 0 + this.height;
    } else if (this.pos.y - this.height < 0) {
      this.pos.y = Canvas.height - this.height;
    }

    if (this.pos.x - this.width > Canvas.width) {
      this.pos.x = 0 + this.width;
    } else if (this.pos.x + this.width < 0) {
      this.pos.x = Canvas.width - this.width;
    }
  }

  bounce() {
    if (this.pos.y + this.height > Canvas.height) {
      this.vel.y = -this.vel.y;
    } else if (this.pos.y - this.height < 0) {
      this.vel.y = -this.vel.y;
    }

    if (this.pos.x - this.width > Canvas.width) {
      this.vel.x = -this.vel.x;
    } else if (this.pos.x + this.width < 0) {
      this.vel.x = -this.vel.x;
    }
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
