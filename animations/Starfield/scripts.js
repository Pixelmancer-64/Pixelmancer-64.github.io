/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = []

let mouse ={
    x: undefined,
    y: undefined,
}
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    let random = Math.floor(Math.random()*10);
    ctx.fillStyle = 'rgba(0,0,0,0.09)';
            ctx.fillRect(0,0,innerWidth,innerHeight);
    for (let i = 0; i < random; i++){
        const myRoot = new Root(mouse.x, mouse.y);
        myRoot.update();
    };
});

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
class Root{
    constructor(x, y){
        this.x = x;
        this.y=y;
        this.spikes = Math.floor(Math.random()*10 + 3)

        this.moveRadius = 30;
        this.directionX = Math.random() * 4 - 1;
        this.directionY = Math.random() * 4 - 1;
        this.size = Math.random()  + 2;
        this.maxSize = Math.random() * 7 + 5;
        this.hue = Math.random()*360
        this.color = 'hsl(' + this.hue + ',100%,50%)'
        this.strokeColor = 'hsl(' + this.hue + ',100%,30%)'

        this.angle = Math.random () * 6.28;
    }
    draw(){
            // ctx.beginPath();
            // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            drawStar(this.x, this.y, this.spikes, this.moveRadius, this.size)
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle = this.strokeColor
            ctx.stroke();
    }
    update(){
        this.x += this.directionX + Math.sin(this.angle);
        this.y += this.directionY + Math.cos(this.angle);
        this.size += .1;
        this.angle += .1;
        if(this.size < this.maxSize){
            this.draw()
            
            requestAnimationFrame(this.update.bind(this));
        }
    }
}

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