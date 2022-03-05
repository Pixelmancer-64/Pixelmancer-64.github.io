const random_rgb = () => {
  let offset = 50;
  let mult = 255 - offset;
  let r = Math.floor(Math.random() * mult + offset);
  let g = Math.floor(Math.random() * mult + offset);
  let b = Math.floor(Math.random() * mult + offset);
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

function usableColor(color, alpha = 1) {
  return `rgba(${color.r},${color.g},${color.b}, ${alpha})`;
}

class Configs {
  static colors = random_color(9);
  static cellSize = 15;
  static lineWidth = 1;
  static radius = 6;
}

class Particle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = Math.ceil(Math.random()*r) + 2;
    this.dy = (Math.round(Math.random()) ? 1 : -1);
    this.dx = (Math.round(Math.random()) ? 1 : -1);

  }

  draw() {
    Canvas.ctx.beginPath();
    Canvas.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    Canvas.ctx.fill();
  }

  update(){
    if(this.y + this.r > Canvas.height){
      this.y = 0 + this.r
    } else if(this.y - this.r < 0){
      this.y = Canvas.height - this.r
    }

    if(this.x - this.r > Canvas.width){
      this.x = 0 + this.r
    } else if(this.x + this.r < 0){
      this.x = Canvas.width - this.r
    }

   //move 
   this.y += 1 * this.dy;
   this.x += 1 * this.dx;

  }
}

class Canvas {
  static ctx;
  static width;
  static height;
  static cols;
  static rows;
  static gradient;
  static grid = [];
  static all = [];
  static walkers = [];

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

    Canvas.width = canvas.width;
    Canvas.height = canvas.height;

    Canvas.cols = Math.floor(Canvas.width / Configs.cellSize);
    Canvas.rows = Math.floor(Canvas.height / Configs.cellSize);

    // for (let i = 0; i < Canvas.rows; i++) {
    //   Canvas.grid[i] = [];
    //   for (let j = 0; j < Canvas.cols; j++) {
    //     Canvas.grid[i][j] = 0;
    //   }
    // }

    this.animationRequest;

    this.gradient();

    Canvas.ctx.strokeStyle = Canvas.gradient;
    Canvas.ctx.fillStyle = Canvas.gradient;
    Canvas.ctx.lineWidth = Configs.lineWidth;


    for (let i = 0; i < 100; i++) {
      Canvas.all.push(new Particle(
        Canvas.width * Math.random(),
        Canvas.height,
        Configs.radius
      ));

    }

    for (let i = 0; i < 100; i++) {
      Canvas.all.push(new Particle(
        Canvas.width,
        Canvas.height * Math.random(),
        Configs.radius
      ));

    }

    for (let i = 0; i < 100; i++) {
      Canvas.all.push(new Particle(
        Canvas.width * Math.random(),
        0,
        Configs.radius
      ));

    }

    for (let i = 0; i < 100; i++) {
      Canvas.all.push(new Particle(
        0,
        Canvas.height * Math.random(),
        Configs.radius
      ));

    }
    for (let i = 0; i < 4000; i++) {
      Canvas.walkers.push(
        new Particle(
          Math.random() * Canvas.width,
          Math.random() * Canvas.height,
          Configs.radius
        )
      );
    }
  }

  animation() {
    this.animationRequest = requestAnimationFrame(this.animation.bind(this));

    Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    Canvas.walkers.forEach(function (w, index) {
        for (let i = 0; i < Canvas.all.length; i++) {
          let dx = Canvas.all[i].x - w.x;
          let dy = Canvas.all[i].y - w.y;
          let distance = dx * dx + dy * dy;
          if (distance < (Canvas.all[i].r * Canvas.all[i].r) * 2 + (w.r * w.r) * 2) {

            Canvas.all.push(w);
            Canvas.walkers.splice(index, 1);
            break;
        }

      }
        
      w.update()

    });

    Canvas.all.forEach((e) => e.draw());
    Canvas.walkers.forEach((e) => e.draw());
    // cancelAnimationFrame(this.animationRequest)
  }

  gradient() {
    Canvas.gradient = Canvas.ctx.createLinearGradient(
      0,
      0,
      Canvas.width,
      Canvas.height
    );

    Canvas.gradient.addColorStop(0, usableColor(Configs.colors[0]));
    // Canvas.gradient.addColorStop("0.2", usableColor(Configs.colors[1]));
    Canvas.gradient.addColorStop(.3, usableColor(Configs.colors[2]));
    // Canvas.gradient.addColorStop("0.4", usableColor(Configs.colors[3]));
    // Canvas.gradient.addColorStop(.5, usableColor(Configs.colors[4]));
    // Canvas.gradient.addColorStop("0.6", usableColor(Configs.colors[5]));
    Canvas.gradient.addColorStop(.7, usableColor(Configs.colors[6]));
    // Canvas.gradient.addColorStop("0.8", usableColor(Configs.colors[7]));
    Canvas.gradient.addColorStop(1, usableColor(Configs.colors[8]));
  }
}

window.onload = function () {
  let canvas = new Canvas();
  canvas.animation();
};
