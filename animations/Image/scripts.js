const myImage = new Image();
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
myImage.src = '/img/mando.jpg'

myImage.addEventListener('load', function(){
canvas.width = 1280;
canvas.height = 720;
ctx.drawImage(myImage, 0,0, canvas.width, canvas.height)
let particlesArray = [];
const nParticles = 5000;
ctx.drawImage(myImage, 0,0, canvas.width, canvas.height);
const pixelData = ctx.getImageData(0,0, canvas.width, canvas.height)
ctx.clearRect(0,0,canvas.width, canvas.height)

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
        this.y= 0;
        this.speed = 0;
        this.velocity = Math.random() ;
        this.size = Math.random() * 1.5 + 1;
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        this.speed = imageMap[this.position1][this.position2][0];
        let movement = (2.5 - this.speed) + this.velocity;

        this.y+= movement;
        if (this.y  >= canvas.height){
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
            }
    }

    function init(){
        particlesArray = [];
            for(i = 0; i < nParticles; i++){
                particlesArray.push(new Particle);
            }
    }
    init();
    function animate(){
        //ctx.drawImage(myImage, 0,0, canvas.width, canvas.height);
        requestAnimationFrame(animate);
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;
        for(i=0; i<particlesArray.length; i++){
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed *.5;
            particlesArray[i].draw();
        } 
    }
    animate();
});
