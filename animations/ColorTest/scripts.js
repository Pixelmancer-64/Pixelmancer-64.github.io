import {
  start,
  visualizeHistogram,
  random,
  point,
  map_color,
} from "../functionalModules.js";

function init() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    200,
    200,
    {
      antialias: false,
    }
  );

  const cellSize = 1;
    let yoff = 0

  noise.seed(10);

  let array = [];
  for (
    let y = 0, height = Math.floor(canvas.height / cellSize);
    y < height;
    y++
  ) {

    array[y] = [];
    let xoff = 0

    for (
      let x = 0, width = Math.floor(canvas.width / cellSize);
      x < width;
      x++
    ) {

      
      point(ctx, x, y, 1, map_color(noise.perlin2(xoff, yoff),0,1,0,255))
      xoff += 0.01;
    }
    yoff += 0.01
  }
  // visualizeHistogram(ctx, 1, array)

  function draw() {
    // clear(ctx, canvas);
  }

  draw();
}
init();
