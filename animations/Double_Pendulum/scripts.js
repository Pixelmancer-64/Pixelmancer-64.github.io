/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let FlowField;
let animationRequest;
let particlesArray;

window.onload = function(){ 
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // particlesArray = [];
    // particlesArray.push(new Pendulum(ctx, canvas.width, canvas.height))
    // particlesArray
    let aux = new Pendulum(ctx, canvas.width, canvas.height)
    aux.update();
    
}

class Pendulum {
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height){
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.hue = 30;

        this.p = {
            length: this.#height/4,
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

        this.#ctx.translate(this.#width/2, this.#height/2)
        this.#ctx.rotate(3.1415)
    }

    draw(){
        let color = 'hsl(' + this.hue + ',100%,50%)';
        this.#ctx.strokeStyle = color;
        this.#ctx.fillStyle = color;
        this.hue += .1;
        this.#ctx.shadowBlur = 1;
        this.#ctx.shadowColor = color;

        this.#ctx.lineWidth = this.p.width;
        this.#ctx.beginPath();
        this.#ctx.moveTo(this.p.origin.x,this.p.origin.y);
        this.#ctx.lineTo(this.p.x, this.p.y);
        this.#ctx.stroke();
        this.#ctx.closePath();
        this.#ctx.beginPath();
        this.#ctx.arc(this.p.x,this.p.y, .1, 0, Math.PI*2)
        this.#ctx.fill();
        
    }

    drawLine(){
        let color = 'hsl(' + this.hue + ',100%,50%)';
        this.#ctx.strokeStyle = color;
        this.#ctx.fillStyle = color;
        this.hue += .1;
        this.#ctx.shadowBlur = 0;

        this.#ctx.lineWidth = this.pAppend.width;
        this.#ctx.beginPath();
        this.#ctx.moveTo(this.p.x,this.p.y);
        this.#ctx.lineTo(this.pAppend.x, this.pAppend.y);
        this.#ctx.stroke();
        this.#ctx.closePath();
        this.#ctx.beginPath();
        this.#ctx.arc(this.pAppend.x,this.pAppend.y, .1, 0, Math.PI*2)
        this.#ctx.fill();
    }

    update(){
        let num1 = -this.g * (2 * this.p.mass + this.pAppend.mass) + Math.sin(this.p.angle);
        let num2 = -this.pAppend.mass * this.g * Math.sin(this.p.angle - 2 * this.pAppend.angle);
        let num3 = -2*Math.sin(this.p.angle - this.pAppend.angle) * this.pAppend.mass;
        let num4 =  this.pAppend.vel * this.pAppend.vel * this.pAppend.length + this.p.vel * this.p.vel * this.p.length * Math.cos(this.p.angle - this.pAppend.angle);
        let den = this.p.length * (2 * this.p.mass + this.pAppend.mass - this.pAppend.mass*Math.cos(2*this.p.angle - 2 * this.pAppend.angle));

        this.p.acc = (num1 + num2 + num3 * num4) / den;
        
        num1 = 2 * Math.sin(this.p.angle-this.pAppend.angle);
        num2 = (this.p.vel * this.p.vel * this.p.length*(this.p.mass + this.pAppend.mass));
        num3 = this.g * (this.p.mass + this.pAppend.mass) * Math.cos(this.p.angle);
        num4 = this.pAppend.vel * this.pAppend.vel * this.pAppend.length * this.pAppend.mass * Math.cos(this.p.angle - this.pAppend.angle);
        den = this.pAppend.length * (2 * this.p.mass + this.pAppend.mass - this.pAppend.mass*Math.cos(2*this.p.angle - 2 * this.pAppend.angle));

        this.pAppend.acc = (num1 * (num2 +num3 + num4))/den;

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