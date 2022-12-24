import {
  point,
  start,
  positive_or_negative,
  loop,
  random,
  random_color,
  clear,
} from "../functionalModules.js";

function init() {
  class Dot {
    constructor(pos, vel, r) {
      this.pos = pos;
      this.r = r;
      this.vel = vel;
      this.color = random_color(1, 100);
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }

    check_boundaries() {
      if (this.pos.x + this.r >= canvas.width) {
        this.pos.x = canvas.width - this.r;
        this.vel.x *= -1;
      } else if (this.pos.x <= 0 + this.r) {
        this.pos.x = 0 + this.r;
        this.vel.x *= -1;
      }
      if (this.pos.y + this.r >= canvas.height) {
        this.pos.y = canvas.height - this.r;
        this.vel.y *= -1;
      } else if (this.pos.y <= 0 + this.r) {
        this.pos.y = 0 + this.r;
        this.vel.y *= -1;
      }
    }

    update() {
      this.check_boundaries();
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }
  }

  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    window.innerWidth,
    window.innerHeight,
    {
      antialias: false,
    }
  );

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  let dots = [];

  loop(100, (index) => {
    dots.push(
      new Dot(
        { x: random(0, canvas.width), y: random(0, canvas.height) },
        { x: random(-1.5, 1.5), y: random(-1, 1) },
        random(3, 8)
      )
    );
  })();

  (function animation() {
    requestAnimationFrame(animation);
    clear(ctx, canvas);

    dots.forEach((e) => {
      e.update();
    });

    connect();

    dots.forEach((e) => {
      e.draw();
    });
  })();

  function connect() {
    for (let a = 0; a < dots.length; a++) {
      for (let b = a; b < dots.length; b++) {
        const a_dot = dots[a];
        const b_dot = dots[b];
        const dist =
          Math.pow(a_dot.pos.x + a_dot.r - b_dot.pos.x + b_dot.r, 2) +
          Math.pow(a_dot.pos.y + a_dot.r - b_dot.pos.y + b_dot.r, 2);

        if (dist < Math.pow(canvas.width / 7, 2)) {
          ctx.strokeStyle = "rgba(252,255,255," + (1 - dist * 0.00007) + ")";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(dots[a].pos.x, dots[a].pos.y);
          ctx.lineTo(dots[b].pos.x, dots[b].pos.y);
          ctx.stroke();
        }
      }
    }
  }
}

window.onload = init;
