import {
  point,
  start,
  positive_or_negative,
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

  const colors = [
    "#8A6B73",
    "#DF9D92",
    "#F0CE99",
    "#96565C",
    "#99A8A9",
    "#D36658",
    "#A57178",
    "#974C47",
    "#E49171",
    "#F0CE99",
  ];

  class Dot {
    constructor(r, radius, angle) {
      this.x = 0;
      this.y = 0;

      this.r = r;
      this.radius = radius;

      this.origin = canvas.width / 2 - radius;
      this.color = colors[Math.floor(random(colors.length))];
      this.vel = .008 * positive_or_negative();
      this.angle = angle;
    }

    draw() {
      point(ctx, this.x, this.y, this.radius, this.color, "FILL");
    }

    update() {
      this.x = this.origin + cos(this.angle) * this.r;
      this.y = this.origin + sin(this.angle) * this.r;
      this.angle += this.vel;
    }
  }

  let dots = [];
  let n = 2000;
  let angle = (Math.PI * 2) / n;
  loop(n, (i) => {
    let radius = random(4, 9);
    dots.push(
      new Dot(random(canvas.width / 2 - radius) + 30, radius, i * angle)
    );
  })();

  function animate() {
    let animationRequest;
    (function animation() {
      animationRequest = requestAnimationFrame(animation);
      ctx.fillStyle = "rgba(92, 69, 80, .006)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let dot of dots) {
        dot.update();
        dot.draw();
      }
    })();
  }

  animate();
}

window.onload = init;

document.addEventListener("keydown", (e) => {
  console.log(e.key);
});
