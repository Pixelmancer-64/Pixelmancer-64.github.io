const random_rgb = () => {
	let r = Math.floor(Math.random() * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);
	return {
		r: r,
		g: g,
		b: b,
	};
};

function random_color(num) {
	let aux = [];
	for (let i = 0; i < num; i++) {
		aux.push(random_rgb());
	}
	return aux;
}

class Configs {
	static colors = random_color(1);
	static lineWidth = .1;
}

class Particle {
	constructor(x, y, radius, color) {
		this.pos = {
			x: x,
			y: y,
		};

		this.angle = 0


		this.radius = radius;
		this.color = color;
	}

	draw() {
		Canvas.ctx.beginPath();

		Canvas.ctx.arc(
			this.pos.x,
			this.pos.y,
			1,
			0,
			Math.PI * 2
		);

		Canvas.ctx.lineWidth = Configs.lineWidth;
		Canvas.ctx.strokeStyle = this.color;
		Canvas.ctx.stroke();
		Canvas.ctx.closePath();

	}

	update() {
		this.pos.x = this.radius * 16 * Math.pow(Math.sin(this.angle), 3)
		this.pos.y = -this.radius * (13 * Math.cos(this.angle) - 5 * Math.cos(2 * this.angle) - 2 * Math.cos(3 * this.angle) - Math.cos(4 * this.angle))

		this.angle += .01

	}
}

class Canvas {
	static ctx;
	static width;
	static height;

	constructor() {
		let canvas = document.getElementById("canvas");
		Canvas.ctx = canvas.getContext("2d");

		// if (window.innerWidth <= window.innerHeight) {
		//   canvas.width = window.innerWidth;
		//   canvas.height = window.innerWidth;
		// } else {
		//   canvas.width = window.innerHeight;
		//   canvas.height = window.innerHeight;
		// }

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		Canvas.width = canvas.width;
		Canvas.height = canvas.height;

		this.animationRequest;
		this.i = 0;
		this.arcs = [];

		Canvas.ctx.translate(Canvas.width / 2, Canvas.height / 2);
	}

	animation() {
		// Canvas.ctx.clearRect(
		// 	-Canvas.width / 2,
		// 	-Canvas.height / 2,
		// 	Canvas.width,
		// 	Canvas.height
		// );

		Canvas.ctx.beginPath();

		for (let i = 0; i < 999; i++) {

			this.arcs.map((shape) => {
				shape.update();
				// shape.draw();
				Canvas.ctx.lineTo(shape.pos.x, shape.pos.y);
			});
		}

		Canvas.ctx.closePath();

		// Canvas.ctx.fillStyle = '#0084C7';
		// Canvas.ctx.fill();

		Canvas.ctx.lineWidth = Configs.lineWidth
		Canvas.ctx.strokeStyle = `rgba(${Configs.colors[0].r},${Configs.colors[0].g},${Configs.colors[0].b}, 1)`;
		Canvas.ctx.stroke();

		this.animationRequest = requestAnimationFrame(this.animation.bind(this));
	}

	init() {
		let rand = Configs.colors[0];

		this.arcs.push(
			new Particle(
				0,
				0,
				Canvas.width / 40,
				`rgba(${rand.r},${rand.g},${rand.b}, 1)`
			)
		);
	}

}

window.onload = function () {
	let canvas = new Canvas();
	canvas.init();
	canvas.animation();
};
