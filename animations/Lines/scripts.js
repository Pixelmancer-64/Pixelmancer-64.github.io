const mouse = {
  x: 0,
  y: 0,
  pressed: false,
};

let radius = 500;

function init() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    window.innerWidth,
    window.innerHeight,
    {
      antialias: false,
    }
  );

  const n = 999;
  const angleIncrease = (Math.PI * 2) / n;

  function draw() {
    requestAnimationFrame(draw);
    if (mouse.pressed) radius++;
    else radius--;
    // clear(ctx, canvas);
    for (let i = 0; i < Math.PI * 2; i += angleIncrease) {
      ctx.strokeStyle = "red";
      point(
        ctx,
        canvas.width / 2 + radius * Math.cos(i),
        canvas.height / 2 + (radius) * Math.tan(i),
        1,
        "black"
      );
      // ctx.lineTo(mouse.x, mouse.y);
      // ctx.stroke();
    }

  }

  draw();
}

document.addEventListener("DOMContentLoaded", init, false);

document.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

document.addEventListener("mousedown", () => (mouse.pressed = true));
document.addEventListener("mouseup", () => (mouse.pressed = false));
