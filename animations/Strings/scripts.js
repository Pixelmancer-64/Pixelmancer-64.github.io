/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let FlowField;
let animationRequest;
let particlesArray;
let res = 2;

window.onload = function(){ 
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    newParticle = new Particle(ctx, canvas.width, canvas.height)
    slider();
}

class Particle {

    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        // this.angle1 = Math.random()*Math.PI*2;
        // this.angle2 = Math.random()*Math.PI*2;
        this.angle1 = 0;
        this.angle2 = 0;


        this.start = {
            x: this.width/2 + this.width/2 * Math.cos(this.angle1),
            y: this.height/2 + this.height/2 * Math.sin(this.angle1)
        }

        this.end = {
            x: this.width/2 + this.width/2 * Math.cos(this.angle2),
            y: this.height/2 + this.height/2 * Math.sin(this.angle2)
        }
    }

    draw(){
        this.ctx.lineWidth = .1;
        ctx.shadowColor = '#25E0A3';
        ctx.shadowBlur = 10;
        ctx.strokeStyle= '#25E0A3';
        this.ctx.beginPath();
        this.ctx.moveTo(this.start.x,this.start.y);
        this.ctx.lineTo(this.end.x, this.end.y);
        this.ctx.stroke();
    }

    update(){
        this.draw();
        // this.angle1 = Math.random()*Math.PI*2;
        // this.angle2 = Math.random()*Math.PI*2;
        this.angle1 += res;
        this.angle2 += 1;

        this.start = {
            x: this.width/2 + this.width/2 * Math.cos(this.angle1),
            y: this.height/2 + this.height/2 * Math.sin(this.angle1)
        }

        this.end = {
            x: this.width/2 + this.width/2 * Math.cos(this.angle2),
            y: this.height/2 + this.height/2 * Math.sin(this.angle2)
        }

        requestAnimationFrame(this.update.bind(this))
    }

}

function slider(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    res += Math.floor(Math.random()*10);
    newParticle.update();
}

setInterval(slider,3000)
