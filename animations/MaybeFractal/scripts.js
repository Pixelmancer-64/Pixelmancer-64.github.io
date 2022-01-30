const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = []

class Particle {
    constructor(x, y, directionX, directionY, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = 1;
        this.color = color;
        this.speed = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        this.size = (Math.sqrt(Math.pow((this.x - canvas.width / 2), 2) + Math.pow((this.y - canvas.height / 2), 2)) / canvas.width) * 9 + 1

        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

    }
    update() {
        this.x += this.directionX * Math.cos(this.speed)
        this.y += this.directionY * Math.sin(this.speed)
        this.speed += speed
        this.draw();
    }
}

const speed = Math.random()
const aux = 25

function init() {
    let nParticles = 100;
    for (i = 0; i < nParticles; i++) {
        let signal = Math.round(Math.random()) ? 1 : -1
        let otherSignal = Math.round(Math.random()) ? 1 : -1

        let x = canvas.width / 2;
        let y = canvas.height / 2;

        let directionX = Math.random() * canvas.width / 5 * signal
        let directionY = Math.random() * canvas.height / 5 * otherSignal
        let color = colors[Math.floor(Math.random() * colors.length)]

        let realColor = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;

        particlesArray.push(new Particle(x, y, directionX, directionY, realColor));
    }
}

const random_rgb = () => {
	let r = Math.floor(Math.random() * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);
	return {r: r, g: g, b: b}
};

function random_color (num){
	let aux = []
    for(let i=0; i < num; i++){
		aux.push(random_rgb())
	}
    return aux;
};

const colors = random_color(Math.floor(Math.random() * 2 + 2)); 

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0, .09)'
    ctx.fillRect(0,0,innerWidth,innerHeight);

    for (let i = 0; i < aux; i++) {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }
}


init();
animate();