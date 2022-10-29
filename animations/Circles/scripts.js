"use strict";

import { start, clear } from "../functionalModules.js";

function init() {
  const [canvas, ctx] = start(document.querySelector("canvas"), window.innerWidth, window.innerHeight, {
    antialias: false,
  });

  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 1;

  canvas.width > canvas.height
    ? ctx.translate(canvas.height / 2, canvas.height / 2)
    : ctx.translate(canvas.width / 2, canvas.width / 2);

  (function draw_circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    if (r > 16) {
      // draw_circle(x + r / 2, y, r / 2);
      // draw_circle(x - r / 2, y, r / 2);

      draw_circle(x + r / 2, y, r / 2);
      draw_circle(x - r / 2, y, r / 2);
      draw_circle(x, y + r / 2, r / 2);
      draw_circle(x, y - r / 2, r / 2);
    }
  })(
    0,
    0,
    (canvas.width > canvas.height ? canvas.height / 2 : canvas.width / 2) -
      ctx.lineWidth * 2
  );
}

window.onload = init;
