const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const refresh = document.getElementById("refresh")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let newSnowflake = [];

ctx.translate(canvas.width /2, canvas.height/2);

class Snowflake{
    constructor(angle, maxLevel, branches, color, lineW){
        this.angle = angle;
        this.maxLevel = maxLevel;
        this.branches = branches;
        this.color=color;
        this.lineW = lineW;
    }
    draw(level){
        if(level > this.maxLevel) return;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(canvas.width/3,0);
        ctx.stroke();
        for (let i=0; i<this.branches + 1; i++){
            ctx.save(); //save0
            ctx.translate(canvas.width/3 * i/ (this.branches + 1), 0);
            ctx.scale(.6,.6);
            ctx.save(); //save1

            ctx.rotate(this.angle);
            this.draw(level+1);
            ctx.restore(); // return to save 1
            ctx.save(); // save 2

            ctx.rotate(-this.angle);
            this.draw(level+1);
            ctx.restore(); // return to save 2
            ctx.restore(); // return to save 0
        }

    }
}

let refreshTimes 

function controller(){
    let hue = (Math.random()*360);
    let angle = Math.PI * Math.random()*2;
    let color = 'hsl(' + hue + ',100%,40%)';
    let maxLevel = 3
    let branches = Math.floor(Math.random() * 4  + 1)
    let lineW = Math.floor(Math.random() * 5 + 1)
    let times = Math.floor(Math.random() * 30 + 5)
    refreshTimes = times
    newSnowflake = new Snowflake(angle, maxLevel, branches, color,lineW)
    for( i=0; i<times; i++){
        newSnowflake.draw(0)
        ctx.rotate(Math.PI*2/times)
    }
    
}

window.addEventListener('resize',function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    controller();
});

refresh.onclick = function(){
    for( i=0; i<refreshTimes; i++){
        ctx.clearRect(0,0,innerWidth,innerHeight);
        ctx.rotate(Math.PI*2/refreshTimes)
    }
    controller();
}

controller();
