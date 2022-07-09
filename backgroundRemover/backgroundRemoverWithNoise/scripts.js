const image = new Image();

const scale = 50;
const frequency = 3;

function draw() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    image.width,
    image.height,
    {
      antialias: false,
    }
  );

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const pixelData = getImageData(ctx, canvas);
  clear(ctx, canvas);
  imageDataLoop(pixelData, (pixel, x, y) => {
    if (
      brightnessCalc(pixel.r, pixel.g, pixel.b) <
      noise.simplex2((x / scale) * frequency, (y / scale) * frequency)
    ) {
      rect(ctx, x, y, 1, 1, objColorToString(pixel), "FILL");
      // rect(ctx, x, y, 1, 1, "black", "FILL");
    }
  });
  if (confirm("Download?")) {
    save(canvas, `${image.src.replace(/^.*[\\\/]/, "")}`);
  }
}

const file = document.getElementById("file");
file.addEventListener("input", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    image.src = reader.result;
    image.onload = (e) => {
      file.remove();
      draw();
    };
  });
  reader.readAsDataURL(this.files[0]);
});
