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
  const size = 1;
  const r = canvas.width / 2;

  for (let i = 0; i < 360; i += cellSize) {
    for (let j = 0; j < r; j += 50) {
      point(
        ctx,
        (r - j) * Math.tan(i),
        (r - i) * Math.cos(j),
        size,
        `hsl(${i}, 100%, ${50}%)`,
        "FILL"
      );
    }
  }
}

document.addEventListener("DOMContentLoaded", draw, false);
