const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray;

// particles
class Particle{
    constructor(moveRadius, step, position, size,color){
        this.moveRadius = moveRadius;
        this.step=step;
        this.position = position;
        this.size = size;
        this.color = color
    }
    draw(){
        let x = Math.cos(this.position)*this.moveRadius + canvas.width/2;
        let y = Math.sin(this.position)*this.moveRadius + canvas.height/2;
        drawStar(x, y, 5, this.moveRadius/10, this.size/2)
        /*
        ctx.beginPath();
        ctx.arc(x,y,this.size, 0, Math.PI*2);
        ctx.closePath()
        */
        ctx.fillStyle = this.color;
        // ctx.shadowColor = this.color;
        // ctx.shadowBlur = .00001;
        ctx.fill();
        
    }
    update(){
        this.position += this.step;
        this.draw();
        }
         
}

// controller
function init(){
    particlesArray = [];
    let nParticles = (canvas.height * canvas.width)/5000;
    for(i=0; i < nParticles; i++){
     
        let moveRadius = Math.random() * canvas.width;
        let step = (Math.random()*.02);
        let position = Math.random()*(Math.PI*2);
        let size = (Math.random() * 50) + 1;
        let color = '#25E0A3'

        particlesArray.push(new Particle(moveRadius, step, position, size,color));

    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,innerWidth,innerHeight);

    for(i=0; i<particlesArray.length; i++){
        particlesArray[i].update();
    }
}

window.addEventListener('resize',function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

function drawStar(positionX, positionY, spikes, outerRadius, innerRadius){
    let rotation = Math.PI/2*3;
    let x = positionX;
    let y = positionY;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(positionX, positionY - outerRadius);
    for(let i = 0; i< spikes; i++){
        x = positionX + Math.cos(rotation) * outerRadius;
        y = positionY + Math.sin(rotation) * outerRadius;
        ctx.lineTo(x,y);
        rotation += step;

        x = positionX + Math.cos(rotation) * innerRadius;
        y = positionY + Math.sin(rotation) * innerRadius;
        ctx.lineTo(x,y);
        rotation += step;
    }
    ctx.lineTo(positionX, positionY - outerRadius);
    ctx.closePath();
}

init();
animate();