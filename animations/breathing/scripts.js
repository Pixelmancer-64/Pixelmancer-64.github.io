const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let eyes;
let theta;
let scale = window.devicePixelRatio
canvas.width = innerWidth *scale;
canvas.height = innerHeight *scale;
ctx.scale(scale, scale)
let colorsArray = []

let mouse ={
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

const random_rgb = () => {
	let r = Math.floor(Math.random() * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);

	return 'rgb(' + r + ',' + g + ',' + b + ')'
};

function random_color (num){
	for(let i=0; i < num; i++){
		colorsArray.push(random_rgb())
	}
};

random_color(Math.floor(Math.random()*10+3));

// particles
class Eye{
    constructor(x, y, radius){
        this.x = x;
        this.y=y;
        this.radius = radius
        this.color = colorsArray[Math.floor(Math.random()*colorsArray.length)];
        this.timer = 0
        this.signal = Math.round(Math.random()) ? 1 : -1
        this.add = Math.random() * this.signal
    }
    draw(){
        //angles
        let dx = mouse.x -  this.x
        let dy = mouse.y -  this.y
        theta = Math.atan2(dy, dx);

        // eye
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle= this.color;
        ctx.fill();
        ctx.closePath();

    }
    update(){
        this.draw();
        if(this.radius <= 3 || this.radius >= 80) this.add *= -1
        this.radius += this.add;
    }
         
}

// controller
function init(){
    eyes = [];
    let nParticles = (canvas.height * canvas.width)/50;
    let overlapping = false;
    let guardian = 99999;
    let guardian_counter = 0;

    while(eyes.length < nParticles && guardian_counter < guardian){
        let eye = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.floor(Math.random() * 70) + 8
        };
        overlapping=false;
        for(i=0; i < eyes.length; i++){
            let previousEye = eyes[i];
            let dx = eye.x - previousEye.x;
            let dy = eye.y - previousEye.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < (eye.radius + previousEye.radius)){
                overlapping=true;
                break;
            }
        }
        if(!overlapping){
            eyes.push(new Eye(eye.x, eye.y, eye.radius));
        }
        guardian_counter++;
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0, .5)';
    ctx.fillRect(0,0,innerWidth,innerHeight);
    for(i=0; i<eyes.length; i++){
        eyes[i].update();
    }
}

window.addEventListener('resize',function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

window.addEventListener('mouseout', function(){
    mouse.x = canvas.width/2;
    mouse.y = canvas.height/2;
});

init();
animate();