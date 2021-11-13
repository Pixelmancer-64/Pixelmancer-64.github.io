/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let FlowField;
let animationRequest;
let particlesArray;
let res = 1;
let animation;
let hue =0;

window.onload = function(){ 
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    if(window.innerWidth <= window.innerHeight){
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth;
    } else {
        canvas.width = window.innerHeight;
        canvas.height = window.innerHeight;
    }
    
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
        this.ctx.lineWidth = .3;
        ctx.shadowColor = 'hsl(' + hue + ',100%,50%)';
        ctx.shadowBlur = 25;
        ctx.strokeStyle= 'hsl(' + hue + ',100%,50%)';
        this.ctx.beginPath();
        this.ctx.moveTo(this.start.x,this.start.y);
        this.ctx.lineTo(this.end.x, this.end.y);
        this.ctx.stroke();
    }

    update(){
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

        this.draw();
        
        animation = requestAnimationFrame(this.update.bind(this))
    }

}

function slider(){
    cancelAnimationFrame(animation)
    ctx.clearRect(0,0, canvas.width, canvas.height);
    res+= Math.floor(Math.random()*1000);
    hue = Math.random()*360;
    newParticle = new Particle(ctx, canvas.width, canvas.height)
    newParticle.update();
}

window.addEventListener('resize', function(){
    if(window.innerWidth <= window.innerHeight){
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth;
    } else {
        canvas.width = window.innerHeight;
        canvas.height = window.innerHeight;
    }
    slider();
});

setInterval(slider,10000)
