/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let particlesArray;
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
        this.angle = 0;
        this.d = Math.random()*999
        this.n = Math.random()*999

        this.start = {
            x: this.width/2 + this.width/2 * Math.cos(this.angle),
            y: this.height/2 + this.height/2 * Math.sin(this.angle)
        }

        this.ctx.translate(this.width/2, this.height/2)

    }

    drawR(){
        this.ctx.lineWidth = 3;
        ctx.shadowColor = 'hsl(' + hue + ',100%,50%)';
        ctx.shadowBlur = 25;
        ctx.strokeStyle= 'hsl(' + hue + ',100%,50%)';
        this.ctx.beginPath();
        this.ctx.arc(this.start.x,this.start.y, 1, 0, Math.PI*2);
        this.ctx.stroke();
    }

    update(){
        for(let i = 0; i <10; i++){
            this.angle += .02;
            let r = this.width/2 * Math.cos(this.d/this.n * this.angle)

            this.start = {
                x: r * Math.cos(this.angle),
                y: r * Math.sin(this.angle)
            }
            this.drawR();
    }
        
        animation = requestAnimationFrame(this.update.bind(this))
    }

}

function slider(){
    cancelAnimationFrame(animation)
    ctx.clearRect(0,0, canvas.width, canvas.height);
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

// setInterval(slider, 10000)
