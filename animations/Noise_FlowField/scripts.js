let inc = 0.1;
let scl = 10;
let cols, rows;
let zoff = 0;
let particlesArray = [];
let flowField;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	cols = floor(height/scl);
	rows = floor(width/scl);

	flowField = new Array(cols * rows);

	for(let i = 0; i < 1000; i++){
		particlesArray[i] = new Particle();
	}

	background(0);
}

class Particle{
	constructor(){
		this.pos = createVector(random(width), random(height));
		this.previousPos = this.pos.copy();
		this.vel = createVector(0,0);
		this.acc = createVector(0,0);
		this.terminalVel = 4;
	}

	update(){
		this.vel.add(this.acc);
		this.vel.limit(this.terminalVel)
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	applyForce(force){
		this.acc.add(force);
	}

	show(){
		stroke(202,36,207, 10);
		strokeWeight(1)
		line(this.pos.x, this.pos.y, this.previousPos.x, this.previousPos.y)
		// point(this.pos.x, this.pos.y);
		this.updatePrev();
	}

	updatePrev(){
		this.previousPos.x = this.pos.x;
		this.previousPos.y = this.pos.y;
	}

	edgeCollision(){
		if (this.pos.x > width) {
			this.pos.x = 0;
			this.updatePrev();
		}

		if (this.pos.x < 0) {
			this.pos.x = width;
			this.updatePrev();
		}

		if (this.pos.y > height) {
			this.pos.y = 0;
			this.updatePrev();
		}

		if (this.pos.y < 0) {
			this.pos.y = height;
			this.updatePrev();
		}
	}

	follow(flowField){
		let x = floor(this.pos.x / scl);
		let y = floor(this.pos.y / scl);
		let index = x + y * cols;
		let force = flowField[index];
		this.applyForce(force);
		
	}

}

function draw() {
	let yoff = 0;
	for (let y = 0; y < cols; y++) {
		let xoff = 0;
    	for (let x = 0; x < rows; x++) {
    		let index = (x + y * cols);
    		let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
			let v = p5.Vector.fromAngle(angle);
			v.setMag(1);
    		xoff += inc;
			flowField[index] = v
			// stroke(0, 50);
			// strokeWeight(1)
			// push();
			// translate(x * scl, y * scl);
			// rotate(v.heading());
			// line(0, 0, scl, 0)
			// pop();
	    }
    	yoff += inc;
		zoff += .0003;
  }
	for(let i = 0; i < particlesArray.length; i++){
		particlesArray[i].update();
		particlesArray[i].show();
		particlesArray[i].edgeCollision();
		particlesArray[i].follow(flowField);
	}
}

