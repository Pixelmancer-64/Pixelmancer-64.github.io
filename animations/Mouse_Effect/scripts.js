const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = []
let mouse ={
    x: undefined,
    y: undefined,
}
window.addEventListener('click', function(event){
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
        ctx.fillStyle = this.color;
        ctx.fill();
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
        if(this.size > 0.2) this.size -= 0.1;
        this.draw();
    }
}

// controller
function init(mx,my){
    let nParticles = 100;
    for(i=0; i < nParticles; i++){
        let signal = Math.round(Math.random()) ? 1 : -1
        let size = (Math.random()*50) + 5;
        let x = mx;
        let y = my;
        //speed
        let directionX =(Math.random()*5) *signal;
        let directionY =(Math.random()*5) *signal;
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
