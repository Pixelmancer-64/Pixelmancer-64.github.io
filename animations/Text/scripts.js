const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = 'white';
ctx.font = '45px Cooper';
ctx.fillText('Hugo', 50, 50);

let particlesArray = [];

ctx.strokeStyle = 'white';
ctx.strokeRect(0,0, 130, 100)

const pixelData = ctx.getImageData(0,0, 100, 100)

const mouse ={
    x: undefined,
    y: undefined,
    radius: (canvas.height/110) * (canvas.width/110)
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    }
);

window.addEventListener('mouseout', function(){
    mouse.x = undefined;
    mouse.y = undefined;
});

class Particle{
    constructor(x, y, mass, size, color){
        this.x = x;
        this.y=y;
        this.size = size;
        this.color = color;
        this.originX = this.x;
        this.originY = this.y;
        this.mass = mass;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.closePath();
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


        this.draw();
    }
}

// controller
function init(){
    particlesArray = [];
    let nParticles = (canvas.height * canvas.width)/10000;
    for(i=0;i<nParticles;i++){
        let size = (Math.random()*10) + 3; 
        let color = 'white';
        let mass = (Math.random()*30) + 1;
        let x = (Math.random()*canvas.width);
        let y = (Math.random()*canvas.height);

        particlesArray.push(new Particle(x,y,mass,size,color));

    }

    }
    

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(i=0; i<particlesArray.length; i++){
        particlesArray[i].update();
    }
    connect();
}

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

init();
animate();
