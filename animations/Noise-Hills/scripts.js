import {
  point,
  start,
  random_color,
  random,
  loop,
} from "../functionalModules.js";
const { cos, sin } = Math;

function init(element) {
  const [canvas, ctx] = start(
    document.getElementById(element.id),
    window.width,
    canvas.height,
    {
      antialias: false,
    }
  );

  class Emitter {
    constructor(x, y, generate) {
      this.objs = generate(10, 1);
      this.x = x;
      this.y = y;
    }

    emit() {
      ctx.save();
      ctx.translate(this.x, this.y);

      for (let i = this.objs.length - 1; i >= 0; i++) {
        this.objs[i].update();
        this.objs[i].draw();
      }

      ctx.restore();
    }
  }

  class Pixel {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = random_color();

      this.a = random(1, 10);
      this.b = random(1, 10);
      this.delta = Math.PI / 2;
      this.t = 0;

      this.height = canvas.width / 2.5;
      this.width = this.height - (this.size + 1);
    }

    update() {
      this.x = this.width * sin(this.a * this.t + this.delta);
      this.y = this.height * sin(this.b * this.t);

      this.t += 0.001;
    }

    draw() {
      point(ctx, this.x, this.y, this.size, this.color);
    }
  }

  const PixelFountain = new Emitter(
    canvas.width / 2,
    canvas.height / 2,
    generate
  );

  let animationRequest;

  function generate(num, size) {
    return Array(num).map((e, index) => new Pixel(0, 0, size));
  }

  (function animation() {
    animationRequest = requestAnimationFrame(animation);
    PixelFountain.emit();
  })();

  document.addEventListener("keydown", (e) => {
    if (e.key == "End") {
      cancelAnimationFrame(animationRequest);
    }
    if (e.key == "Home") {
      animation();
    }
  });
}
