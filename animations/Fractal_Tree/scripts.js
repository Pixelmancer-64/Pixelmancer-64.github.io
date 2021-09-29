const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Tree{
    constructor(x, y, length, angle, width, mainColor, color){
        this.x = x;
        this.y=y;
        this.length = length;
        this.angle = angle;
        this.width = width;
        this.mainColor = mainColor
        this.color = color;
    }
    draw(){
        let newTree
        ctx.beginPath();
        ctx.save();
        ctx.strokeStyle = this.mainColor;
        ctx.fillStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle * Math.PI/180);
        ctx.moveTo(0,0);
        ctx.lineTo(0, -this.length);
        ctx.stroke();

        if(this.length < (Math.random()*10)){
            ctx.restore();
            return;
        }
        newTree = new Tree(0, -this.length, this.length * 0.75, this.angle +(Math.random()*30), this.width);
        newTree.draw()
        newTree = new Tree(0, -this.length, this.length * 0.75, this.angle - (Math.random()*30), this.width);
        newTree.draw()

        ctx.restore();
    }
}

// controller

function controller(){
    let hue = (Math.random()*360);
    let x = canvas.width/2;
    let y = canvas.height - 80;
    let length = 300
    let angle = (Math.random()*.5);
    let width = (Math.random()*.5)+.1;
    let mainColor = 'hsl(' + hue + ',100%,40%)'
    let color = 'green'

    myTree = new Tree(x, y, length, angle, width, mainColor, color)
    console.log(Tree)
    myTree.draw()
    
}

controller();
