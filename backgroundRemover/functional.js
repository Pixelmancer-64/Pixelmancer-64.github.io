function rect(ctx, x, y, width, height, color = "black", mode = "fill") {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill();
}

function arc(ctx, x, y, radius, start, end, color = "black", mode = "fill") {
  ctx.beginPath();
  ctx.arc(x, y, radius, start, end);
  ctx.fillStyle = color;
  ctx.fill();
}

function point(ctx, x, y, radius, color = "black", mode = "fill") {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function clear(ctx, canvas) {
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.clearRect(
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  ctx.restore();
}

function random(start, end) {
  return Math.random() * (end - start) + start;
}

function map(n, start, stop, start2, stop2) {
  return ((n - start) / (stop - start)) * (stop2 - start2) + start2;
}

function loop(i, callback) {
  function wraper(...args) {
    for (let j = 0; j < i; j++) {
      callback(i, ...args);
    }
  }
  return wraper;
}

function random_color(alpha = 1, offset = 0) {
  return `rgba(${random(offset, 255)}, ${random(offset, 255)}, ${random(
    offset,
    255
  )}, ${alpha})`;
}

function map_color(val, s, e, s1, e1) {
  const mapped = map(val, s, e, s1, e1);
  return `rgba(${mapped}, ${mapped}, ${mapped}, ${1})`;
}

function objColorToString(color) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.alpha})`;
}

function swap(arr, id1, id2) {
  [arr[id1], arr[id2]] = [arr[id2], arr[id1]];
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function start(canvas, width, height, options = {}) {
  canvas.width = width;
  canvas.height = height;
  return [canvas, canvas.getContext("2d", options)];
}

function getImageData(ctx, canvas) {
  ctx.save();
  ctx.resetTransform();
  const aux = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.restore();
  return aux;
}

function imageDataLoop(imageData, callback) {
  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const r = imageData.data[y * 4 * imageData.width + x * 4];
      const g = imageData.data[y * 4 * imageData.width + (x * 4 + 1)];
      const b = imageData.data[y * 4 * imageData.width + (x * 4 + 2)];
      const alpha = map(
        imageData.data[y * 4 * imageData.width + (x * 4 + 3)],
        0,
        255,
        0,
        1
      );
      const pixel = {
        r,
        g,
        b,
        alpha,
      };

      callback(pixel, x, y);
    }
  }
}

function brightnessCalc(red, green, blue) {
  return (
    Math.sqrt(red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114) /
    100
  );
}

function save(canvas, link) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = link;
  a.href = canvas.toDataURL("image/png");
  a.click();
  document.body.removeChild(a);
}

function loop2D(canvas, cellSize = 1, callback) {
  for (let y = 0; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
      callback(x, y);
    }
  }
}

function brightnessCalc(red, green, blue) {
  return (
    (red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114) /
    (100 * 100)
  );
}
