const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = []

//To not screw up the page if the window space change
window.addEventListener('resize',function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

class Particle{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y=y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.speed = 0;
    }
    draw(){
        ctx.beginPath();
        // ctx.shadowColor = this.color;
        // ctx.shadowBlur = 25;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    update(){
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        } 
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }

        this.x += this.directionX * Math.tanh(this.speed) 
        this.y += this.directionY * Math.tan(this.speed) 
        this.speed += .01;
        this.draw();
    }
}

// controller
function init(){
    let nParticles = 999;
    for(i=0; i < nParticles; i++){
        let signal = Math.round(Math.random()) ? 1 : -1
        let otherSignal = Math.round(Math.random()) ? 1 : -1

        let size = 1;        
        let x = canvas.width/2;
        let y = canvas.height/2;
        //speed
        let directionX =  Math.random() * signal ;
        let directionY =  Math.random() * otherSignal ;
        
        let color = 'rgba(255,255,255, .05)';
        particlesArray.push(new Particle(x,y,directionX,directionY,size,color));
    }
}

function animate(){
    requestAnimationFrame(animate);
    // ctx.clearRect(0,0,innerWidth,innerHeight);

    for(let i=0; i<particlesArray.length; i++){
        for(let j=0; j<10; j++){
            particlesArray[i].update();
        }
    }
}
init();
animate(); 