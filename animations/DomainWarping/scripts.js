class myCanvas extends Canvas {
  constructor(...args) {
    super(...args);
    const seed = Random.randomFloat(9999);
    noise.seed(seed);
    console.log(seed);

    this.scale = 60;
    this.octaves = 3;
    this.lacunarity = 2;
    this.gain = 0.5;
    this.offset = 80;
  }

  sinNoise(x, y){
    return Math.sin(x) * Math.sin(y)
  }

  drawCallback() {
    for (let i = 0; i < Canvas.rows; i++) {
      for (let j = 0; j < Canvas.cols; j++) {
        let v = ((this.pattern(j, i) + 1) * 128) / 255;

        const color = {
          r: map(v, 0, 1, 0, 25),
          g: map(v, 0, 1, 0, 205),
          b: map(v, 0, 1, 0, 255),

        }
        new Square(this.cellSize, this.cellSize, `rgba( ${color.r}, ${color.g}, ${color.b}, ${1})`, {
          x: j * this.cellSize,
          y: i * this.cellSize,
        }).fill();
      }
    }
  }

  fbm(x, y) {
    let total = 0;
    let amplitude = 1;
    let frequency = 1;

    for (let i = 0; i < this.octaves; i++) {
      total =
        total +
        noise.perlin2(
          (x / this.scale) * frequency,
          (y / this.scale) * frequency
        ) *
          amplitude;
      frequency *= this.lacunarity;
      amplitude *= this.gain;
    }

    return total;
  }

  pattern(x, y) {
    return this.fbm(
      x + this.offset * this.fbm(x, y),
      y + this.offset * this.fbm(x + 5.2, y + 1.3)
    );
  }
}

window.onload = () => {
  const canvas = new myCanvas(document.querySelector("canvas"), 1, false, 1);
  canvas.draw();
};
