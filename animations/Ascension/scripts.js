import {
  point,
  start,
  random_hsla,
  loop,
  random,
  rect,
  clear,
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

  class Emiter {
    constructor(x, y, objs) {
      this.objs = objs;
      this.x = x;
      this.y = y;
    }

    emit() {
      ctx.save();
      ctx.translate(this.x, this.y);

      for (let obj of this.objs) {
        obj.update();
        obj.draw();
      }

      ctx.restore();
    }
  }

  class Pixel {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = random_hsla();
    }

    update() {
      this.y -= 2 / this.size;
      this.x += cos(this.y * 0.1) * 2;
    }

    draw() {
      rect(ctx, this.x, this.y, this.size, this.size, this.color);
    }
  }

  let pixels = [];
  const n = 500;

  loop(n, (i) => {
    pixels.push(new Pixel(0, 0, random(5, 100)));
  })();

  pixels.sort((a, b)=>{
    return a.size > b.size 
  })

  const PixelFountain = new Emiter(canvas.width / 2, canvas.height / 1.5, pixels);
  let animationRequest;

  function animate() {
    (function animation() {
      animationRequest = requestAnimationFrame(animation);
      clear(ctx, canvas);
      PixelFountain.emit();
    })();
  }

  animate();

  document.addEventListener("keydown", (e) => {
    if (e.key == "End") {
      cancelAnimationFrame(animationRequest);
    }
    if (e.key == "Home") {
      animate();
    }
    if(e.key == "Delete"){
      cancelAnimationFrame(animationRequest);
      init()
    }
  });
}

window.onload = init;