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

    // canvas.width = 500;
    // canvas.height = 500;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    slider()
}

class Particle {

    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.res = 3

        this.dots = []

        for(let i =0; i < 140; i++){
            let rand = {x: Math.random()*this.width, y: Math.random()*this.height}
            this.dots.push(rand)
        }

    }  

    draw(){
        for(let y = 0; y < this.height; y+=this.res){
            for(let x = 0; x < this.width; x+=this.res){
                let dist = []
                for(let i = 0; i < this.dots.length; i++){
                    let dx = x - this.dots[i].x;
                    let dy = y - this.dots[i].y;
                    let distance = Math.sqrt(dx*dx + dy*dy);
                    dist.push(distance)
                }
                dist.sort(function(a, b){return a - b})

                this.ctx.beginPath();
                let r = this.map(dist[0], 0, 200, 0, 255)
                let g = this.map(dist[0], 0, 200, 0, 255)
                let b = this.map(dist[0], 0, 200, 0, 255)

                let color = 'rgb(' + r + ',' + g + ',' + b +')'

                this.ctx.fillStyle = color;
                this.ctx.fillRect(x, y, this.res, this.res);
                this.ctx.closePath();

            }
        }
    }

    map(n, start1, stop1, start2, stop2){
        return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
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
        this.draw();
        // this.points();
        // animationRequest = requestAnimationFrame(this.animate.bind(this));
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