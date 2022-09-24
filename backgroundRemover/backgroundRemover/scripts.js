const image = new Image();

function draw() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    image.width,
    image.height,
    {
      antialias: false,
    }
  );
  const slider = document.querySelector("#slider");
  let isLocked = false;

  ctx.drawImage(image, 0, 0, image.width, image.height);
  const pixelData = getImageData(ctx, canvas);
  aux();

  document.querySelector("form").addEventListener("submit", aux);

  function aux() {
    if (!isLocked) {
      isLocked = true;
      clear(ctx, canvas);

      const arr = ctx.createImageData(image.width, image.height);

      imageDataLoop(pixelData, (pixel, x, y) => {
        if (brightnessCalc(pixel.r, pixel.g, pixel.b) < slider.value) {
          arr.data[y * 4 * arr.width + x * 4] = pixel.r;
          arr.data[y * 4 * arr.width + (x * 4 + 1)] = pixel.g;
          arr.data[y * 4 * arr.width + (x * 4 + 2)] = pixel.b;
          arr.data[y * 4 * arr.width + (x * 4 + 3)] = map(
            pixel.alpha,
            0,
            1,
            0,
            255
          );
        }
      });
      ctx.putImageData(arr, 0, 0);

      canvas.style.background =
        "repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 30px 30px";
      isLocked = false;
      if (confirm("Download?")) {
        save(canvas, `${image.fileName.replace(/^.*[\\\/]/, "")}`);
      }
    }
  }
}

const file = document.getElementById("file");
file.addEventListener("input", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    image.src = reader.result;
    image.fileName = this.files[0].name;
    image.onload = () => {
      file.remove();
      draw();
    };
  });
  reader.readAsDataURL(this.files[0]);
});
