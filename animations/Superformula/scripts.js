class Configs {
  static colors = random_color(9);
  static gradient = random_color(9);
  static cellSize = 1;
  static lineWidth = 1;
  static ca = 0.285;
  static cb = 0.01;
}

class Canvas {
  static ctx;
  static width;
  static height;
  static cols;
  static rows;
  static gradient;
  static grid = [];
  static mouse = {
    x: null,
    y: null,
    last: {
      x: null,
      y: null,
    },
    pressed: false,
  };

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

    this.theta = 0;
    this.animationRequest;
    this.inc = random(9);

    Canvas.ctx.translate(Canvas.width / 2, Canvas.height / 2);
    Canvas.ctx.fillStyle = usableColor(random_rgb(), 0.5);

    const curated = [
      [
        100, 100, 57.2276429843148, 34.92295123886227, 41.88415914352216,
        42.3364410946335,
      ],
      [100, 100, 100, 8.81502739410829, 7.962952345454232, 8.575624125336576],
      [
        500, 500, 90.04628352624353, 21.924862420547797, 7.612747589380719,
        68.79038717071145,
      ],
      [
        500, 500, 77.67479140668662, 87.6741279461368, 82.44987225053784,
        92.27436028720005,
      ],
      [
        639, 639, 82.37929939385063, 66.22650611127243, 34.30080794387786,
        63.18135673429918,
      ],
      [
        526.5, 526.5, 94.60840300071386, 30.37626273701848, 16.8858478149689,
        47.35171149698557,
      ],
      [
        526.5, 526.5, 96.6500267902259, 75.79664945971399, 92.29472694091397,
        41.43267469894328,
      ],
      [
        526.5, 526.5, 526.5, 36.33030593360383, 14.606107568259619,
        59.06100194913989,
      ],
      [
        (639,
        639,
        639,
        77.14313327859922,
        60.00657345410807,
        81.23588605670979),
      ],
      [639, 639, 639, 11.41904956477563, 34.27657438030239, 5.142029792381209],
    ];

    [this.a, this.b, this.m, this.n1, this.n2, this.n3] =
      curated[Math.floor(Math.random() * curated.length)];
  }

  animation() {
    this.animationRequest = requestAnimationFrame(this.animation.bind(this));
    // Canvas.ctx.clearRect(
    //   -Canvas.width/2,
    //   -Canvas.height/2,
    //   Canvas.width,
    //   Canvas.height,
    // );
    for (let i = 0; i < 999; i++) {
      const rad = this.superFormula(
        this.theta,
        this.a,
        this.b,
        this.m,
        this.n1,
        this.n2,
        this.n3
      );
      Canvas.ctx.beginPath();
      Canvas.ctx.arc(
        rad * Math.cos(this.theta),
        rad * Math.sin(this.theta),
        1,
        0,
        Math.PI * 2
      );
      Canvas.ctx.fill();

      this.theta += this.inc;
    }
  }

  superFormula(theta, a, b, m, n1, n2, n3) {
    return Math.pow(
      Math.pow(Math.abs(Math.cos((m * theta) / 4.0) / a), n2) +
        Math.pow(Math.abs(Math.sin((m * theta) / 4.0) / b), n3),
      -1.0 / n1
    );
  }

  gradient() {
    Canvas.gradient = Canvas.ctx.createRadialGradient(0, 0, 100, 0, 0, 1000);

    Canvas.gradient.addColorStop(0, usableColor(Configs.colors[0]));
    // Canvas.gradient.addColorStop("0.2", usableColor(Configs.colors[1]));
    Canvas.gradient.addColorStop(0.3, usableColor(Configs.colors[2]));
    // Canvas.gradient.addColorStop("0.4", usableColor(Configs.colors[3]));
    // Canvas.gradient.addColorStop(.5, usableColor(Configs.colors[4]));
    // Canvas.gradient.addColorStop("0.6", usableColor(Configs.colors[5]));
    Canvas.gradient.addColorStop(0.7, usableColor(Configs.colors[6]));
    // Canvas.gradient.addColorStop("0.8", usableColor(Configs.colors[7]));
    Canvas.gradient.addColorStop(1, usableColor(Configs.colors[8]));
  }

  startEvents() {
    window.addEventListener("mousemove", function (event) {
      Canvas.mouse.last.x = Canvas.mouse.x;
      Canvas.mouse.last.y = Canvas.mouse.y;
      Canvas.mouse.x = event.x;
      Canvas.mouse.y = event.y;
    });

    document.body.onmousedown = function () {
      Canvas.mouse.pressed = true;
      if (Canvas.mouse.x != null && document.querySelector("h1")) {
        document.querySelector("h1").remove();
      }
    };
    document.body.onmouseup = function () {
      Canvas.mouse.pressed = false;
    };

    document
      .getElementById("canvas")
      .addEventListener("touchstart", function (event) {
        Canvas.mouse.last.x = Canvas.mouse.x;
        Canvas.mouse.last.y = Canvas.mouse.y;
        Canvas.mouse.x = event.touches[0].clientX;
        Canvas.mouse.y = event.touches[0].clientY;
        Canvas.mouse.pressed = true;
      });

    document
      .getElementById("canvas")
      .addEventListener("touchend", function (event) {
        Canvas.mouse.pressed = false;
      });
  }
}

window.onload = function () {
  let canvas = new Canvas();
  // canvas.startEvents();
  canvas.animation();
};
