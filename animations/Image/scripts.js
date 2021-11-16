const myImage = new Image();
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
myImage.src = '/img/eye.jpeg'

myImage.addEventListener('load', function(){
canvas.width = myImage.width;
canvas.height = myImage.height;
ctx.drawImage(myImage, 0,0, canvas.width, canvas.height)
const pixelData = ctx.getImageData(0,0, canvas.width, canvas.height)
ctx.clearRect(0,0,canvas.width, canvas.height)

let particlesArray = [];
let imageMap = [];

for (let y = 0; y < canvas.height; y++){
    let row = [];
    for (let x = 0; x < canvas.width; x++){
        const red = pixelData.data[(y * 4 * pixelData.width) + (x*4)];
        const green = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 1)];
        const blue = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 2)];
        const brightness = brightnessCalc(red, green, blue);
        const pixel = [
            pixelBrightness = brightness,
            pixelColor = 'rgb('+red+','+ green +','+ blue+')'
        ];
        row.push(pixel);
    }
    imageMap.push(row);
}

function brightnessCalc(red,green,blue){
    return Math.sqrt( (red*red) * .299 +
                    (green*green) * .587 +
                    (blue*blue) *.114)/100;
}

class Particle{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y=  0;
        this.speed = 0;
        this.velocity = Math.random()*2.5;
        this.size = Math.random() * 1.5 + 1;
        this.positionX = this.x;
        this.positionY = this.y;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = imageMap[this.positionY][this.positionX][1];
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
        ctx.closePath();
    }
    update(){
        this.positionX = Math.floor(this.x);
        this.positionY = Math.floor(this.y);
        this.speed = imageMap[this.positionY][this.positionX][0];
        let movement = this.speed + this.velocity;

        this.y+= movement;
        this.x+= movement;

        if (this.y  >= canvas.height){
            this.y = 0;
            this.x = Math.random() * canvas.width;
        } 
        if (this.x  >= canvas.width){
            this.x = 0;
            this.y = Math.random() * canvas.height;
        }
    }
}

    function init(){
        const nParticles = 3000;
        particlesArray = [];
            for(i = 0; i < nParticles; i++){
                particlesArray.push(new Particle);
            }
    }
    init();
    function animate(){
        requestAnimationFrame(animate);
        ctx.globalAlpha = 0.02;
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        for(i=0; i<particlesArray.length; i++){
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed;
            particlesArray[i].draw();
        } 
    }
    animate();
});
