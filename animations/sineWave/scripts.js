import {start, loop, point, random, objColorToString} from './functional'

function init() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    window.innerWidth,
    window.innerHeight,
    {
      antialias: false,
    }
  );

  ctx.translate(0,  canvas.height/2)

  let color = {
    r: random(0,255),
    g: random(0,255),
    b: random(0,255),
    alpha: 1,
  };
  let angle = 0
  let x = 0
  let increase = random(0,1)
  function draw() {
    requestAnimationFrame(draw);
    loop(100, ()=>{
      point(ctx, x, Math.sin(angle) * canvas.height/2, 1, objColorToString(color))
      angle += increase
      x += 1
      if(x > canvas.width){
        x = 0;
        color = {
          r: random(0,255),
          g: random(0,255),
          b: random(0,255),
          alpha: 1,
        }
      }
    })()
  }

  draw();
}
init()