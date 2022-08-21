function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < 250; i++) {
    Boid.flock.push(new Boid());
  }
}

function draw() {
  background(0, 0, 0, 25);
  for (let boid of Boid.flock) {
    boid.edges();
    boid.flock(Boid.flock);
    boid.update();
    boid.show();
  }
}

const random_rgb = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return { r: r, g: g, b: b };
};

function random_color(num) {
  let aux = [];
  for (let i = 0; i < num; i++) {
    aux.push(random_rgb());
  }
  return aux;
}

class Boid {
  static perceptionRadius = 50
  static flock = [];
  static colors = random_color(Math.floor(Math.random() * 5 + 1));

  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(1, 1);
    this.velocity.setMag(3);
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 5;
    this.r = 5;
    this.color = Boid.colors[Math.floor(Math.random() * Boid.colors.length)];
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  align(distances, total) {
    let steering = createVector();

    for (let aux of distances) {
      steering.add(aux.guide.velocity);
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(distances, total) {
    let steering = createVector();

    for (let aux of distances) {
      let diff = p5.Vector.sub(this.position, aux.guide.position);
      diff.div(aux.distance * aux.distance);
      steering.add(diff);
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(distances, total) {
    let steering = createVector();

    for (let aux of distances) {
      steering.add(aux.guide.position);
    }

    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(boids) {
    let distances = [];

    for (let other of boids) {
      if (other != this) {
        let aux = dist(
          this.position.x,
          this.position.y,
          other.position.x,
          other.position.y
        );
        if (aux < Boid.perceptionRadius) {
          distances.push({
            distance: aux,
            guide: other,
          });
        }
      }
    }

    let total = distances.length;
    let alignment = this.align(distances, total);
    let cohesion = this.cohesion(distances, total);
    let separation = this.separation(distances, total);

    alignment.mult(1.5);
    cohesion.mult(0.05);
    separation.mult(1);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    stroke(this.color.r, this.color.g, this.color.b);
    strokeWeight(3);
    fill(this.color.r, this.color.g, this.color.b);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }
}
