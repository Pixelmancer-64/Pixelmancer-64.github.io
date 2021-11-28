class Canvas {

    constructor(){
        let canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.width = canvas.width;
        this.height = canvas.height;

        this.rules = [];
        this.rules.push({a: "X", b: "XFYFX+F+YFXFY-F-XFYFX"});
        this.rules.push({a: "Y", b: "YFXFY-F-XFYFX+F+YFXFY"});

        // this.rules.push({a: "X", b: "-YF+XFX+FY-"});      
        // this.rules.push({a: "Y", b: "+XF-YFY-FX+"});

        this.axioma = "X";
        this.sentence = this.axioma;
        this.length = 10;
        this.angle = Math.PI/2;
        this.colors = random_color(4);
        this.draw();

        this.hue = 0;
        this.i;

        // this.ctx.translate(this.width/2, this.height/2);

    }  
    animate(){
        this.i = 0;
        let nextSentence = "";
        for (let i = 0; i < this.sentence.length; i++) {
            let current = this.sentence.charAt(i);
            let found = false;
            for (let j = 0; j < this.rules.length; j++) {
                if (current == this.rules[j].a) {
                    found = true;
                    nextSentence += this.rules[j].b;
                    break;
                }
            }
            if (!found) {
                nextSentence += current;
            }
        }
        this.sentence = nextSentence;
        this.draw();
    }

    draw(){
        // this.ctx.save();

            let current = this.sentence.charAt(this.i);
        
            if (current == "F") {
                this.hue += .1;
                this.ctx.strokeStyle = 'hsl(' + this.hue + ',100%,50%)'
                this.ctx.lineWidth = 2;
                this.ctx.beginPath()
                this.ctx.moveTo(0,0)
                this.ctx.lineTo(0, this.length)
                this.ctx.stroke()
                this.ctx.translate(0, this.length);

            } else if (current == "+") {
                this.ctx.rotate(-this.angle);
            } else if (current == "-") {
                this.ctx.rotate(this.angle)
            }
            this.i++;
            if(this.i < this.sentence.length) requestAnimationFrame(this.draw.bind(this));
        // this.ctx.restore();
    }

    map(n, start1, stop1, start2, stop2){
        return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    }

    color(){
        const pixelData = this.ctx.getImageData(0,0, this.width, this.height)

        for (let y = 0; y < canvas.height; y++){
            for (let x = 0; x < canvas.width; x++){
                let aux = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 3)];
                const alpha = this.map(aux, 0, 255, 0, 1)
                let color;
                if(alpha > .9)      color = 'rgba(' + this.colors[0].r + ',' + this.colors[0].g + ',' + this.colors[0].b + ',' + (alpha) +')'
                else if(alpha > .6) color = 'rgba(' + this.colors[1].r + ',' + this.colors[1].g + ',' + this.colors[1].b + ',' + alpha +')'
                else if(alpha > .3) color = 'rgba(' + this.colors[2].r + ',' + this.colors[2].g + ',' + this.colors[2].b + ',' + alpha +')'
                else if(alpha > 0)  color = 'rgba(' + this.colors[3].r + ',' + this.colors[3].g + ',' + this.colors[3].b + ',' + alpha +')'
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
    let control = new Canvas();
    for(let i = 0; i < 5; i++) control.animate();
    // control.color();
}