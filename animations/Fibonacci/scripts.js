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

    slider()
}

class Particle {

    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.i
        this.aux = 0;
        this.phi = 3.2360679775 / 2;
        this.radius = 0.70710678118;


        this.ctx.scale(this.width, this.height);

    }
    

    draw(x, y, r){
        this.ctx.beginPath();
        let color = 'hsl(' + hue + ',100%,50%)';
        this.ctx.fillStyle = color;
        hue += 10;
        this.ctx.arc(x, y, r, 0, Math.PI*2)
        this.ctx.fill();
    }

    update(){
        // this.ctx.clearRect(-this.width/2, -this.height/2 , this.width, this.height);
        // for(let i=0; i < 1050; i++){
            this.i = this.aux;
            const f = this.i / 100;
            const angle = this.i * this.phi;
            const dist = f * this.radius;

            const x = 0.5 + Math.cos(angle * Math.PI * 2) * dist;
            const y = 0.5 + Math.sin(angle * Math.PI * 2) * dist;
            const r = f * .05;

            this.draw(x, y, r);
        // }
        this.aux += .1
        // this.ctx.rotate(1)
        animationRequest = requestAnimationFrame(this.update.bind(this))        
    }

}

function slider(){
    ctx.clearRect(canvas.width/2, canvas.height/2 , canvas.width, canvas.height);
    cancelAnimationFrame(animationRequest);
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