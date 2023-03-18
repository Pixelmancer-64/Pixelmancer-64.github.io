import { start, random, clear, arc } from "../functionalModules.js";
import Tree  from "./tree.js"

function init() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    window.innerWidth,
    window.innerHeight,
    {
      antialias: false,
    }
  );

  const bonsai = new Tree(ctx, canvas, 10, 100, 80);

  function animate() {
    (function animation() {
      // requestAnimationFrame(animation);
      clear(ctx, canvas);

      bonsai.draw();
      bonsai.grow();
    })();
  }

  animate();
}

window.onload = init;