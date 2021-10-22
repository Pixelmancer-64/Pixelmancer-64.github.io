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
        this.random = Math.random();
    }
    draw(){
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 310, 0, Math.PI * 2);
        ctx.strokeStyle= 'white';
        ctx.shadowBlur = 0;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.shadowColor = '#25E0A3';
        ctx.shadowBlur = 25;
        ctx.strokeStyle= '#25E0A3';
        ctx.fillStyle = '#25E0A3';
        ctx.stroke();
        ctx.fill();
    }
    update(){
        let dx = this.x - canvas.width/2;
        let dy = this.y - canvas.height/2;
        let distance = dx*dx + dy*dy;
        if(distance > 300*300){
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
        }
        this.x += this.directionX + Math.sin(this.random);
        this.y += this.directionY + Math.cos(this.random);
        this.random += .08;
        this.draw();
    }
}

// controller
function init(){
    let nParticles = 20;
    for(i=0; i < nParticles; i++){
        let signal = Math.round(Math.random()) ? 1 : -1
        let otherSignal = Math.round(Math.random()) ? 1 : -1

        let size = 5;        
        let x = canvas.width/2;
        let y = canvas.height/2;
        //speed
        let directionX = Math.random() * 2 * signal ;
        let directionY = Math.random() * 2 * otherSignal ;
        
        let hue = (Math.random()*360);
        let color = 'hsl(' + hue + ',100%,50%)';
        particlesArray.push(new Particle(x,y,directionX,directionY,size,color));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for(let i=0; i<particlesArray.length; i++){
        particlesArray[i].update();
        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);
            i--;
        }
    }
    
}

init();
animate(); 