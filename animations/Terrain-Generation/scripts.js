let cols, rows;
let scl = 40;
let w = window.innerWidth;
let h = window.innerHeight;
let bg;
let flying = 0;

let terrain = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {

  flying -= 0.03;
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }


  background(0);
  // fill('#F8FB9F');
  // noStroke();
  // ellipse(0,-h/3,300,300);
  translate(0, 50);
  rotateX(PI / 2.5);
  noFill()
  stroke(202,36,207);
  translate(-w / 2, -h / 2);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }

  translate(w/2, h/2, h/3);
  push();
  noStroke(255,255,207);
  fill(255,255,207)
  // rotateZ(frameCount * 0.01);
  // rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.004);
  sphere(w/10);
  pop();
}