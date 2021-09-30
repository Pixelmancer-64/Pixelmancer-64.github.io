const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gradient = ctx.createLinearGradient(0,canvas.width, 0, 0)
gradient.addColorStop('.1', 'rgba(250,229,0)');
gradient.addColorStop('1', '#8AFF00');
// gradient.addColorStop('0.8', 'rgba(255,165,0)');
// gradient.addColorStop('1', 'rgba(0,0,255)');





let particlesArray = [];
ctx.fillStyle= 'white';
ctx.font = '2.5em Verdana';
ctx.textAlign = 'center';
ctx.fillText('❤', canvas.width/40,canvas.height/30); 



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

        //collision
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy * dy)
        let forceX = dx / distance;
        let forceY = dy / distance;
        let runawayDistance = mouse.radius;
        let force = (runawayDistance - distance) / runawayDistance;
        let directionX = forceX * force * this.mass;
        let directionY = forceY * force * this.mass; 

        
        if(distance < mouse.radius){
            this.x -= directionX;
            this.y -= directionY;
        }else {
                if(this.x !== this.originX){
                let dx = this.x - this.originX;
                this.x -= dx/9;
                }
                if(this.y !== this.originY){
                    let dy = this.y - this.originY;
                    this.y -= dy/9;
                    }
            }
        this.draw();
    }
}

// controller
function init(){
    particlesArray = [];
        for (let y = 0, y1 = pixelData.height; y < y1; y++){
            for (let x = 0, x1 = pixelData.width; x < x1; x++)
                if (pixelData.data[(y * 4 * pixelData.width) + (x*4) + 3] > 180){
                    let ofsetX = 20;
                    let ofsetY = 20; 
                    let size = 1 
                    let color = gradient;
                    let mass = (Math.random()*100) + 1;
                    let posx = x * ofsetX
                    let posy = y * ofsetY
                    particlesArray.push(new Particle(posx,posy,mass,size,color));
                }          
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
    for(a=0; a<particlesArray.length; a++){
        for(b = a; b<particlesArray.length;b++){
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 42){
                ctx.strokeStyle=gradient;
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
