import {
  start,
  loop2D,
  visualizeHistogram,
  random,
} from "../functionalModules.js";

function init() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    window.innerWidth,
    window.innerHeight,
    {
      antialias: false,
    }
  );

  const cellSize = 3;
  const frequency = 0.02;

  noise.seed(random(0, 100));

  let array = loop2D(
    canvas,
    cellSize,
    { x: 1, y: 1 },
    function (x, y, noiseInc, arr) {
      arr[y][x] = noise.simplex2(x * frequency, y * frequency);
    }
  );

  visualizeHistogram(ctx, cellSize, array);

  function draw() {
    // clear(ctx, canvas);
  }

  draw();
}
init();
