const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const refresh = document.getElementById("refresh")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Tree{
    constructor(x, y, length, angle, width, color){
        this.x = x;
        this.y=y;
        this.length = length;
        this.angle = angle;
        this.width = width;
        this.mainColor = color
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
        ctx.bezierCurveTo(5, -this.length, 15, -this.length/2, 0, -this.length)
        ctx.stroke();

        if(this.length < (Math.random()*9)){
            ctx.beginPath();
            ctx.arc(0, -this.length, 1, 0,Math.PI*2)
            ctx.fillStyle = 'white';
            ctx.fill()
            ctx.restore();
            return;
        }
        newTree = new Tree(0, -this.length, this.length *.75, this.angle +(Math.random()*30), this.width);
        newTree.draw()
        newTree = new Tree(0, -this.length, this.length *.75, this.angle - (Math.random()*30), this.width);
        newTree.draw()

        ctx.restore();
    }
}

// controller

function controller(){
    let hue = (Math.random()*360);
    let x = canvas.width/2;
    let y = canvas.height;
    let length = canvas.height/4
    let angle = (Math.random()*.5);
    let width = Math.random()+0.2
    let color = 'hsl(' + hue + ',100%,40%)'

    myTree = new Tree(x, y, length, angle, width, color)
    myTree.draw()
    
}
window.addEventListener('resize',function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    controller();
});
refresh.onclick = function(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    controller();
}
controller();
