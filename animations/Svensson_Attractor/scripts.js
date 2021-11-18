let canvas;
let ctx;
let animationRequest;

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

window.onload = function(){ 
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    slider()
}

class Particle{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.size = 1;

        this.colors = random_color(4)

        // this.a = Math.random() * 2 * (Math.round(Math.random()) ? 1 : -1)
        // this.b = Math.random() * 2 * (Math.round(Math.random()) ? 1 : -1)
        // this.c = Math.random() * 2 * (Math.round(Math.random()) ? 1 : -1)
        // this.d = Math.random() * 2 * (Math.round(Math.random()) ? 1 : -1)

        this.a = 1.4
        this.b = 1.56
        this.c = 1.4
        this.d = -6.56

        console.log('A: ' + this.a + ' B: ' + this.b + ' C: ' + this.c + ' D: ' + this.d)
        console.log(this.colors)
    }
    draw(color){
        let xb = canvas.width*this.x/(6.6*(Math.abs(this.c)+1))+canvas.width/2;
        let yb = canvas.height*this.y/((Math.abs(this.d)+1))+canvas.height/2;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(xb, canvas.height - yb, this.size, this.size);
        ctx.fill()
    }
    svensson(){
        let xPrev = this.x;
        let yPrev = this.y;

        this.x = this.d * Math.sin(this.a*xPrev) - Math.sin(this.b*yPrev) 
        this.y = this.c * Math.cos(this.a*xPrev) + Math.cos(this.b*yPrev)
    }
    map(n, start1, stop1, start2, stop2){
        return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    }
    update(){
        for(let i =0; i < 5000000; i++){
            this.svensson();
            this.draw('rgba(255,255,255,.3)');
        }

        const pixelData = ctx.getImageData(0,0, canvas.width, canvas.height)

        for (let y = 0; y < canvas.height; y++){
            for (let x = 0; x < canvas.width; x++){
                let aux = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 3)];
                const alpha = this.map(aux, 0, 255, 0, 1)
                let color;
                if(alpha > .9)      color = 'rgba(' + this.colors[0].r + ',' + this.colors[0].g + ',' + this.colors[0].b + ',' + (alpha - .2) +')'
                else if(alpha > .8) color = 'rgba(' + this.colors[1].r + ',' + this.colors[1].g + ',' + this.colors[1].b + ',' + alpha +')'
                else if(alpha > .6) color = 'rgba(' + this.colors[2].r + ',' + this.colors[2].g + ',' + this.colors[2].b + ',' + alpha +')'
                else if(alpha > 0)  color = 'rgba(' + this.colors[3].r + ',' + this.colors[3].g + ',' + this.colors[3].b + ',' + alpha +')'
                else color = false;

                if(color != false){
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.fillRect(x, y, 1, 1)
                    ctx.closePath();
                }
            }
        }

        // animationRequest = requestAnimationFrame(this.update.bind(this))
    }
}

function slider(){
    newParticle = new Particle()    
    newParticle.update();
}