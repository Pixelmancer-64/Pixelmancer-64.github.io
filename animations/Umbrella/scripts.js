const canvas = document.getElementById("canvas")
const umbrella = document.getElementById("umbrella")

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
let hue = 0;
let measurement = umbrella.getBoundingClientRect()
let myUmbrella = {
    x: measurement.left,
    y: measurement.top,
    width: measurement.width,
    height: measurement.height,
}

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
        
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        } 
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        //collision with umbrella 

        if(this.x < myUmbrella.x + myUmbrella.width && this.x + this.size > myUmbrella.x && this.y < myUmbrella.y + myUmbrella.height && this.y + this.size > myUmbrella.y){
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
        }
    }
}

// controller
function init(){
    particlesArray = [];
    let nParticles = 1000;
    for(i=0; i < nParticles; i++){

        let size = (Math.random()*5)+5;

        let x = (Math.random() * ((innerWidth - size * 2 )-(size * 2)) + size * 3);

        let y = 0;

        let directionX = (Math.random()*5)+1;
        let directionY = (Math.random()*5)+1;

        let hue = (Math.random()*360);
        let color = 'hsl(' + hue + ',100%,50%)';

        particlesArray.push(new Particle(x,y, directionX, directionY, size,color));

    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width, canvas.height)
    for(i=0; i<particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}


//To not screw up the page if the window space change
window.addEventListener('resize',function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

init();
animate();
