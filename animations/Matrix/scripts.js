const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

// particles
class Particle{
    constructor(x,directionY, size, color, num){
        this.x = x;
        this.y=0;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.num = num
    }
    draw(){
        ctx.beginPath();
        ctx.font = '1em Verdana';
        ctx.fillText(this.num,this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        if(this.y > canvas.height){
           this.y=0
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
        let size = (Math.random());
        let x = (Math.random() * ((innerWidth - size * 2 )-(size * 2)) + size * 3);
        let num 
        //speed
        let directionY = (Math.random()*5)+2;
        let color = 'lightgreen';
        let zeroOrOne = Math.random()*2;
        if (zeroOrOne << 1){
            num = '0';
        }else num = '1'
        particlesArray.push(new Particle(x,directionY,size,color,num));

    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(i=0; i<particlesArray.length; i++){
        particlesArray[i].update();
    }
    if(particlesArray.length < 1900) init();
}
init();
animate();