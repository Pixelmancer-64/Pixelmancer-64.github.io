/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let animationRequest;

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
    aux.push(usableColor(random_rgb()));
  }
  return aux;
}

function usableColor(color, alpha = 1) {
  return `rgba(${color.r},${color.g},${color.b}, ${alpha})`;
}

const colors = random_color(9);

window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  if (window.innerWidth <= window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
  } else {
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;
  }
  ctx.translate(canvas.width/2, canvas.height * .8)

  slider();
};

// árvore merda
// const t = [
//     {a: .195,  b: -.488, c: .344,   d: .443,  e: .4431, f: .2452, p: .2},
//     {a: .462,  b: .414,  c: -.2520, d: .361,  e: .2511, f: .5692, p: .2},
//     {a: -.637, b: 0,     c: 0,      d: .5010, e: .8562, f: .2512, p: .2},
//     {a: -.035, b: .07,   c: -.469,  d: .022,  e: .4884, f: .5069, p: .2},
//     {a: -.058, b: -.07,  c: .453,   d: -.111, e: .5976, f: .0969, p: .2}
// ]


// árvore foda
const t = [
  { r: 0.05, s: 0.6,  theta: 0,      phi: 0,      e: 0, f: 0,   p: .16 },
  { r: 0.05, s: -0.5, theta: 0,      phi: 0,      e: 0, f: 1,   p: .16 },
  { r: 0.6,  s: 0.5,  theta: 0.698,  phi: 0.698,  e: 0, f: 0.6, p: .16 },
  { r: 0.5,  s: 0.45, theta: 0.349,  phi: 0.3492, e: 0, f: 1.1, p: .16 },
  { r: 0.5,  s: 0.55, theta: -0.524, phi: -0.524, e: 0, f: 1,   p: .16 },
  { r: 0.55, s: 0.4,  theta: -0.698, phi: -0.698, e: 0, f: 0.7, p: .16 },
];
  // ctx.translate(canvas.width/2, canvas.height * .8)
    // let px = Math.floor(this.map(x, -1, 1, -this.width * .6, this.width * .6));
    // let py = Math.floor(this.map(y, 0, 1, this.height * offset, -this.height/4));

class Particle {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.point = {
      x: 0,
      y: 0,
    };
    this.histogram = [];
    this.sort = [];
  }

  draw(color, x, y) {
    let offset = .2
    let px = Math.floor(this.map(x, -1, 1, -this.width * .6, this.width * .6));
    let py = Math.floor(this.map(y, 0, 1, this.height * offset, -this.height/4));
    // let px = Math.floor(this.map(x, 0, 1, this.width, 0));
    // let py = Math.floor(this.map(y, 0, 1, this.height, -200));
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.fillRect(px, py, 1, 1);
    this.ctx.closePath();
  }

  map(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  }

  equations(r) {
    let nextX;
    let nextY;

    for (let i = 0; i < t.length; i++) {
      let possibility = 0;
      for (let j = 0; j <= i; j++) {
        possibility += t[j].p;
      }

    //   if(r < possibility) {
    //     nextX = t[i].a * this.point.x + t[i].b * this.point.y + t[i].e;
    //     nextY = t[i].c * this.point.x + t[i].d * this.point.y + t[i].f;

    //   this.point.x = nextX
    //   this.point.y = nextY

    //   this.histogram.push({x: nextX, y: nextY})
    //     break;
    //   }

      if (r < possibility) {
        nextX =
          t[i].r * Math.cos(t[i].theta) * this.point.x -
          t[i].s * Math.sin(t[i].phi)   * this.point.y +
          t[i].e;
          
        nextY =
          t[i].r * Math.sin(t[i].theta) * this.point.x +
          t[i].s * Math.cos(t[i].phi)   * this.point.y +
          t[i].f;

        this.point.x = nextX;
        this.point.y = nextY;

        this.histogram.push({ x: nextX, y: nextY });

        break;
      }
    }
  }

  animate() {
    for (let i = 0; i < 1500000; i++) this.equations(Math.random());
    this.histogram.forEach((data) => {
      let color = "rgba(31 , 31, 31, 1)";
      this.draw(color, data.x, data.y);
    });
    
    // ctx.translate(-canvas.width/2, -canvas.height * .8)

    // const pixelData = ctx.getImageData(0,0, canvas.width, canvas.height)

    // ctx.clearRect(0,0, canvas.width, canvas.height)

    // for (let y = 0; y < canvas.height; y++){
    //     for (let x = 0; x < canvas.width; x++){
    //         const red = pixelData.data[(y * 4 * pixelData.width) + (x*4)];
    //         const green = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 1)];
    //         const blue = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 2)];
    //         let aux = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 3)];
    //         const alpha = this.map(aux, 0, 255, 0, 1)
    //         const pixel = {
    //             pixelBrightness: alpha,
    //             pixelColor: 'rgba('+red+','+ green +','+ blue+','+ this.pixelBrightness+')'
    //         };

    //         let color;
    //         if(pixel.pixelBrightness > .9)      color = colors[8]; // tips
    //         else if(pixel.pixelBrightness > .8) color = colors[7]; // tips
    //         else if(pixel.pixelBrightness > .6) color = colors[6]; // bit of extremes
    //         else if(pixel.pixelBrightness > .5) color = colors[5]; // not much
    //         else if(pixel.pixelBrightness > .4) color = colors[4]; // not much
    //         else if(pixel.pixelBrightness > .3) color = colors[3]; // not much
    //         else if(pixel.pixelBrightness > .2) color = colors[2]; // not much
    //         else if(pixel.pixelBrightness > .1) color = colors[1]; // not much
    //         else if(pixel.pixelBrightness > 0)  color = colors[0]; // majority middle
    //         else color = false;

    //         if(color != false){
    //             this.ctx.fillStyle = color;
    //             this.ctx.beginPath();
    //             this.ctx.fillRect(x, y, 1, 1)
    //             this.ctx.closePath();
    //         }
    //     }
    // }
  }
}

function slider() {
  newParticle = new Particle(ctx, canvas.width, canvas.height);
  newParticle.animate();
}
