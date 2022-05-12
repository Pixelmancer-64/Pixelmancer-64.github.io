let canvas;
let ctx;
let FlowField;
let animationRequest;
let particlesArray;
let animation;
let hue = 0;

window.onload = function () {
    canvas = document.getElementById('canvas');
    canvas.imageSmoothingEnabled = true;
    canvas.mozImageSmoothingEnabled = true;
    canvas.webkitImageSmoothingEnabled = true;
    canvas.msImageSmoothingEnabled = true;
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //  canvas.width = 700;
    // canvas.height = 700;


    slider()
}


let randR = Math.random() * 2;
let randG = Math.random() * 2;
let randB = Math.random() * 2;

class Particle {

    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.res = 1

        this.dots = []

        let nParticles = 300;
        let overlapping = false;
        let guardian = 4000;
        let guardian_counter = 0;

        while(this.dots.length < nParticles && guardian_counter < guardian){
            let dot = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: 9
            };

            overlapping=false;
            for(let i=0; i < this.dots.length; i++){
                let previousDot = this.dots[i];
                let dx = dot.x - previousDot.x;
                let dy = dot.y - previousDot.y;
                let distance = dx*dx + dy*dy;
                if(distance < (dot.radius * dot.radius + previousDot.radius * previousDot.radius)){
                    overlapping=true;
                    break;
                }
            }

            if(!overlapping){
                this.dots.push({
                    x: dot.x,
                    y: dot.y,
                    radius : dot.radius,
                    color: {
                        r: Math.random() * 255,
                        g: Math.random() * 255,
                        b: Math.random() * 255
                    }
                });
            }
            guardian_counter++;
        }

    }


    draw() {
        for (let y = 0; y < this.height; y += this.res) {
            for (let x = 0; x < this.width; x += this.res) {
                let dist = Infinity
                let nearestPoint;

                for (let i = 0; i < this.dots.length; i++) {
                    let dx = x - this.dots[i].x;
                    let dy = y - this.dots[i].y;

                    let distance = dx * dx + dy * dy;
                    // dist.push(distance)
                    if (distance < dist) {
                        dist = distance
                        nearestPoint = this.dots[i];
                    }

                }

                this.ctx.beginPath();
                // let offset = 20000
                let distanceFromCenter = Math.pow((nearestPoint.x - this.width/2), 2) + Math.pow((nearestPoint.y - this.height/2), 2)

                // let r = dist / distanceFromCenter * offset
                // let g = dist / distanceFromCenter * offset
                // let b = dist / distanceFromCenter * offset

                let r = nearestPoint.color.r
                let g = nearestPoint.color.g
                let b = nearestPoint.color.b

                let color = 'rgba(' + r + ',' + g + ',' + b + ',' + distanceFromCenter / (this.width * 400) + ')'

                // let color = 'rgba(' + r + ',' + g + ',' + b + ',' + 1 + ')'

                // let alpha =  this.width * 99 / distanceFromCenter;
                // let color = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')'

                this.ctx.fillStyle = color;
                this.ctx.fillRect(x, y, this.res, this.res);
                this.ctx.closePath();

            }
        }
    }

    points() {
        this.dots.forEach(data => {
            this.ctx.fillStyle = 'rgba(255, 255, 255, .5)'
            this.ctx.beginPath();
            this.ctx.arc(data.x, data.y, 10, 0, Math.PI * 2)
            this.ctx.fill();
            this.ctx.closePath();
        })
    }

    animate() {
        this.draw();
        // this.points();

        // animationRequest = requestAnimationFrame(this.animate.bind(this));
    }

}

function slider() {
    newParticle = new Particle(ctx, canvas.width, canvas.height)
    newParticle.animate();
}