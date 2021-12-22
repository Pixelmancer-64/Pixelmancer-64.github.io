class Particle{
    constructor(color){
        this.pos = {x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight};
        this.vel = {x: 0, y: 0};
        this.acc = {x: 0, y: Math.random()};
        this.radius = Math.random()*5;
        this.color = color
    }
    update(){


        this.pos.x += this.vel.x 
        this.pos.y += this.vel.y 
        
        this.gravity();

        if(this.vel.x < 10) this.vel.x += this.acc.x
        if(this.vel.y < 10) this.vel.y += this.acc.y
    }
    gravity(){
        this.vel.y += 1;
    }

}

class Canvas {
    constructor(){
        let canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');

        // if(window.innerWidth <= window.innerHeight){
        //     canvas.width = window.innerWidth;
        //     canvas.height = window.innerWidth;
        // } else {
        //     canvas.width = window.innerHeight;
        //     canvas.height = window.innerHeight;
        // }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.width = canvas.width;
        this.height = canvas.height;
        this.balls = [];

        this.colors = this.random_color(7);

        for(let i = 0; i < 999; i++) this.balls.push(new Particle(this.colors[Math.floor(Math.random()*this.colors.length)]))
    }  

    draw(e){
        this.ctx.beginPath()
        this.ctx.arc(e.pos.x, e.pos.y, e.radius, 0, Math.PI*2);
        this.ctx.fillStyle = e.color;
        this.ctx.fill();
        this.ctx.closePath()
    }

    animate(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.balls.forEach(e =>{
            this.collision(e)
            e.update()
            this.draw(e)
        })
        requestAnimationFrame(this.animate.bind(this))
    }

    collision(e){
        if(e.pos.x >= this.width || e.pos.x <= 0){
            e.vel.x = -e.vel.x;
        }
        if(e.pos.y >= this.height || e.pos.y <= 0){
            e.vel.y = -e.vel.y;
        }
    }

    random_rgb(){
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return `rgb(${r},${g},${b})`
    }

    random_color(num){
        let aux = []
        for(let i=0; i < num; i++){
            aux.push(this.random_rgb())
        }
        return aux;
    };
    
}

window.onload = function(){
    let canvas = new Canvas();
    canvas.animate()
}