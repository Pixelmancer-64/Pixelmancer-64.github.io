import {
  point,
  start,
  random_color,
  random,
  loop,
} from "../functionalModules.js";
const { cos, sin } = Math;

function init(element) {
  const [canvas, ctx] = start(document.getElementById(element.id), 200, 200, {
    antialias: false,
  });

  class Emiter {
    constructor(x, y, generate) {
      this.obj = generate(1);
      this.x = x;
      this.y = y;
    }

    emit() {
      ctx.save();
      ctx.translate(this.x, this.y);

      this.obj.update();
      this.obj.draw();

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

  const PixelFountain = new Emiter(100, 100, generate);

  let animationRequest;

  function generate(size) {
    return new Pixel(0, 0, size);
  }

  function animate() {
    (function animation() {
      animationRequest = requestAnimationFrame(animation);
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
  });
}

window.onload = () => {
  loop(100, (i) => {
    const canvas = document.createElement("canvas");
    canvas.id = `canvas-${i}`;
    document.querySelector("main").appendChild(canvas);
    init(canvas);
  })();
};
