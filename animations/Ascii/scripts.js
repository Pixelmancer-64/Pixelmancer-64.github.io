const ctx = canvas.getContext('2d');
const myImage = new Image();
myImage.src = '/img/zzzzzuuul.png';

resolution.addEventListener('change', slider)
class Cell {
    constructor(x, y, symbol, color) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.color = color;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillText(this.symbol, this.x, this.y);
    }
}

class Ascii {
    #cells = [];
    #pixelData = [];
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.drawImage(myImage, 0, 0, this.#width, this.#height);
        this.#pixelData = ctx.getImageData(0, 0, this.#width, this.#height);
    }

    #convertToAscii(aux) {
        if (aux > 250) return 'X';
        else if (aux > 240) return '*';
        // else if (aux > 230) return '0';//
        else if (aux > 220) return '#';
        // else if (aux > 210) return '%';//
        else if (aux > 200) return '&';
        // else if (aux > 190) return ')';//
        else if (aux > 180) return '@';
        // else if (aux > 170) return ')';//
        else if (aux > 160) return '%';
        // else if (aux > 150) return 'H';//
        else if (aux > 140) return '=';
        // else if (aux > 130) return 'U';//
        else if (aux > 120) return '0';
        // else if (aux > 110) return 'T';//
        else if (aux > 100) return '$';
        // else if (aux > 90) return 'C';//
        else if (aux > 80) return '?';
        // else if (aux > 70) return 'Q';//
        else if (aux > 60) return '>';
        // else if (aux > 50) return 'M';//
        else if (aux > 40) return '^';
        // else if (aux > 30) return 'Z';//
        else if (aux > 20) return 'W';
        else if (aux > 5) return '-';//
        return '';
    }
    #scan(cellsSize) {
        this.#cells = [];
        for (let y = 0; y < this.#pixelData.height; y += cellsSize) {
            for (let x = 0; x < this.#pixelData.width; x += cellsSize) {
                const pixelX = x * 4;
                const pixelY = y * 4;
                const pixelPos = (pixelY * this.#pixelData.width) + pixelX;

                if (this.#pixelData.data[pixelPos + 3] > 128) {
                    const red = this.#pixelData.data[pixelPos];
                    const green = this.#pixelData.data[pixelPos + 1];
                    const blue = this.#pixelData.data[pixelPos + 2];
                    const avarege = red + green + blue / 3;
                    this.#cells.push(new Cell(x, y, this.#convertToAscii(avarege), `rgb(${red},${green},${blue})`));
                }
            }
        }
    }
    
    #drawAscii() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
        for (let i = 0; i < this.#cells.length; i++) {
            this.#cells[i].draw(this.#ctx);
        }
    }
    draw(cellsSize) {
        this.#scan(cellsSize);
        this.#drawAscii();
    }
}

let aux;
myImage.onload = function initialize() {
    canvas.width = myImage.width;
    canvas.height = myImage.height;
    aux = new Ascii(ctx, myImage.width, myImage.height)
    slider();
}

function slider() {
    if (resolution.value == 1) {
        resolutionL.innerHTML = 'Original image';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
    } else {
        resolutionL.innerHTML = 'Resolution: ' + resolution.value + ' px';
        ctx.font = parseInt(resolution.value) + 'px Verdana'
        aux.draw(parseInt(resolution.value));
    }
}