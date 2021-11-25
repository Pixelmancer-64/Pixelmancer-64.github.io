const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

let myFont = new FontFace(
    "dot",
    "url(/calculator/bit.TTF)"
);

  
myFont.load().then(function(e) {
    document.fonts.add(e);
});
  
// particles
class Particle{
    constructor(x,directionY, size, color, num){
        this.x = x;
        this.y = 0;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.num = num;
    }
    draw(){
        ctx.beginPath();
        
        ctx.font = this.size + 'vh dot';
        ctx.fillStyle = this.color;
        ctx.fillText(this.num,this.x, this.y);
    }
    update(){
        if(this.y > canvas.height){
           this.y = 0
           this.x = Math.random() * innerWidth - this.size
        }

        this.y += this.directionY;
        this.draw();
    }
}

// controller
function init(e){
    // particlesArray = [];
        let size = 2;
        let x = Math.random() * innerWidth - size;
        let directionY = innerHeight / 50;
        let color = 'lightgreen';
        let num = e
        particlesArray.push(new Particle(x,directionY,size,color, num));
}

function animate(){
    requestAnimationFrame(animate);
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,innerWidth,innerHeight);
    for(let i=0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }
    // if(particlesArray.length < canvas.width/10) init();
}
function backspace(){
    particlesArray.pop();
}