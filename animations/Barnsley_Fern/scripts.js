/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let animationRequest;
const random_hex = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};

window.onload = function(){ 
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    if(window.innerWidth <= window.innerHeight){
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth;
    } else {
        canvas.width = window.innerHeight;
        canvas.height = window.innerHeight;
    }
    slider()
}

class Particle {

    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.point = {
            x: 0,
            y: 0,
        }
        this.histogram = []
        this.options = []

        for(let i =0; i < 9; i++){
            this.options.push(random_hex())
        }
    }  

    draw(color, x, y){
        let px = Math.floor(this.map(x, -3, 2.6558, 0, this.width));
        let py = Math.floor(this.map(y, 0, 9, this.height, 0));
        this.ctx.fillStyle = color
        this.ctx.beginPath();
        this.ctx.fillRect(px, py, 1, 1)
        this.ctx.closePath();
    }

    map(n, start1, stop1, start2, stop2){
        return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    }

    equations(r){
        let nextX;
        let nextY;

        if (r < 0.01) {
            nextX = 0;
            nextY = 0.2 * this.point.y; -0.12
          } else if (r < 0.86) {
            nextX = 0.845 * this.point.x + 0.035 * this.point.y;
            nextY = -0.035 * this.point.x + 0.82 * this.point.y + 1.6;
          } else if (r < 0.93) {
            nextX = 0.2 * this.point.x + -0.31 * this.point.y;
            nextY = 0.255 * this.point.x + 0.245 * this.point.y + 0.29;
          } else {
            nextX = -0.15 * this.point.x + 0.24 * this.point.y;
            nextY = 0.25 * this.point.x + 0.2 * this.point.y + 0.68;
          }
          this.point.x = nextX;
          this.point.y = nextY;
          this.histogram.push({x: nextX, y: nextY})
    }

    animate(){
        for(let i =0; i < 999999; i++) this.equations(Math.random())
        this.histogram.forEach(data => {
            let color = 'rgba(255,255,255,.3)';
            this.draw(color, data.x, data.y);
        });

        const pixelData = ctx.getImageData(0,0, canvas.width, canvas.height)

        for (let y = 0; y < canvas.height; y++){
            for (let x = 0; x < canvas.width; x++){
                const red = pixelData.data[(y * 4 * pixelData.width) + (x*4)];
                const green = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 1)];
                const blue = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 2)];
                let aux = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 3)];
                const alpha = this.map(aux, 0, 255, 0, 1)
                const pixel = {
                    pixelBrightness: alpha,
                    pixelColor: 'rgba('+red+','+ green +','+ blue+','+ this.pixelBrightness+')'
                };

                let color;
                if(pixel.pixelBrightness > .9)      color = this.options[8]; // tips
                else if(pixel.pixelBrightness > .8) color = this.options[7]; // tips
                else if(pixel.pixelBrightness > .6) color = this.options[6]; // bit of extremes
                else if(pixel.pixelBrightness > .5) color = this.options[5]; // not much
                else if(pixel.pixelBrightness > .4) color = this.options[4]; // not much
                else if(pixel.pixelBrightness > .3) color = this.options[3]; // not much
                else if(pixel.pixelBrightness > .2) color = this.options[2]; // not much
                else if(pixel.pixelBrightness > .1) color = this.options[1]; // not much
                else if(pixel.pixelBrightness > 0)  color = this.options[0]; // majority middle 
                else color = false;

                if(color != false){
                    this.ctx.fillStyle = color;
                    this.ctx.beginPath();
                    this.ctx.fillRect(x, y, 1, 1)
                    this.ctx.closePath();
                }
            }
        }
    }
}

function slider(){
    newParticle = new Particle(ctx, canvas.width, canvas.height)    
    newParticle.animate();
}