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
		this.vertex = Math.floor(Math.random()*5+3)
        this.dots = []
		this.last = 0;
		this.lastlast = 0;

		this.ctx.translate(this.width/2, this.height/2)

        for(let i =0; i < this.vertex; i++){
			let angle = Math.PI*2 * i / this.vertex 
            let rand = {x: this.width/2 * Math.cos(angle), y: this.height/2 * Math.sin(angle)}
            this.dots.push(rand)
        }

        // this.dots.push({x: this.width/2, y: 0})
        // this.dots.push({x: this.width*.1, y: this.height *.9})
        // this.dots.push({x: this.width*.9, y: this.height *.9})


        this.current = {x: Math.random()*this.width,
            y: Math.random()*this.height}
    }  

    draw(){
        let rand = Math.floor(Math.random()*this.dots.length);
        let dx;
        let dy;

		dx = this.linearInterpolation(this.current.x, this.dots[rand].x, .5)
		dy = this.linearInterpolation(this.current.y, this.dots[rand].y, .5)
		this.current = {x: dx, y: dy};
		this.drawPixel('#8B08D1');
		this.lastlast = this.last;
		this.last = rand;

		if(this.last == this.lastlast){
			while(rand == this.last-1 && rand == this.last+1 && rand == this.last){
				rand = Math.floor(Math.random()*this.dots.length);
			}
			dx = this.linearInterpolation(this.current.x, this.dots[rand].x, .5)
			dy = this.linearInterpolation(this.current.y, this.dots[rand].y, .5)
			this.current = {x: dx, y: dy};
			this.drawPixel('#A22BFF');
			this.lastlast = this.last;
			this.last = rand;
		}
    }

    drawPoint(color){
        this.ctx.fillStyle = color
        this.ctx.beginPath();
        this.ctx.arc(this.current.x, this.current.y, .3, 0, Math.PI*2)
        this.ctx.fill()
        this.ctx.closePath();
    }
	drawPixel(color){
        this.ctx.fillStyle = color
        this.ctx.beginPath();
        this.ctx.fillRect(this.current.x, this.current.y, 1, 1)
        this.ctx.closePath();
    }

    linearInterpolation(x, xf, gap){
        return x * (1-gap) + xf *gap
    }

    points(){
        this.dots.forEach(data => {
            this.ctx.fillStyle = '#FF0000'
            this.ctx.beginPath();
            this.ctx.arc(data.x, data.y, 10, 0, Math.PI*2)
            this.ctx.fill();
            this.ctx.closePath();
        })
    }

    animate(){
        for(let i =0; i < 1000; i++) this.draw();
        animationRequest = requestAnimationFrame(this.animate.bind(this));
    }

}

function slider(){
    cancelAnimationFrame(animationRequest);
    newParticle = new Particle(ctx, canvas.width, canvas.height)    
    newParticle.animate();
}

// window.addEventListener('resize', function(){
//     if(window.innerWidth <= window.innerHeight){
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerWidth;
//     } else {
//         canvas.width = window.innerHeight;
//         canvas.height = window.innerHeight;
//     }
//     slider();
// });