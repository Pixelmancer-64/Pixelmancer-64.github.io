const random_rgb = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
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

class Particle {
  constructor(radius, angle, r) {
    this.pos = p5.Vector.fromAngle(angle);
    this.pos.mult(radius);
    this.r = r;
    this.color =
      Snowflake.colors[Math.floor(Math.random() * Snowflake.colors.length)];
  }

  update() {
    this.pos.x -= 1;
    this.pos.y += random(-Snowflake.range, Snowflake.range);

    let angle = this.pos.heading();
    angle = constrain(angle, 0, PI / Snowflake.alpha);
    let magnitude = this.pos.mag();
    this.pos = p5.Vector.fromAngle(angle);
    this.pos.setMag(magnitude);
  }

  show() {
    fill(this.color.r, this.color.g, this.color.b, 50);
    stroke(this.color.r, this.color.g, this.color.b, 10);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  intersects(snowflake) {
    let result = false;
    for (let s of snowflake) {
      let d = dist(s.pos.x, s.pos.y, this.pos.x, this.pos.y);
      if (d < this.r * this.r) {
        result = true;
        break;
      }
    }
    return result;
  }

  finished() {
    return this.pos.x < 1;
  }
}

class Snowflake {
  static current;
  static list = [];
  static colors = random_color(5);
  static range = Math.ceil(Math.random() * 7) + 2;
  static alpha = Math.ceil(Math.random() * 10);

  static radius = 4;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  Snowflake.current = new Particle(width / 2, 0, Snowflake.radius);
}

function draw() {
  translate(width / 2, height / 2);
  rotate(PI / Snowflake.alpha);

  let count = 0;
  while (
    !Snowflake.current.finished() &&
    !Snowflake.current.intersects(Snowflake.list)
  ) {
    Snowflake.current.update();
    count++;
  }

  count == 0 ? noLoop() : Snowflake.list.push(Snowflake.current);
  Snowflake.current = new Particle(width / 2, 0, Snowflake.radius);

  for (let i = 0; i < Snowflake.alpha; i++) {
    rotate(PI / (Snowflake.alpha / 2));
    Snowflake.current.show();
    for (let p of Snowflake.list) {
      p.show();
    }

    push();
    scale(1, -1);
    Snowflake.current.show();
    for (let p of Snowflake.list) {
      p.show();
    }
    pop();
  }
}
