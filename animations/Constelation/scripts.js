const random_rgb = () => {
  let offset = 160;
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

class Configs {
  static colors = random_color(5);
}

class Particle {
  constructor(x, y, radius, color) {
    this.pos = {
      x: x,
      y: y,
    };

    this.previous = {
      x: x,
      y: y,
    };

    this.blur = 20;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    Canvas.ctx.beginPath();

    Canvas.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);

    Canvas.ctx.shadowColor = this.color;
    Canvas.ctx.shadowBlur = this.blur;
    Canvas.ctx.fillStyle = this.color;
    Canvas.ctx.fill();
  }

  update() {
    this.blur += .01;
  }
}

class Canvas {
  static ctx;
  static width;
  static height;

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

    this.animationRequest;
    this.i = 0;
    this.arcs = [];
    this.trace = [];

    Canvas.ctx.translate(Canvas.width / 2, Canvas.height / 2);
  }

  animation() {
    Canvas.ctx.clearRect(
      -Canvas.width / 2,
      -Canvas.height / 2,
      Canvas.width,
      Canvas.height
    );

    Canvas.ctx.beginPath();

    this.trace.forEach((shape) => {
      Canvas.ctx.lineTo(shape.pos.x, shape.pos.y);
      Canvas.ctx.lineTo(shape.pos.x, shape.pos.y);
    });

    Canvas.ctx.closePath();
    Canvas.ctx.strokeStyle = "white";
    Canvas.ctx.lineWidth = 0.3;
    Canvas.ctx.stroke();
    Canvas.ctx.closePath()

    this.arcs.forEach((shape) => {
      shape.update();
      shape.draw();
    });

    this.animationRequest = requestAnimationFrame(this.animation.bind(this));
  }

  init() {
    for (let i = 0; i < 80; i++) {
      let color = Configs.colors[this.i];

      this.arcs.push(
        new Particle(
          ((Math.random() * Canvas.width) / 2) *
            (Math.round(Math.random()) ? 1 : -1),
          ((Math.random() * Canvas.height) / 2) *
            (Math.round(Math.random()) ? 1 : -1),
          Math.random() * 9 + 1,
          `rgba(${color.r},${color.g},${color.b}, 1)`
        )
      );

      this.i == Configs.colors.length - 1 ? (this.i = 0) : this.i++;
    }

    this.arcs.forEach((shape) => {
      if (Math.random() > 0.9) {

        this.trace.push(shape)
      };
    });
  }

  events() {
    document.body.onmousedown = function () {
      Configs.direction *= -1;
    };
  }
}

class Point
{
    constructor(x, y)
    {
        this.x = x;
            this.y = y;
    }
}
 
function onSegment(p, q, r)
{
    if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
        q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
    return true;
   
    return false;
}
 
// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orientationOfLine(p, q, r)
{
 
    let val = (q.y - p.y) * (r.x - q.x) -
            (q.x - p.x) * (r.y - q.y);
   
    if (val == 0) return 0; // collinear
   
    return (val > 0)? 1: 2; // clock or counterclock wise
}
 
// The main function that returns true if line segment 'p1q1'
// and 'p2q2' intersect.
function doIntersect(p1, q1, p2, q2)
{
 
    // Find the four orientations needed for general and
    // special cases
    let o1 = orientationOfLine(p1, q1, p2);
    let o2 = orientationOfLine(p1, q1, q2);
    let o3 = orientationOfLine(p2, q2, p1);
    let o4 = orientationOfLine(p2, q2, q1);
   
    // General case
    if (o1 != o2 && o3 != o4)
        return true;
   
    // Special Cases
    // p1, q1 and p2 are collinear and p2 lies on segment p1q1
    if (o1 == 0 && onSegment(p1, p2, q1)) return true;
   
    // p1, q1 and q2 are collinear and q2 lies on segment p1q1
    if (o2 == 0 && onSegment(p1, q2, q1)) return true;
   
    // p2, q2 and p1 are collinear and p1 lies on segment p2q2
    if (o3 == 0 && onSegment(p2, p1, q2)) return true;
   
    // p2, q2 and q1 are collinear and q1 lies on segment p2q2
    if (o4 == 0 && onSegment(p2, q1, q2)) return true;
   
    return false; // Doesn't fall in any of the above cases
}
 
// Driver code
let p1 = new Point(1, 1);
let q1 = new Point(10, 1);
let p2 = new Point(1, 2);
let q2 = new Point(10, 2);
 
if(doIntersect(p1, q1, p2, q2))
    document.write("Yes<br>");
else
    document.write("No<br>");

window.onload = function () {
  let canvas = new Canvas();
  canvas.init();
  canvas.animation();
  //   canvas.events();
};
