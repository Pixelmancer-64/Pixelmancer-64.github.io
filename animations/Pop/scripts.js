import {
  point,
  start,
  clear,
  random_color,
} from "../functionalModules.js";
const { sqrt } = Math;

function init() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    window.innerWidth,
    window.innerHeight,
    {
      antialias: false,
    }
  );

  const min = 4;
  const max = 10;
  const nParticles = 9999;
  const guardian = 999;
  let points = [];
  let foundPoints = [];
  let color = random_color();

  function draw() {
    clear(ctx, canvas);
    for (let dot of points) {
      dot.found ? dot.drawSpecial() : dot.draw();
    }
    for (let dot of foundPoints) {
      dot.found ? dot.drawSpecial() : dot.draw();
    }
  }

  function animate(e) {
    let aux = findClosest(e);
    let i = 0;
    let animationRequest;
    function animation() {
      animationRequest = requestAnimationFrame(animation);
      aux = findClosest(aux);

      i++;
      if (i > 100) {
        cancelAnimationFrame(animationRequest);
        color = random_color();
      }
    }
    animation();
  }

  class Dot {
    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.found = false;
      this.color;
    }

    draw() {
      point(ctx, this.x, this.y, this.radius, "white", "FILL");
    }
    drawSpecial() {
      point(ctx, this.x, this.y, this.radius, this.color, "FILL");
    }
  }

  function getPoints() {
    let counter = 0;

    while (points.length < nParticles && counter < guardian) {
      counter = 0;

      let point = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: min,
      };

      while (!isValid(point)) {
        point.x = Math.random() * canvas.width;
        point.y = Math.random() * canvas.height;
        point.radius = min;
        counter++;
      }

      while (isValid(point)) {
        point.radius += 1;
      }
      points.push(new Dot(point.x, point.y, point.radius - .5));
    }
  }

  function isValid(c) {
    if (c.radius > max) return false;

    if (
      c.y + c.radius > canvas.height ||
      c.y - c.radius < 0 ||
      c.x + c.radius > canvas.width ||
      c.x - c.radius < 0
    ) {
      return false;
    }

    for (let i = 0; i < points.length; i++) {
      let previousEye = points[i];
      let dx = c.x - previousEye.x;
      let dy = c.y - previousEye.y;
      let distance = dx * dx + dy * dy;
      if (
        distance <
        c.radius * c.radius * 2 + previousEye.radius * previousEye.radius * 2
      ) {
        return false;
      }
    }

    return true;
  }

  getPoints();
  draw();

  // window.addEventListener("mousemove", findClosest);
  window.addEventListener("mousedown", animate);

  function findClosest(e) {
    let closest = new Dot(e.x, e.y, 0);
    let closestIndex = 0;

    for (const [index, point] of points.entries()) {
      let dx = e.x - point.x;
      let dy = e.y - point.y;

      let cx = e.x - closest.x;
      let cy = e.y - closest.y;

      let distance = sqrt(dx * dx + dy * dy);
      let closestDistante = sqrt(cx * cx + cy * cy);
      if (
        distance + point.radius < closestDistante + closest.radius ||
        closestDistante == 0
      ) {
        closest = point;
        closestIndex = index;
      }
    }

    closest.found = true;
    points.splice(closestIndex, 1);
    closest.color = color;

    foundPoints.push(closest);
    draw();
    return closest;
  }
}

window.onload = init;
