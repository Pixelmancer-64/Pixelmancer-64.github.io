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
    particlesArray = [];
    for(let i=0; i<100; i++){
        particlesArray.push(new Pendulum(ctx, canvas.width, canvas.height))
    }
    function animate(){
        animationRequest = requestAnimationFrame(animate); 
        ctx.clearRect(0,0,canvas.width,canvas.height);
    
        for(i=0; i<particlesArray.length; i++){
            particlesArray[i].update();
        }
    }
    
    animate();
}

class Pendulum {
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height){
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.time = 0;
        this.interval = 1000/60;
        this.timer = 0;

        this.hue = 0;

        this.pendulum = {
            length: Math.random()*this.#height*.7 + 300,
            width: .1,
            origin: {
                x: this.#width/2,
                y: 0
            }
        };

        this.ball = {
            x: 0,
            y: 0,
            radius: Math.random()*10,
            mass: 10,
        };

        this.force = 30;
        this.acc = 0;
        this.angle = Math.PI/4;
        this.velocity = 0;
        this.gravity = 1;
        this.force = 0;

    }

    draw(){
        let color = 'hsl(' + this.hue + ',100%,50%)';
        this.#ctx.fillStyle = color;
        this.hue += .1;
        this.#ctx.shadowColor = color;
        this.#ctx.shadowBlur = 25;

        this.#ctx.beginPath();
        this.#ctx.arc(this.ball.x,this.ball.y,this.ball.radius,0,Math.PI*2);
        this.#ctx.fill();
        this.#ctx.closePath();
    }

    drawLine(){
        let color = 'hsl(' + this.hue + ',100%,50%)';
        this.#ctx.strokeStyle = color;
        this.hue += .1;
        this.#ctx.shadowBlur = 0;

        this.#ctx.lineWidth = this.pendulum.width;
        this.#ctx.beginPath();
        this.#ctx.moveTo(this.pendulum.origin.x,this.pendulum.origin.y);
        this.#ctx.lineTo(this.ball.x,this.ball.y);
        this.#ctx.stroke();
    }

    update(){
            this.force = this.gravity * Math.sin(this.angle)/this.pendulum.length;
            this.acc = -1 * this.force;
            this.velocity += this.acc;
            this.angle += this.velocity;
            

            this.ball.x = this.pendulum.length * Math.sin(this.angle) + this.pendulum.origin.x;
            this.ball.y = this.pendulum.length * Math.cos(this.angle) + this.pendulum.origin.y;

            this.drawLine();
            this.draw();
        
        }

}

window.addEventListener('resize', function(){
    cancelAnimationFrame(animationRequest);
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    for(let i=0; i<100; i++){
        particlesArray.push(new Pendulum(ctx, canvas.width, canvas.height))
    }
    function animate(){
        animationRequest = requestAnimationFrame(animate); 
        ctx.clearRect(0,0,canvas.width,canvas.height);
    
        for(i=0; i<particlesArray.length; i++){
            particlesArray[i].update();
        }
    }
    
    animate();
});