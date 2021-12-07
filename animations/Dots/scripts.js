const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse ={
    x: undefined,
    y: undefined,
    radius: (canvas.height/110) * (canvas.width/110)
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    }
);

// particles
class Particle{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y=y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#fcd457';
        ctx.fill();
    }
    update(){
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }
        //collision
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy * dy)
        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size * 10){
                this.x -= 10;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y += 10;
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10;
            }
        }
        //move 
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// controller
function init(){
    particlesArray = [];
    let nParticles = 100;
    for(i=0; i < nParticles; i++){
        let size = (Math.random()*5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2 )-(size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2 )-(size * 2)) + size * 2);

        //speed
        let directionX = (Math.random()*5)-2.5;
        let directionY = (Math.random()*5)-2.5;
        let color = '#fcd457';

        particlesArray.push(new Particle(x,y,directionX,directionY,size,color));

    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for(i=0; i<particlesArray.length; i++){
        particlesArray[i].update();
    }
    connect();
}

//connect dots
function connect(){
    let opacityValue = 1;
    for(a=0; a<particlesArray.length; a++){
        for(b = a; b<particlesArray.length;b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x)* (particlesArray[a].x-particlesArray[b].x))+((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y-particlesArray[b].y));
            if(distance < (canvas.width/7) * (canvas.height/7)){
                opacityValue = 1 - (distance/30000);
                ctx.strokeStyle='rgba(252,212,87,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

//To not screw up the page if the window space change
window.addEventListener('resize',function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height/110) * (canvas.height/110));
    init();
});

window.addEventListener('mouseout', function(){
    mouse.x = undefined;
    mouse.y = undefined;
});

init();
animate();