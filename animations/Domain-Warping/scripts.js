class myCanvas extends Canvas {
  constructor(...args) {
    super(...args);

    this.scale = 200;
    this.octaves = 8;
    this.lacunarity = 1.2;
    this.gain = 1.1;

    this.colorOffset = {
      r: Random.randomInt(255),
      g: Random.randomInt(255),
      b: Random.randomInt(255),
    };
  }

  drawCallback() {
    for (let i = 0; i < Canvas.rows; i++) {
      for (let j = 0; j < Canvas.cols; j++) {
        let color = this.pattern(j, i);

        new Square(
          this.cellSize,
          this.cellSize,
          `rgba( ${color.r}, ${color.g}, ${color.b}, ${1})`,
          {
            x: j * this.cellSize,
            y: i * this.cellSize,
          }
        ).fill();
      }
    }
  }

  fbm(x, y) {
    let t = 0;
    let amplitude = 1;
    let frequency = 1;

    for (let i = 0; i < this.octaves; i++) {
      t = t + noise.perlin2(
          (x / this.scale) * frequency,
          (y / this.scale) * frequency
        ) * amplitude;
      frequency *= this.lacunarity;
      amplitude *= this.gain;
    }

    return t;
  }

  mag(x, y) {
    return Math.hypot(x, y);
  }

  pattern(x, y) {
    const qx = this.fbm(x, y);
    const qy = this.fbm(x + 5.2, y + 1.3);
    const q = this.fbm(qx, qy);

    const rx = this.fbm(x + 4 * q + 1.7, y + 4 * q + 9.2);
    const ry = this.fbm(x + 4 * q + 8.3, y + 4 * q + 2.8);
    const r = this.fbm(rx, ry);

    const result = this.fbm(x + 4 * r, y * 4 * r);

    return {
      r: this.colorOffset.r * result * this.mag(qx, qy),
      g: 0,
      b: this.colorOffset.b * result * this.mag(rx, ry),
    };
  }
}

window.onload = () => {
  const canvas = new myCanvas(document.querySelector("canvas"), 1, false, 1);
  canvas.draw();
};
