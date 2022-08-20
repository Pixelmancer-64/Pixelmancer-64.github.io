import {
  point,
  start,
  random_hsla,
  loop,
  random,
  rect,
  clear,
  hsla,
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
    constructor(x, y, type, signalX, signalY) {
      this.objs = [];
      this.type = type;
      this.x = x;
      this.y = y;
      this.signalX = signalX
      this.signalY = signalY

    }

    emit() {

      ctx.save()
      ctx.translate(this.x, this.y);

      for (let [index, obj] of this.objs.entries()) {
        obj.update();
        obj.draw();
        obj.size -= random(.001, .3);
        if (obj.size <= .5) {
          this.objs.splice(index, 1);
        }
      }

      loop(1, () => {
        this.objs.push(new this.type(random(-15, 15), random(-10, 10), 100, this.signalX, this.signalY));
      })();
      ctx.restore()
    }
  }

  class Pixel {
    constructor(x, y, size, signalX = -1, signalY = -1) {
      this.x = x;
      this.y = y;
      this.signalX = signalX
      this.signalY = signalY
      this.size = size;
      this.color = random_hsla();
      this.i = random(-1,1)
    }

    update() {
      this.x += cos(this.i) * (.007 * this.size) * this.signalX;
      this.y += 1 * this.signalY;
      this.i += this.i * .002
    }

    draw() {
      rect(ctx, this.x, this.y, this.size, this.size, this.color);
    }
  }

  const PixelFountain = new Emiter(canvas.width / 2, canvas.height + 10, Pixel, -1, -1);
  const PixelFountain1 = new Emiter(canvas.width / 2, 0 - 110, Pixel, 1, 1);

  let animationRequest;

  function animate() {
    (function animation() {
      animationRequest = requestAnimationFrame(animation);
      clear(ctx, canvas);
      PixelFountain.emit();
      PixelFountain1.emit();

    })();
  }

  animate();

  document.addEventListener("mousemove", (e)=>{
    // PixelFountain.x = e.x
    // PixelFountain.y = e.y
  })

  document.addEventListener("keydown", (e) => {
    if (e.key == "End") {
      cancelAnimationFrame(animationRequest);
    }
    if (e.key == "Home") {
      animate();
    }
    if (e.key == "Delete") {
      cancelAnimationFrame(animationRequest);
      init();
    }
  });
}

window.onload = init;
