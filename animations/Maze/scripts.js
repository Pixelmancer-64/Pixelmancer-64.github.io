const random_rgb = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return {
    r: r,
    g: g,
    b: b,
  };
};

function random_color(num) {
  let aux = [];
  for (let i = 0; i < num; i++) {
    aux.push(random_rgb());
  }
  return aux;
}

class Configs {
  static colors = random_color(1);
  static lineWidth = 5;
  static cellSize = 50;
  static h1 = document.createElement("h1");
  static div = document.createElement("div");
  static mouse = {
    x: undefined,
    y: undefined,
  };
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.closed = [
      {
        x: 0,
        y: -1,
        state: true,
      },
      {
        x: 1,
        y: 0,
        state: true,
      },
      {
        x: 0,
        y: 1,
        state: true,
      },
      {
        x: -1,
        y: 0,
        state: true,
      },
    ];
    this.valid = true;
  }

  draw() {
    Canvas.ctx.beginPath();

    if (this.closed[0].state) this.top();
    if (this.closed[1].state) this.rigth();
    if (this.closed[2].state) this.bottom();
    if (this.closed[3].state) this.left();

    !this.valid ? this.visitedDraw() : this.normalDraw();
  }

  visitedDraw() {
    Canvas.ctx.strokeStyle = Canvas.gradient;
    Canvas.ctx.stroke();

    // Canvas.ctx.fillStyle = 'red'
    // Canvas.ctx.fillRect(this.x * Configs.cellSize + (Configs.cellSize / 4), this.y * Configs.cellSize + (Configs.cellSize / 4), Configs.cellSize / 2, Configs.cellSize / 2)
  }

  winner() {
    Canvas.ctx.fillStyle = "red";
    Canvas.ctx.fillRect(
      this.x * Configs.cellSize + Configs.cellSize / 4,
      this.y * Configs.cellSize + Configs.cellSize / 4,
      Configs.cellSize / 2,
      Configs.cellSize / 2
    );
  }

  normalDraw() {
    Canvas.ctx.lineWidth = Configs.lineWidth;
    Canvas.ctx.strokeStyle = Canvas.gradient;
    Canvas.ctx.stroke();
  }

  top() {
    Canvas.ctx.moveTo(this.x * Configs.cellSize, this.y * Configs.cellSize);
    Canvas.ctx.lineTo(
      this.x * Configs.cellSize + Configs.cellSize,
      this.y * Configs.cellSize
    );
  }

  rigth() {
    Canvas.ctx.moveTo(
      this.x * Configs.cellSize + Configs.cellSize,
      this.y * Configs.cellSize
    );
    Canvas.ctx.lineTo(
      this.x * Configs.cellSize + Configs.cellSize,
      this.y * Configs.cellSize + Configs.cellSize
    );
  }

  bottom() {
    Canvas.ctx.moveTo(
      this.x * Configs.cellSize + Configs.cellSize,
      this.y * Configs.cellSize + Configs.cellSize
    );
    Canvas.ctx.lineTo(
      this.x * Configs.cellSize,
      this.y * Configs.cellSize + Configs.cellSize
    );
  }

  left() {
    Canvas.ctx.moveTo(
      this.x * Configs.cellSize,
      this.y * Configs.cellSize + Configs.cellSize
    );
    Canvas.ctx.lineTo(this.x * Configs.cellSize, this.y * Configs.cellSize);
  }

  next() {
    let options = [];

    Canvas.moves.forEach((option) => {
      if (this.validGrid(this.x + option.x, this.y + option.y)) {
        options.push(option);
      }
    });

    if (options.length > 0) {
      let chosenOne = options[Math.floor(Math.random() * options.length)];
      this.closed.forEach((e, index) => {
        if (e.x == chosenOne.x && e.y == chosenOne.y) {
          e.state = false;
          let aux;
          index == 0 || index == 1 ? (aux = index + 2) : (aux = index - 2);
          Canvas.grid[this.y + chosenOne.y][this.x + chosenOne.x].closed[
            aux
          ].state = false;
        }
      });

      return chosenOne;
    } else undefined;
  }

  validGrid(x, y) {
    if (x < 0 || x > Canvas.cols - 1 || y < 0 || y > Canvas.rows - 1)
      return false;
    else return Canvas.grid[y][x].valid;
  }
}

class Canvas {
  static ctx;
  static width;
  static height;
  static grid = [];
  static moves = [
    {
      x: 1,
      y: 0,
    },
    {
      x: 0,
      y: 1,
    },
    {
      x: 0,
      y: -1,
    },
    {
      x: -1,
      y: 0,
    },
  ];
  static cols;
  static rows;
  static stack = [];
  static gradient;
  static imageMap = [];

  constructor() {
    let canvas = document.getElementById("canvas");
    Canvas.ctx = canvas.getContext("2d");

    // if (window.innerWidth <= window.innerHeight) {
    //   canvas.width = window.innerWidth;
    //   canvas.height = window.innerWidth;
    // } else {
    //   canvas.width = window.innerHeight;
    //   canvas.height = window.innerHeight;
    // }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // canvas.width = 500;
    // canvas.height = 500;

    Canvas.width = canvas.width;
    Canvas.height = canvas.height;

    Canvas.cols = Math.floor(Canvas.width / Configs.cellSize);
    Canvas.rows = Math.floor(Canvas.height / Configs.cellSize);

    for (let i = 0; i < Canvas.rows; i++) {
      Canvas.grid[i] = [];

      for (let j = 0; j < Canvas.cols; j++) {
        Canvas.grid[i][j] = new Particle(j, i);
      }
    }

    this.animationRequest;

    this.current =
      Canvas.grid[Math.floor(Math.random() * Canvas.rows)][
        Math.floor(Math.random() * Canvas.cols)
      ];
    this.gradient();
  }

  animation() {
    this.animationRequest = requestAnimationFrame(this.animation.bind(this));

    Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    this.current.valid = false;

    const next = this.current.next();

    if (next) {
      Canvas.stack.push(this.current);

      this.current =
        Canvas.grid[this.current.y + next.y][this.current.x + next.x];
    } else if (Canvas.stack.length) this.current = Canvas.stack.pop();
    else {
      cancelAnimationFrame(this.animationRequest);
      Canvas.grid.forEach((e) => e.forEach((cell) => cell.draw()));
      Canvas.grid[Math.floor(Math.random() * Canvas.rows)][
        Math.floor(Math.random() * Canvas.cols)
      ].winner();

      const pixelData = Canvas.ctx.getImageData(
        0,
        0,
        Canvas.width,
        Canvas.height
      );

      for (let y = 0; y < Canvas.height; y++) {
        let row = [];
        for (let x = 0; x < Canvas.width; x++) {
          const red = pixelData.data[y * 4 * pixelData.width + x * 4];
          const green = pixelData.data[y * 4 * pixelData.width + (x * 4 + 1)];
          const blue = pixelData.data[y * 4 * pixelData.width + (x * 4 + 2)];
          const pixel =
            "rgba(" + red + "," + green + "," + blue + "," + "1" + ")";

          row.push(pixel);
        }
        Canvas.imageMap.push(row);
      }

      this.events();
      document.querySelector("#aviso").remove();
    }

    Canvas.grid.forEach((e) => e.forEach((cell) => cell.draw()));
  }

  gradient() {
    Canvas.gradient = Canvas.ctx.createLinearGradient(
      0,
      0,
      Canvas.width,
      Canvas.height
    );
    Canvas.gradient.addColorStop("0.1", "#ff5c33");
    Canvas.gradient.addColorStop("0.2", "#ff66b3");
    Canvas.gradient.addColorStop("0.4", "#ccf");
    Canvas.gradient.addColorStop("0.6", "#b3ffff");
    Canvas.gradient.addColorStop("0.8", "#80ff80");
    Canvas.gradient.addColorStop("0.9", "#ffff33");
  }

  events() {
    document.addEventListener("mousemove", mouseMove);

    function mouseMove(e) {
      let aux = Canvas.imageMap[Math.floor(e.y)][Math.floor(e.x)];
      if (!Configs.mouse.x) {
        Configs.mouse.x = e.x;
        Configs.mouse.y = e.y;
      } else {
        if (
          Math.abs(e.x - Configs.mouse.x) > 10 ||
          Math.abs(e.y - Configs.mouse.y) > 10
        ) {
          Configs.h1.textContent = "Perdeu!!";
          Configs.div.appendChild(Configs.h1);
          document.querySelector("body").appendChild(Configs.div);
          cancel();
        } else {
          Configs.mouse.x = e.x;
          Configs.mouse.y = e.y;
        }
      }

      if (aux == "rgba(255,0,0,1)") {
        Configs.h1.textContent = "Parabéns!";
        Configs.div.appendChild(Configs.h1);
        document.querySelector("body").appendChild(Configs.div);
        cancel();
      } else if (aux != "rgba(0,0,0,1)") {
        Configs.h1.textContent = "Perdeu!";
        Configs.div.appendChild(Configs.h1);
        document.querySelector("body").appendChild(Configs.div);
        cancel();
      }
    }

    document.addEventListener("mouseout", mouseOut);

    function mouseOut(e) {
      Configs.h1.textContent = "Perdeu!";
      Configs.div.appendChild(Configs.h1);
      document.querySelector("body").appendChild(Configs.div);
      cancel();
    }

    function cancel() {
      document.removeEventListener("mouseout", mouseOut);
      document.removeEventListener("mousemove", mouseMove);
    }
  }

  end() {
    document.removeEventListener();
  }
}

window.onload = function () {
  let canvas = new Canvas();
  canvas.animation();

  Configs.div.id = "aviso";
  Configs.h1.textContent = "Carregando labirinto...";
  Configs.div.appendChild(Configs.h1);
  document.querySelector("body").appendChild(Configs.div);
};
