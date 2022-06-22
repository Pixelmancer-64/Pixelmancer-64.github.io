const mouse = {
  x: 0,
  y: 0,
  pressed: false,
};


function init() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    window.innerWidth,
    window.innerHeight,
    {
      antialias: false,
    }
  );

  const n = 99;
  let angleIncrease = (Math.PI * 2) / n;
  const r = 1;
  let radius = canvas.width/2 - (r + 50);
  let origin = canvas.width / 2

  function draw() {
    requestAnimationFrame(draw);
    if (mouse.pressed) {
      radius--
      angleIncrease += .001
      // origin++
    }
    else radius++;
    // clear(ctx, canvas);
    for (let i = 0; i < Math.PI * 2; i += angleIncrease) {
      ctx.strokeStyle = "red";
      point(
        ctx,
        origin + radius * Math.sin(i),
        origin + radius * Math.cos(i),
        r,
        "white"
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
