function draw() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    window.innerWidth,
    window.innerHeight,
    {
      antialias: false,
    }
  );

  ctx.translate(canvas.width / 2, canvas.height / 2);

  const cellSize = .01;
  const size = 1.5;
  const r = canvas.width / 2;

  for (let i = 0; i < 360; i += cellSize) {
    for (let j = 0; j < r; j += 100) {
      rect(
        ctx,
        (i) * Math.sin(i),
        (r - j) * Math.tan(i),
        size,
        size,
        `hsl(${i}, 100%, ${map(j, 0, r, 50, 100)}%)`,
        "FILL"
      );
    }
  }
}

document.addEventListener("DOMContentLoaded", draw, false);
