const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

// particles
class Particle{
    constructor(x,directionY, size, color, ){
        this.x = x;
        this.y=0;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.num;
    }
    draw(){
        ctx.beginPath();
        let zeroOrOne = Math.random()*2;
        if (zeroOrOne < 1){
            this.num = '0';
        }else this.num = '1'
        
        ctx.font = this.size + 'vh Verdana';
        ctx.fillText(this.num,this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        if(this.y > canvas.height){
           this.y = 0
        }
        //move 
        this.y += this.directionY;
        this.draw();
    }
}

// controller
function init(){
    // particlesArray = [];
    let nParticles = 1;
    for(i=0; i < nParticles; i++){
        let size = 1;
        let x = Math.random() * innerWidth - size;
        //speed
        let directionY = innerHeight / 100;
        let color = 'lightgreen';
        particlesArray.push(new Particle(x,directionY,size,color));

    }
}

function animate(){
    requestAnimationFrame(animate);
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,innerWidth,innerHeight);
    for(i=0; i<particlesArray.length; i++){
        particlesArray[i].update();
    }
    if(particlesArray.length < canvas.width/10) init();
}
init();
animate();