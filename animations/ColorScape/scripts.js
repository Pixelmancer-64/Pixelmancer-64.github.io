
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

  const cellSize = 0.007;
  const size = 1;
  const r = canvas.width / 2;
  const used_function = functions[Math.floor(Math.random() * functions.length)];

  for (let i = 0; i < 360; i += cellSize) {
    for (let j = 0; j < r; j += 100) {
      const [x, y] = used_function(i, j, r);
      rect(
        ctx,
        x,
        y,
        size,
        size,
        `hsl(${i}, 100%, ${map(j, 0, r, 50, 100)}%)`,
        "FILL"
      );
    }
  }
}

document.addEventListener("DOMContentLoaded", draw, false);

const functions = [
  (i, j, r) => [i * Math.sin(i), (r - j) * Math.tan(i)],
  (i, j, r) => [i * Math.tan(i), (r - j) * Math.tan(i)],
  (i, j, r) => [i * Math.sin(i), (r - j) * Math.cos(i)],
  (i, j, r) => [i * Math.sin(i), (i) * Math.cos(i)],
  (i, j, r) => [i * Math.sin(i), (r - j) * Math.tan(j - i)],
  (i, j, r) => [i * Math.sin(j) * Math.cos(i), Math.cos(i) * r],
  (i, j, r) => [i * Math.sin(j) * Math.cos(i), Math.cos(i) * j],
  (i, j, r) => [i * Math.sin(j) * Math.cos(i), Math.tan(i) * r],
  (i, j, r) => [i * Math.sin(j) * Math.tan(i), Math.cos(i) * r],
  (i, j, r) => [i * Math.sin(j) * Math.tan(i), Math.cos(i) * i],
  (i, j, r) => [i * Math.sin(j) * Math.tan(i), Math.cos(r) * i],
  (i, j, r) => [ Math.tan(r) * Math.tan(i), Math.cos(j) * i],
  (i, j, r) => [ Math.tan(r) * Math.tan(i), Math.cos(r) * i],
  (i, j, r) => [ Math.tan(r) * Math.tan(i) * 100, Math.cos(r) * i],
  (i, j, r) => [i * Math.sin(i), (r - i) * Math.cos(j)],
  (i, j, r) => [i * Math.sin(i), (r - i) * Math.cos(j) * .45],
  (i, j, r) => [i * Math.sin(i), (r - i) * Math.cos(r) ],
  (i, j, r) => [i * Math.sin(i), (r - i) * Math.cos(i) ],
  (i, j, r) => [i * Math.sin(i), (r - i) * Math.sin(r) ],
  (i, j, r) => [i * Math.sin(i), (r - i) * Math.tan(j) ],
  (i, j, r) => [i * Math.sin(i), (j - i) * Math.tan(j) ],
  (i, j, r) => [i * Math.sin(i), (j - r) * Math.sin(i) ],
  (i, j, r) => [j * Math.cos(i), (j - r) * Math.sin(i) ],
  (i, j, r) => [i * Math.tan(i), (r - j) * Math.tan(i)/i],
  (i, j, r) => [i * Math.cos(i), (r - j) * Math.tan(i)/j],
  (i, j, r) => [i * Math.sin(i), (r - j) * Math.tan(i)/j],
  (i, j, r) => [i * Math.cos(i), (r - j) * Math.sin(i)],
  (i, j, r) => [i * Math.cos(i) / (r - j) * i, (r - j) * Math.sin(i)],
  (i, j, r) => [i * Math.cos(i) / (r - j) * j, (r - j) * Math.sin(i)],
  (i, j, r) => [i * Math.tan(i), (r - j) * Math.cos(i)],
  (i, j, r) => [i * Math.tan(i), (r - j) * Math.sin(i)],
  (i, j, r) => [i * Math.tan(i), ( i) * Math.cos(r)],
  (i, j, r) => [i * Math.tan(i), ( i) * Math.cos(r)],




];
