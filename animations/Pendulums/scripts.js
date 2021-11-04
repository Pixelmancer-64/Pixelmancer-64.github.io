/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let FlowField;
let animationRequest;
let inc;
let particlesArray = []

window.onload = setup;

class Pendulum {
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height, inc){
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.hue = 0;
        this.inc = inc

        this.p = {
            length: this.#height/5,
            mass: 10,
            width: .07,
            angle: 0,
            origin: {
                x: 0,
                y: 0
            },
            x: 0,
            y: 0,
            vel: 0,
            acc: 0
        };

        this.pAppend = {
            length:  this.#height/4,
            mass: 10,
            width: .07,
            angle: 0,
            x: 0,
            y: 0,
            vel: 0,
            acc: 0
        };

        this.g = .001;
        this.update();
    }

    draw(){
        let color = 'hsl(' + this.hue + ',100%,50%)';
        this.#ctx.strokeStyle = color;
        this.#ctx.fillStyle = color;
        this.hue += .1;
        this.#ctx.shadowBlur = 1;
        this.#ctx.shadowColor = color;

        // this.#ctx.lineWidth = this.p.width;
        // this.#ctx.beginPath();
        // this.#ctx.moveTo(this.p.origin.x,this.p.origin.y);
        // this.#ctx.lineTo(this.p.x, this.p.y);
        // this.#ctx.stroke();
        // this.#ctx.closePath();
        this.#ctx.beginPath();
        this.#ctx.arc(this.p.x,this.p.y, 1, 0, Math.PI*2)
        this.#ctx.fill();
        
    }

    drawLine(){
        let color = 'hsl(' + this.hue + ',100%,50%)';
        this.#ctx.strokeStyle = color;
        this.#ctx.fillStyle = color;
        this.hue += .1;
        this.#ctx.shadowBlur = 1;

        // this.#ctx.lineWidth = this.pAppend.width;
        // this.#ctx.beginPath();
        // this.#ctx.moveTo(this.p.x,this.p.y);
        // this.#ctx.lineTo(this.pAppend.x, this.pAppend.y);
        // this.#ctx.stroke();
        // this.#ctx.closePath();
        this.#ctx.beginPath();
        this.#ctx.arc(this.pAppend.x,this.pAppend.y, 2, 0, Math.PI*2)
        this.#ctx.fill();
    }

    update(){

        this.p.acc += this.inc

        this.pAppend.acc += 1

        // this.#ctx.clearRect(-this.#width/2, -this.#height/2 , this.#width, this.#height);
        this.p.x = this.p.length * Math.sin(this.p.angle);
        this.p.y = this.p.length * Math.cos(this.p.angle);

        this.pAppend.x = this.p.x + this.pAppend.length * Math.sin(this.pAppend.angle);
        this.pAppend.y = this.p.y + this.pAppend.length * Math.cos(this.pAppend.angle);

        this.draw();
        this.drawLine();

        this.p.vel += this.p.acc;
        this.pAppend.vel += this.pAppend.acc;
        this.p.angle += this.p.vel;
        this.pAppend.angle += this.pAppend.vel;

        requestAnimationFrame(this.update.bind(this));
    }

}

function setup(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(3.1415);
    for(let i=0; i < 3; i++){
        inc = Math.floor(Math.random()*7+2)
        particlesArray.push(new Pendulum(ctx, canvas.width, canvas.height, inc))
    }
}