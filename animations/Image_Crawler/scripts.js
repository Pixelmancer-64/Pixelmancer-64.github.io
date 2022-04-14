/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let FlowField;
let animationRequest;
let imageMap = [];
let cellsSize = 9;

const myImage = new Image();
myImage.src = '/img/zzzzzuuul.png';

myImage.addEventListener('load', function(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.drawImage(myImage, 0,0, canvas.width, canvas.height)
    const pixelData = ctx.getImageData(0,0, canvas.width, canvas.height)
    console.log(pixelData)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    
    let cols =  Math.floor(canvas.height/cellsSize);
    let rows = Math.floor(canvas.width/cellsSize);

    for (let y = 0; y < canvas.height; y++){
        let row = [];
        for (let x = 0; x < canvas.width; x++){
            const red = pixelData.data[(y * 4 * pixelData.width) + (x*4)];
            const green = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 1)];
            const blue = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 2)];
            const pixel = [
                pixelColor = 'rgba('+red+','+ green +','+ blue+','+'1'+')'
            ];
            row.push(pixel);
        }
        imageMap.push(row);
    }

    FlowField = new Crawler(ctx, canvas.width, canvas.height, cols, rows, cellsSize)
    FlowField.animate();
});

class Crawler {
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height, cols, rows, cellsSize){
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;

        this.cellsSize = cellsSize;
        this.save = 0;

        this.cols = cols;
        this.rows = rows;
        this.x = Math.floor(this.rows/2);
        this.y = Math.floor(this.cols/2);

        this.size = this.cellsSize/3;
        this.width = this.size/2;
        this.hue = 0;
        
        this.moveOptions = [{x: 1, y: 0},{x: -1, y: 0},{x: 0, y: 1},{x: 0, y: -1}];
        this.gridArray = this.grid();
        this.path = [];
        this.gridArray[this.y][this.x] = true;


        this.randIndex;
        this.lineX = Math.floor(this.rows/2);
        this.lineY = Math.floor(this.cols/2);
    }

    draw(){
        this.#ctx.fillStyle = imageMap[this.y*this.cellsSize][this.x*this.cellsSize];
        this.#ctx.beginPath();
        this.#ctx.arc(this.x * this.cellsSize,this.y * this.cellsSize,this.size,0,Math.PI*2);
        this.#ctx.fill();
        this.#ctx.closePath();

        // this.#ctx.beginPath();
        // let color = 'hsl(' + this.hue + ',100%,50%)';
        // this.#ctx.fillStyle = color;
        // this.hue += 10;
        // this.#ctx.arc(Math.floor(this.rows/2) * this.cellsSize,Math.floor(this.cols/2)* this.cellsSize,this.size,0,Math.PI*2);
        // this.#ctx.fill();
        // this.#ctx.closePath();
    }

    drawLine(){
        this.#ctx.strokeStyle = 'white'
        this.#ctx.lineWidth = this.width;
        this.#ctx.beginPath();
        this.#ctx.moveTo(this.x * this.cellsSize,this.y * this.cellsSize);
        this.#ctx.lineTo(this.lineX * this.cellsSize,this.lineY * this.cellsSize);
        this.#ctx.stroke();
    }

    animate(){
        let options = [];

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

                // this.drawLine();
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
            animationRequest = requestAnimationFrame(this.animate.bind(this));
        }

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
    ctx.drawImage(myImage, 0,0, canvas.width, canvas.height)
    const pixelData = ctx.getImageData(0,0, canvas.width, canvas.height)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    
    let cols =  Math.floor(canvas.height/cellsSize);
    let rows = Math.floor(canvas.width/cellsSize);

    for (let y = 0; y < canvas.height; y++){
        let row = [];
        for (let x = 0; x < canvas.width; x++){
            const red = pixelData.data[(y * 4 * pixelData.width) + (x*4)];
            const green = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 1)];
            const blue = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 2)];
            const pixel = [
                pixelColor = 'rgba('+red+','+ green +','+ blue+','+'1'+')'
            ];
            row.push(pixel);
        }
        imageMap.push(row);
    }

    FlowField = new Crawler(ctx, canvas.width, canvas.height, cols, rows, cellsSize)
    FlowField.animate();
});