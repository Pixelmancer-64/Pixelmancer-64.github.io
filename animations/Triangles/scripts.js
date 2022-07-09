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

  ctx.translate(canvas.width / 2, canvas.height / 2);

  const r = canvas.width < canvas.height ? canvas.width / 2 : canvas.height /2;
  let angle = Math.PI / 2 + .5;
  let hue = 150

  function draw() {
    requestAnimationFrame(draw);
    // clear(ctx, canvas);
  
      ctx.strokeStyle = "hsl(" + hue + ",100%,50%)"
      ctx.lineWidth = .05
      ctx.beginPath()
      ctx.moveTo(0,0)
      ctx.lineTo(r * 0.5 * Math.tan(angle),  r * Math.sin(angle))
      ctx.lineTo(r * Math.sin(angle), r * Math.cos(angle))
      ctx.lineTo(0, 0)
      ctx.stroke()
      angle += .009;

      
    hue += .05

  }

  draw();
}
init();
