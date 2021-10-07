/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = []
let hue =0

let mouse ={
    x: undefined,
    y: undefined,
    random: 1,
}
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    mouse.random = Math.floor(Math.random()*10+1);
    for (let i = 0; i < mouse.random; i++){
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
        this.directionX = Math.random() * 4 - 1;
        this.directionY = Math.random() * 4 - 1;
        this.size = Math.random()  + 2;
        this.maxSize = Math.random() * 7 + 5;
        this.color = '#34bd59';
        this.angle = Math.random () * 6.28;
    }
    draw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle = 'black'
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
