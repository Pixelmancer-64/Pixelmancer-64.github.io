/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

if (window.innerWidth <= window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
} else {
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;
}

let particlesArray = []

const random_rgb = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return {
        r: r,
        g: g,
        b: b
    }
};

function random_color(num) {
    let aux = []
    for (let i = 0; i < num; i++) {
        aux.push(random_rgb())
    }
    return aux;
};

let width = canvas.width
let height = canvas.height
let offset = 0
let sides = 6
let r = width
let radius = r;
let a = 2 * Math.PI / sides;
let shapes = []
let colors = random_color(3);

class Shape {
    constructor(x, y, radius, sides, color) {

        this.pos = {
            x: x,
            y: y
        }

        this.original = {
            x: x,
            y: y
        }

        this.new = {
            x: x,
            y: y
        }


        this.radius = radius;
        this.originalRadius = radius;
        this.newRadius = radius;

        this.sides = sides;
        this.color = color
    }

    draw() {
        ctx.beginPath();

        for (let i = 0; i < this.sides; i++) {
            ctx.lineTo(this.pos.x + this.radius * Math.cos(a * i), this.pos.y + this.radius * Math.sin(a * i));
        }

        ctx.closePath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

function drawGrid() {
    for (let y = r + offset; y + r * Math.sin(a) < height + offset; y += r * Math.sin(a)) {
        for (let x = r + offset, j = 0; x + r * (1 + Math.cos(a)) < width + offset; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
            // drawHexagon(x, y);
            shapes.push(new Shape(x, y, radius, sides, 'rgba(255,255,255,.1)'));
        }
    }
}

let j = 0
for (let i = 0; i < 999; i++) {

    // let rand = colors[Math.floor(Math.random() * colors.length-1 + 1)]
    let rand = colors[j]


    shapes.push(new Shape(width / 2, width / 2, radius, sides, `rgba(${rand.r},${rand.g},${rand.b}, 1)`));
    // shapes.push(new Shape(width / 2, width / 2, radius, sides, 'rgba(255,255,255, 1)'));

    // offset += 1

    (j == colors.length - 1) ? j = 0: j++;

    radius = radius * .9;

}


shapes.forEach((shape, index) => {
    let indez = shapes.length - 1 - index
    shape.newRadius = shapes[indez].originalRadius
    shape.new.x = shapes[indez].original.x
    shape.new.y = shapes[indez].original.y

})


let growthSpeed = 1.009
// let growthSpeed = 1.0009

let growthLimit = r * growthSpeed;

function update() {
    ctx.clearRect(0, 0, width, height)

    // for(let i = 0; i < 5; i++){
    shapes.forEach((shape, index) => {
        shape.draw();


        if (shape.radius >= growthLimit) {
            shape.radius = shape.newRadius
            shape.pos.x = shape.new.x
            shape.pos.y = shape.new.y

        } else {
            shape.radius *= growthSpeed;
        }
    })
    // }

    requestAnimationFrame(update);
}

update()