/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let FlowField;
let animationRequest;
let particlesArray;
let animation;
let hue =0;


window.onload = function(){ 
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    canvas.width = 300;
    canvas.height = 300;

    slider()
}

class Particle {

    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.inc = 0
        this.sandpiles = []

        for(let i = 0; i < this.height; i++) {
            this.sandpiles[i] = [];

            for(let j = 0; j < this.width; j++) {
                this.sandpiles[i][j] = null;
            
            }
        }

        this.sandpiles[this.height/2][this.width/2] = 40000;        

    }  

    grid(){
        for(let y = 0; y < this.height; y++){
            for(let x = 0; x < this.width; x++){
                let color = false
                switch (this.sandpiles[y][x]){
                    case 0:
                        color = '#703529'
                        break;
                    case 1:
                        color = '#283D70'
                        break;
                    case 2:
                        color = '#2E3546'
                        break;
                    case 3:
                        color = '#C6934B'
                        break;
                    case 4:
                        color='#E0DDD5'
                        break;
                    default:
                        break;
                }   
                if(color != false){
                    this.ctx.fillStyle = color;
                    this.ctx.fillRect(x, y, 1, 1)
                }
            }
        }
    }

    topple(){
        for(let y = 0; y < this.height; y++){
            for(let x = 0; x < this.width; x++){
                let num = this.sandpiles[y][x];
                if(num >= 4){

                    if(num % 4 == 0){
                        let aux = num/4
                        this.sandpiles[y][x] = 0;

                        this.sandpiles[y+1][x] += aux;
                        this.sandpiles[y-1][x] += aux;
                        this.sandpiles[y][x+1] += aux;
                        this.sandpiles[y][x-1] += aux;
                    }
                    else{
                        this.sandpiles[y][x] = num - 4;

                        this.sandpiles[y+1][x] += 1;
                        this.sandpiles[y-1][x] += 1;
                        this.sandpiles[y][x+1] += 1;
                        this.sandpiles[y][x-1] += 1;
                    }
                }  
            }
        }
    }

    animate(){
        for(let i = 0; i < 10; i++) this.topple();
        this.grid();
        animationRequest = requestAnimationFrame(this.animate.bind(this));
    }

}

function slider(){
    ctx.clearRect(canvas.width/2, canvas.height/2 , canvas.width, canvas.height);
    cancelAnimationFrame(animationRequest);
    newParticle = new Particle(ctx, canvas.width, canvas.height)    
    newParticle.animate();
}
