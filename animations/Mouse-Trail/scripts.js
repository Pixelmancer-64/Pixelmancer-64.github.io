const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = []
let hue =0

let mouse ={
    x: undefined,
    y: undefined,
}
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    init(mouse.x, mouse.y)
});

animate(); 

//To not screw up the page if the window space change
window.addEventListener('resize',function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

window.addEventListener('mouseout', function(){
    mouse.x = undefined;
    mouse.y = undefined;
});

// particles
class Particle{
    constructor(x, y, directionX, directionY, size){
        this.x = x;
        this.y=y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = 'hsl(' + hue + ',100%,60%)';
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath()

    }
    update(){
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }

        //move 
        this.x += this.directionX;
        this.y += this.directionY;
        //
        if(this.size > 0.9) this.size -= .3;
        this.draw();
    }
}

// controller
function init(mx,my){
    let nParticles = 5;
    for(i=0; i < nParticles; i++){
        let signal = Math.round(Math.random()) ? 1 : -1
        let size = (Math.random()*25) + 1;
        let x = mx;
        let y = my;
        //speed
        let directionX =(Math.random()*5) *signal;
        let directionY =(Math.random()*5) *signal;
          particlesArray.push(new Particle(x,y,directionX,directionY,size));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for(let i=0; i<particlesArray.length; i++){
        particlesArray[i].update();
        if (particlesArray[i].size <= 0.9){
            particlesArray.splice(i, 1);
            i--;
        }
    }
    hue++;
    connect();
}

function connect(){
    for(a=0; a<particlesArray.length; a++){
        for(b = a; b<particlesArray.length;b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x)* (particlesArray[a].x-particlesArray[b].x))+((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y-particlesArray[b].y));
            if(distance < (canvas.width/10) * (canvas.height/10)){
                ctx.strokeStyle= particlesArray[a].color;
                ctx.lineWidth = .5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
                ctx.closePath()
            }
        }
    }
}