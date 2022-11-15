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

  const diameter = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth


  // const colors = [
  //   "#8A6B73",
  //   "#DF9D92",
  //   "#F0CE99",
  //   "#96565C",
  //   "#99A8A9",
  //   "#D36658",
  //   "#A57178",
  //   "#974C47",
  //   "#E49171",
  //   "#F0CE99",
  // ];

  const proportion = {
    x: random(1, 50),
    y: random(1, 40)
  }

  const colors = [
    "#581845",
    "#900C3F",
    "#C70039",
    "#e32c36",
    "#FF5733",
    "#FFC30F",
    "#24fffb",
  ];

  class Dot {
    constructor(r, radius, angle) {
      this.x = 0;
      this.y = 0;

      this.r = r;
      this.radius = radius;

      this.origin = diameter / 2 - radius;
      this.color = colors[Math.floor(random(colors.length))];
      this.vel = random(0.0008, 0.006) * positive_or_negative();
      this.angle = angle;
    }

    draw() {
      point(ctx, this.x, this.y, this.radius, this.color, "FILL");
    }

    update() {
      this.x = (this.origin) + cos(this.angle) * (this.r - this.radius * (4 * proportion.x));
      this.y = (this.origin) + sin(this.angle) * (this.r - this.radius * (4 * proportion.y));
      this.angle += this.vel;
      this.radius -= Math.abs(this.vel);
    }
  }

  let dots = [];

  function animate() {
    (function animation() {
      requestAnimationFrame(animation);
      ctx.fillStyle = "rgba(88, 24, 69, .03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let i = 0;
      for (let dot of dots) {
        dot.update();
        if (dot.radius <= 0.3) {
          dots.splice(i, 1);
        }
        dot.draw();
        i++;
      }

      if (dots.length < 2000) {
        let n = dots.legth > 2000 ? 0 : 4;
        let angle = (Math.PI * 2) / n + random(-0.05, 0.05);
        loop(n, (i) => {
          let radius = random(3, 7);
          dots.push(
            new Dot(random(diameter / 2) + 10 , radius, i * angle)
          );
        })();
      }
    })();
  }

  animate();
}

window.onload = init;

document.addEventListener("keydown", (e) => {
  console.log(e.key);
});
