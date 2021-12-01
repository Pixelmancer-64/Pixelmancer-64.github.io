class Vehicle {
    constructor(x, y) {
        let canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.width = canvas.width;
        this.height = canvas.height;

        this.pos = {x: x, y: y};
        this.vel = {x: 0, y: 0};
        this.acc = {x: 0, y: 0};
        this.maxSpeed = 4;
        this.maxForce = 0.25;
        this.r = 16;
        // this.target = {x: Math.random()*this.width, y: Math.random()*this.height}
        this.target = {x: this.width/2, y: this.height/2}


    }
  
    seek(target) {
        let force = {x: target.x - this.pos.x, y: target.y - this.pos.y};
        force = this.setMag(force, this.maxSpeed);
        // force.sub(this.vel);
        force.x -= this.vel.x 
        force.y -= this.vel.y

        if(force.x > this.maxForce){
            force.x = this.maxForce
        }
        else if(force.y > this.maxForce){
            force.y = this.maxForce
        }
        // force.limit(this.maxForce);
        this.applyForce(force);
    }
  
    setMag(force, n){
        force.x /= 100;
        force.y /= 100;

        return {x: force.x *= n, y: force.y *= n}
    }

    applyForce(force) {
        this.acc.x += force.x
        this.acc.y += force.y
    }
  
    update() {
        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;

        if(this.vel.x > this.maxSpeed){
            this.vel.x = this.maxSpeed
        }
        else if(this.vel.y > this.maxSpeed){
            this.vel.y = this.maxSpeed
        }

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        
        this.acc.x = 0
        this.acc.y = 0
    }
  
    draw() {
        // stroke(255);
        // strokeWeight(2);
        // fill(255);
        // push();
        this.ctx.fillStyle = 'cyan';

        // this.ctx.save();
        // this.ctx.translate(this.pos.x, this.pos.y);
        // this.ctx.rotate(this.vel.heading());

        // this.ctx.beginPath();
        // this.ctx.moveTo(-this.r, -this.r / 2);
        // this.ctx.lineTo(-this.r, this.r / 2);
        // this.ctx.lineTo(this.r, 0);
        // this.fill()
        // this.ctx.closePath();
        this.ctx.fillRect(this.pos.x, this.pos.y, 1, 1);
        // this.ctx.restore()
    }
  
    edges() {
        if (this.pos.x > this.width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = this.width + this.r;
        }
        if (this.pos.y > this.height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = this.height + this.r;
        }
    }

    animate(){
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red'
        // this.ctx.arc(this.target.x, this.target.y, 32, 0, Math.PI*2)
        this.ctx.fill()
        this.ctx.closePath();


        this.seek(this.target);
        this.update();
        this.draw();
        requestAnimationFrame(this.animate.bind(this))
    }
}

const random_rgb = () => {
	let r = Math.floor(Math.random() * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);
	return {r: r, g: g, b: b}
};

function random_color (num){
	let aux = []
    for(let i=0; i < num; i++){
		aux.push(random_rgb())
	}
    return aux;
};

window.onload = function(){
    let vehicle = []
    for(let i = 0; i < 100; i++) vehicle.push(new Vehicle(Math.random() * window.innerWidth, Math.random() * window.innerHeight))
    animationFrame(vehicle)
}

function animationFrame(e){
    for(i=0; i < e.length; i++){
        e[i].animate();
    }
    requestAnimationFrame(animationFrame);
}