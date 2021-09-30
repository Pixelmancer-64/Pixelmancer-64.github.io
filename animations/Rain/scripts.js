const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

// particles
class Particle{
    constructor(x, directionY, size, color, num){
        this.x = x;
        this.y=0;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.num = num
    }
    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, 1, 10);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        if(this.y > canvas.height-40){
           this.directionY=0
        }
        //move 
        this.y += this.directionY;
        this.draw();
    }
}

// controller
function init(){
    // particlesArray = [];
    let nParticles = 10;
    for(i=0; i < nParticles; i++){
        let size = (Math.random()*5);
        let x = (Math.random() * ((innerWidth - size * 2 )-(size * 2)) + size * 3);
        //speed
        let directionY = (Math.random()*50)+2;
        let color = '#97f1ff';
        particlesArray.push(new Particle(x,directionY,size,color));

    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(i=0; i<particlesArray.length; i++){
        particlesArray[i].update();
    }
    if(particlesArray.length < 10000) init();
}
init();
animate();