const random_rgb = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return {
    r: r,
    g: g,
    b: b
  }
};

function random_color(num) {
  let aux = []
  for (let i = 0; i < num; i++) {
    aux.push(random_rgb())
  }
  return aux;
};

class Configs {
  static current;
  static list = [];
  static colors = random_color(5);
  static range = Math.ceil(Math.random() * 7) + 2;
  static alpha = Math.ceil(Math.random() * 10);

  static radius = 4;
}

class Particle {

  constructor() {

  }

}

class Canvas {
  static ctx;
  static width;
  static height;
  static colors = random_color(7);
  static mouse = {
    x: null,
    y: null
  }

  constructor() {
    let canvas = document.getElementById('canvas');
    Canvas.ctx = canvas.getContext('2d');

    if (window.innerWidth <= window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth;
    } else {
      canvas.width = window.innerHeight;
      canvas.height = window.innerHeight;
    }

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    Canvas.width = canvas.width;
    Canvas.height = canvas.height;

  }

  startEvents() {
    window.addEventListener('mousemove', function (event) {
      Canvas.mouse.x = event.x;
      Canvas.mouse.y = event.y;
    });
  }

}

window.onload = function () {
  let canvas = new Canvas();
  canvas.startEvents();

}