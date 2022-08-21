const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let eyes;
let theta;
let scale = window.devicePixelRatio
canvas.width = innerWidth *scale;
canvas.height = innerHeight *scale;
ctx.scale(scale, scale)

let mouse ={
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

// particles
class Eye{
    constructor(x, y, radius){
        this.x = x;
        this.y=y;
        this.radius = radius
    }
    draw(){
        //angles
        let dx = mouse.x -  this.x
        let dy = mouse.y -  this.y
        theta = Math.atan2(dy, dx);

        // eye
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle= 'red';
        ctx.fill();
        ctx.closePath();

        // iris
        let i_x = this.x + Math.cos(theta) * this.radius/10;
        let i_y = this.y + Math.sin(theta) * this.radius/10;
        let i_radius = this.radius /1.2;
        ctx.beginPath();
        ctx.arc(i_x, i_y, i_radius, 0, Math.PI * 2, true);
        ctx.fillStyle= 'white';
        ctx.fill();
        ctx.closePath();
        // pupil
        let p_x = this.x + Math.cos(theta) * this.radius/1.9;
        let p_y = this.y + Math.sin(theta) * this.radius/1.9;
        let p_radius = this.radius /2.5;
        ctx.beginPath();
        ctx.arc(p_x, p_y, p_radius, 0, Math.PI * 2, true);
        ctx.fillStyle= 'black';
        ctx.fill();
        ctx.closePath();
        // pupil reflection
        ctx.beginPath();
        ctx.arc(p_x-p_radius/3, p_y-p_radius/3, p_radius/2, 0, Math.PI * 2, true);
        ctx.fillStyle= 'rgba(255,255,255,.1)';
        ctx.fill();
        ctx.closePath();

        // mouse tracker
        /*
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2, true);
        ctx.fillStyle= 'blue';
        ctx.fill();
        ctx.closePath();
        */
    }
    update(){
        this.draw();
        }
         
}

// controller
function init(){
    eyes = [];
    let nParticles = (canvas.height * canvas.width)/500;
    let overlapping = false;
    let guardian = 40000;
    let guardian_counter = 0;

    while(eyes.length < nParticles && guardian_counter < guardian){
        let eye = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.floor(Math.random() * 100) + 7 
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
   //ctx.fillStyle = 'rgba(0,0,0,0.05)';
    // ctx.fillRect(0,0,innerWidth,innerHeight);
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