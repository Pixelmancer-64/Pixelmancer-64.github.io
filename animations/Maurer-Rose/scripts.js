/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let FlowField;
let animationRequest;
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
        this.r = 0;
        this.x = 0;
        this.y = 0;
        this.n = Math.random()*10;
        this.d = Math.random()*360;
        // this.n = 8;
        // this.d = 160;
        console.log('N: ' + this.n)
        console.log('D: ' + this.d)

        this.k = 0;
        this.size = this.width/2;
        this.ctx.translate(this.width/2, this.height/2);
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#ff6800';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#ff6800';
        this.ctx.lineWidth = .5;
        for (let i=0; i <= 360; i++){
            
            this.k = i * this.d * Math.PI/180;
            this.r = this.size * Math.sin(this.n * this.k)
            this.x = -this.r * Math.cos(this.k)
            this.y = -this.r * Math.sin(this.k)
            this.ctx.lineTo(this.x, this.y)
            this.ctx.moveTo(this.x, this.y)
        }
        this.ctx.stroke();
    }

    drawRose(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 1;
        for (let i=0; i <= 360; i++){
            
            this.k = i * Math.PI / 180;
            this.r = this.size * Math.sin(this.n * this.k)
            this.x = this.r * Math.cos(this.k)
            this.y = this.r * Math.sin(this.k)
            this.ctx.lineTo(this.x, this.y)
            this.ctx.moveTo(this.x, this.y)
        }
        this.ctx.stroke();

    }

    update(){
        this.ctx.clearRect(-this.width/2, -this.height/2 , this.width, this.height);

        this.draw()
        // this.drawRose();
        
        this.n += .00001;
        this.d += .0001;


        animation = requestAnimationFrame(this.update.bind(this))
    }

}

function slider(){
    cancelAnimationFrame(animation)
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