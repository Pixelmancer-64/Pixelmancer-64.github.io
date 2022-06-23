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

  const n = Math.floor(random(9, 999));
  let angleIncrease = (Math.PI * 2) / n;
  const r = 1;
  let radius = canvas.width / 2 - (r + 50);
  let origin = canvas.width / 2;
  let color = {
    r: 255,
    g: 255,
    b: 255,
    alpha: 1,
  };

  function draw() {
    requestAnimationFrame(draw);
    radius--;
    angleIncrease += 0.0009;
    color.r -= random(0, 0.1);
    color.g -= random(0, 1);
    color.b -= random(0, 0.01);

    for (let i = 0; i < Math.PI * 2; i += angleIncrease) {
      ctx.strokeStyle = "red";
      point(
        ctx,
        origin + radius * Math.sin(i),
        origin + radius * Math.cos(i),
        r,
        objColorToString(color)
      );
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
