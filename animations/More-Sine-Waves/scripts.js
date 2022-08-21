import { start, loop, point, random, clear } from "../functionalModules.js";

function init() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    window.innerWidth,
    window.innerHeight,
    {
      antialias: false,
    }
  );

  ctx.translate(canvas.width/2, canvas.height / 2);

  let hue = 0;
  let angle = 0;
  let x = 0;

  const increase = random(0,1);
  const r = random(6,10);
  const n = Math.floor(random(1, 300)) 
  const xIncrease = random(0,20)

  function draw() {
    requestAnimationFrame(draw);
    // clear(ctx, canvas);
    loop(n, () => {
      point(
        ctx,
        x * Math.cos(angle) / 2,
        (Math.sin(angle) * (canvas.height - r)) / 2,
        r,
        "hsl(" + hue + ",100%,50%)"
      );
      angle += increase;
      x += xIncrease;
      if (x > canvas.width) {
        x = 0;
        hue += 0.4;
      }
    })();
  }

  draw();
}
init();
