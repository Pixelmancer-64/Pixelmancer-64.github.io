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
        this.cellsSize = 10;
        this.cols = Math.floor(this.#height/this.cellsSize);
        this.rows = Math.floor(this.#width/this.cellsSize);
        this.x = Math.floor(this.rows/2);
        this.y = Math.floor(this.cols/2);
        this.moveOptions = [{x: 1, y: 0},{x: -1, y: 0},{x: 0, y: 1},{x: 0, y: -1}];
        this.gridArray = this.grid();
    }

    animate(currentTime){
        this.#ctx.strokeStyle = 'white';
        this.#ctx.fillStyle = 'white';
        this.#ctx.beginPath();
        this.#ctx.arc(this.x * this.cellsSize,this.y * this.cellsSize,this.cellsSize/10,0,Math.PI*2);
        this.#ctx.stroke();
        this.#ctx.fill();

        let options = [];
        this.moveOptions.forEach( option =>{
            let newX = this.x + option.x;
            let newY = this.y + option.y;
            if(this.validGrid(newX, newY)) options.push(option)
        });

        let path = [];
        if(options.length > 0){
            this.#ctx.beginPath();
            this.#ctx.moveTo(this.x,this.y);
            let rand = options[Math.floor(Math.random()*options.length)]
            this.x += rand.x;
            this.y += rand.y;
            this.#ctx.lineTo(this.x,this.y);
            this.gridArray[this.x][this.y] = true;
            path.push(this.gridArray[this.x][this.y]);
            animationRequest = requestAnimationFrame(this.animate.bind(this))
        } else {
            console.log('Acabou o espaço menor');
            this.update();
        }
    };

    grid(){
        let cells = new Array(this.cols);
        for (let i=0; i < cells.length; i++){
            cells[i] = new Array(this.rows)
        }
        for (let j = 0; j < this.cols; j++){
            for(let k = 0; k < this.rows; k++) cells[j][k] = false;
        } 
        return cells
    };
    validGrid(x,y){
        if(x<0 || x >= this.rows || x < 0 || y >=this.cols) return false;
        else return !this.gridArray[x][y];
    }

    update(){
        cancelAnimationFrame(animationRequest);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        FlowField = new Crawler(ctx, canvas.width, canvas.height)
        FlowField.animate(0);
    };
}

window.addEventListener('resize', function(){
    cancelAnimationFrame(animationRequest);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        FlowField = new Crawler(ctx, canvas.width, canvas.height)
        FlowField.animate(0);
});