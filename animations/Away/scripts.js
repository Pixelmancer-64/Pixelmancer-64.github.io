import {
  point,
  start,
  random_hsla,
  loop,
  random,
} from "../functionalModules.js";
const { sqrt, cos, sin, atan2, abs } = Math;

function init() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    window.innerWidth,
    window.innerHeight,
    {
      antialias: false,
    }
  );

  class Dot {
    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = random_hsla();
      this.vel = {
        x: random(-1,1),
        y: random(-1,1),
      };
      this.speed = {
        x: 3,
        y: 3,
      };
    }

    checkBoundries() {
      if (this.x + this.radius > canvas.width) {
        this.x = canvas.width - this.radius;
        this.vel.x *= -1;
      } else if (this.x < 0 + this.radius) {
        this.vel.x *= -1;
        this.x = 0 + this.radius;
      }
      if (this.y + this.radius > canvas.height) {
        this.vel.y *= -1;
        this.y = canvas.height - this.radius;
      } else if (this.y < 0 + this.radius) {
        this.vel.y *= -1;
        this.y = 0 + this.radius;
      }
    }
    draw() {
      point(ctx, this.x, this.y, this.radius, this.color, "FILL");
    }
  }

  let dots = [];
  let n = 200;
  let angle = (Math.PI * 2) / n;
  loop(n, (i) => {
    dots.push(
      new Dot(
        canvas.width / 2 + cos(i * angle) * 300,
        canvas.width / 2 + sin(i * angle) * 300,
        5
      )
    );
  })();

  function draw() {
    ctx.fillStyle = "rgba(0,0,0,.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let dot of dots) {
      for (let otherDot of dots) {
        if (dot != otherDot) {
          const dx = otherDot.x - dot.x;
          const dy = otherDot.y - dot.y;
          const dist = sqrt(dx * dx + dy * dy);
          const theta = atan2(dy, dx);

          if (otherDot.radius + dot.radius > dist) {
            otherDot.vel.x = cos(theta);
            otherDot.vel.y = sin(theta);
          }
        }
      }
      dot.x += dot.vel.x * dot.speed.x;
      dot.y += dot.vel.y * dot.speed.y;
      dot.checkBoundries();
      dot.draw();
    }
  }

  function animate() {
    let animationRequest;
    (function animation() {
      animationRequest = requestAnimationFrame(animation);

      draw();
    })();
  }

  animate();

  window.addEventListener("mousemove", (e) => {
    mouse = {
      x: e.x,
      y: e.y,
    };
  });
}

window.onload = init;
