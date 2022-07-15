import { start} from "../functionalModules.js";

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

  const r = 500;
  const min = 100;
  
  function draw() {
    // requestAnimationFrame(draw);
    // clear(ctx, canvas);
  

  }

  draw();
}
init();
