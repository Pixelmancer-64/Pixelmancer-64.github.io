/**@type {HTMLCanvasElement} */
let canvas;
let ctx;
let particlesArray = [];
let colorsArray = [];
let colorQ  = 5
let animationRequest;

const random_hex = () => {
	let n = (Math.random() * 0xfffff * 1000000).toString(16);
	return '#' + n.slice(0, 6);
};

const random_hsl = () => {
	let n = Math.random() *360;
	return 'hsl(' + n + ',100%,50%)'
};

const random_rgb = () => {
	let r = Math.floor(Math.random() * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);

	return 'rgb(' + r + ',' + g + ',' + b + ')'
};

function random_color (num){
	for(let i=0; i < num; i++){
		colorsArray.push(random_rgb())
	}
};

window.onload = function(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	for(i=0; i < 999; i++){
		particlesArray.push(new Crawler(ctx, canvas.width, canvas.height))
	}
	for(let i=0; i<particlesArray.length; i++){
		particlesArray[i].animate();
	}
}

random_color(colorQ);

class Crawler {
	#ctx;
	#width;
	#height;
	constructor(ctx, width, height){
		this.#ctx = ctx;
		this.#width = width;
		this.#height = height;

		this.cellsSize = 3;

		this.cols = Math.floor(this.#height/this.cellsSize);
		this.rows = Math.floor(this.#width/this.cellsSize);
		this.x = Math.floor(this.rows/2);
		this.y = Math.floor(this.cols/2);

		this.color = colorsArray[Math.floor(Math.random()*colorsArray.length)];
		this.size = 3

		this.moveOptions = [{x: 1, y: 0},{x: -1, y: 0},{x: 0, y: 1},{x: 0, y: -1}];
	}

	draw(){
		this.#ctx.fillStyle = this.color;
		this.#ctx.beginPath();
		this.#ctx.fillRect(this.x * this.cellsSize, this.y * this.cellsSize, this.size, this.size);
		this.#ctx.closePath();
	}

	animate(){
		let rand = this.moveOptions[Math.floor(Math.random()*this.moveOptions.length)]
				
		this.draw();

		this.x += rand.x;
		this.y += rand.y;

		animationRequest = requestAnimationFrame(this.animate.bind(this));
	};
}

// window.addEventListener('resize', function(){
//     cancelAnimationFrame(animationRequest);
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         FlowField = new Crawler(ctx, canvas.width, canvas.height)
//         FlowField.animate(0);
// });