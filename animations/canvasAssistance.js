function random_rgb(offset = 0) {
  let mult = 255 - offset;
  let r = Math.floor(Math.random() * mult + offset);
  let g = Math.floor(Math.random() * mult + offset);
  let b = Math.floor(Math.random() * mult + offset);
  return {
    r: r,
    g: g,
    b: b,
  };
}

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
}

class Point extends Particle{
  constructor(radius, color,...particles){
    super(...particles)
    this.radius = radius;
    this.color = color;
  }

  fill(){
    const {x, y} = this.pos;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(x, y, this.radius, 0, Math.PI * 2)
    this.ctx.fill()
  }

  stroke(){
    const {x, y} = this.pos;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.arc(x, y, this.radius, 0, Math.PI * 2)
    this.ctx.stroke()
  }
}

class Square extends Particle{
  constructor(width, height, color,...particles){
    super(...particles)
    this.width = width;
    this.height = height;
    this.color = color;
  }

  fill(){
    const {x, y} = this.pos;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x, y, this.width, this.height)
  }

  stroke(){
    const {x, y} = this.pos;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.rectect(x, y, this.width, this.height)
    this.ctx.stroke()
  }
}