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
    FlowField = new Crawler(ctx, canvas.width, canvas.height)
    FlowField.animate(0);
}

class Crawler {
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
        this.save = 0;

        this.cols = Math.floor(this.#height/this.cellsSize);
        this.rows = Math.floor(this.#width/this.cellsSize);
        this.x = Math.floor(this.rows/2);
        this.y = Math.floor(this.cols/2);

        this.hue = 0;
        this.size = this.cellsSize/3;
        this.width = this.size/2;

        this.moveOptions = [{x: 1, y: 0},{x: -1, y: 0},{x: 0, y: 1},{x: 0, y: -1}];
        this.gridArray = this.grid();
        this.path = [];
        this.isTrue = aux => aux === true;
        this.gridArray[this.y][this.x] = true;


        this.randIndex;
        this.lineX = Math.floor(this.rows/2);
        this.lineY = Math.floor(this.cols/2);
    }

    draw(){
        let color = 'hsl(' + this.hue + ',100%,50%)';
        this.#ctx.fillStyle = color;
        this.hue += .1;
        this.#ctx.beginPath();
        this.#ctx.arc(this.x * this.cellsSize,this.y * this.cellsSize,this.size,0,Math.PI*2);
        this.#ctx.fill();
        this.#ctx.closePath();
    }

    drawLine(){
        this.#ctx.strokeStyle = 'white'
        this.#ctx.lineWidth = this.width;
        this.#ctx.beginPath();
        this.#ctx.moveTo(this.x * this.cellsSize,this.y * this.cellsSize);
        this.#ctx.lineTo(this.lineX * this.cellsSize,this.lineY * this.cellsSize);
        this.#ctx.stroke();
    }

    animate(currentTime){
        let options = [];
        const latency = currentTime - this.timer;
        this.timer = currentTime;

        if(this.timer > this.interval){
            this.moveOptions.forEach( option =>{
                let newX = this.x + option.x;
                let newY = this.y + option.y;
                if(this.validGrid(newY, newX)){
                    options.push(option);
                } 
            });

            if(options.length > 0){
                this.path.push({
                    x: this.x,
                    y: this.y,
                });
                
                this.save=0;

                let rand = options[Math.floor(Math.random()*options.length)]
                
                this.lineX += rand.x;
                this.lineY += rand.y;

                this.drawLine();
                this.draw();

                this.x += rand.x;
                this.y += rand.y;

                
                this.gridArray[this.y][this.x] = true;
            }else {
                this.gridArray[this.y][this.x] = true;
                this.draw()
                this.save++;

                
                this.x = this.path[this.path.length-this.save].x;
                this.y = this.path[this.path.length-this.save].y;
                this.lineX = this.path[this.path.length-this.save].x;
                this.lineY = this.path[this.path.length-this.save].y;

                this.path.slice(this.path.length-1,1)

            }
        } else {
            this.timer += latency;
        }
        animationRequest = requestAnimationFrame(this.animate.bind(this));
    };

    grid(){
        let cells = new Array(this.cols);
        for (let i=0; i < cells.length; i++){
            cells[i] = new Array(this.rows)
        }
        for (let j = 0; j < this.cols; j++){
            for(let k = 0; k < this.rows; k++) cells[j][k] = false;
        } 
        return cells;
    };

    validGrid(y,x){
        if(x < 0 || x >= this.rows || y < 0 || y >= this.cols) return false;
        else return !this.gridArray[y][x];
    }
}

window.addEventListener('resize', function(){
    cancelAnimationFrame(animationRequest);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        FlowField = new Crawler(ctx, canvas.width, canvas.height)
        FlowField.animate(0);
});