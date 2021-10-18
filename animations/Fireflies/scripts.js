/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let FlowField;
let animationRequest;

window.onload = function(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    FlowField = new FlowFieldEffect(ctx, canvas.width, canvas.height)
    //FlowField.animate(0);
}
const glass = document.getElementById('glass');
let measurement = glass.getBoundingClientRect()
let myUmbrella = {
    x: measurement.left,
    y: measurement.top,
    width: measurement.width,
    height: measurement.height,
}

console.log(measurement)

class FlowFieldEffect {
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height){
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.time = 0;
        this.interval = 1000/60;
        this.timer = 0;
        this.cellsSize = 15;
        this.gradient;
        this.#gradient();
        this.#ctx.strokeStyle = this.gradient;
        this.#ctx.lineWidth = 1;
        this.wild = Math.random()
        this.radius = 0;
        this.#ctx.beginPath();
        // this.#ctx.arc(myUmbrella.x, myUmbrella.y, 100, 0, Math.PI * 2, false);
        this.#ctx.arc(this.#width/2, this.#height/2, myUmbrella.width/2, 0, Math.PI*2);
        this.#ctx.strokeStyle = 'red';
        this.#ctx.stroke();
    }
    #gradient(){
        this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
        this.gradient.addColorStop("0.1","#ff5c33")
        this.gradient.addColorStop("0.2","#ff66b3")
        this.gradient.addColorStop("0.4","#ccf")
        this.gradient.addColorStop("0.6","#b3ffff")
        this.gradient.addColorStop("0.8","#80ff80")
        this.gradient.addColorStop("0.9","#ffff33")

    }
    #draw(angle, x,y){
        this.#ctx.beginPath();
        this.#ctx.moveTo(x,y);
        this.#ctx.lineTo(x + Math.cos(angle) * 30, y + Math.sin(angle) * 30);
        this.#ctx.stroke();
    };
    animate(currentTime){
        const latency = currentTime - this.timer;
        this.timer = currentTime;
        if(this.timer > this.interval){
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            this.radius += .09
            for (let y = 0; y <  this.#height; y += this.cellsSize){
                for (let x = 0; x <  this.#width; x += this.cellsSize){
                    const angle = (Math.cos(x*.0009) + Math.sin(y*.0009)) * this.radius
                    this.#draw(angle, x, y);
                }
            }
            this.timer = 0;
        }else{
            this.timer += latency;
        }
        animationRequest = requestAnimationFrame(this.animate.bind(this));
    }
}

window.addEventListener('resize', function(){
    cancelAnimationFrame(animationRequest);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    FlowField = new FlowFieldEffect(ctx, canvas.width, canvas.height)
    FlowField.animate(0);
});

