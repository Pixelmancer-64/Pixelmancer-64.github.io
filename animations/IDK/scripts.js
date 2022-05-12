class MyCanvas extends Canvas {
  constructor(...props) {
    super(...props);
    this.particles = [];
  }

  init() {
    easyLoop(1, (i) => {
      // const pos = {
      //   x: Math.floor(random(MyCanvas.width)),
      //   y: Math.floor(random(MyCanvas.height)),
      // };

            const pos = {
        x: Canvas.middle.x,
        y: Canvas.middle.y,
      };


      this.particles.push(
        new Ghost(
          this.cellSize,
          this.cellSize,
          usableColor(random_rgb(50), 1),
          pos,
          {x: random(1, true), y: random(1, true)}
        )
      );

    });

    this.animation();
  }

  animationCallback() {
    // MyCanvas.clear();

    this.particles.forEach((e) => {
      e.move();
      e.fill();
    });
  }
}

class Ghost extends Square {
  move() {
    this.bounce();

    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }


}

window.onload = function () {
  let canvas = new MyCanvas(3, false, 300);
  // canvas.startEvents();
  canvas.init();
};
