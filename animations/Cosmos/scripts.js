const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = []

class Particle{
    constructor(x, y, directionX, directionY, size, color, rand){
        this.x = x;
        this.y=y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.speed = 0;
        this.rand = rand
        this.rand = Math.random()
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.fill()
    }
    update(){
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        } 
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }

        this.x += this.directionX * Math.sin(this.speed) 
        this.y += this.directionY * Math.cos(this.speed) 
        this.speed += this.rand;
        this.draw();
    }
}

// controller
function init(){
    let nParticles = 9999;
    let hand0 = Math.random()
    let rand = Math.random()*9999
    for(i=0; i < nParticles; i++){
        let signal = Math.round(Math.random()) ? 1 : -1
        let otherSignal = Math.round(Math.random()) ? 1 : -1

        let size = 1;        
        let x = canvas.width/2;
        let y = canvas.height/2;

        let directionX =  rand * signal ;
        let directionY =  rand * otherSignal ;
        
        let color = 'rgba(20,0, 255, .7)'
        particlesArray.push(new Particle(x,y,directionX,directionY,size,color, hand0));
    }
}

function animate(){
    requestAnimationFrame(animate);
    // ctx.clearRect(0,0,innerWidth,innerHeight);

    for(let i=0; i<particlesArray.length; i++){
        particlesArray[i].update();
    }
    
}
    
init();
animate(); 