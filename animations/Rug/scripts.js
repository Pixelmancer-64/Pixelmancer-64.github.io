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
  
  mouse.x = canvas.width
  mouse.x = canvas.height

  const n = Math.floor(random(9, 99));
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
    radius--
    for (let i = 0; i < Math.PI * 2; i += angleIncrease) {
      point(
        ctx,
        origin + radius * Math.sin(i),
        origin + radius * Math.atan2(mouse.x, mouse.y),
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
