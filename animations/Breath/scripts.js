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
	static colors = random_color(4);
	static lineWidth = Math.random() * 5 + 4;
	static circles = Math.floor(Math.random() * 9) + 12;
}

class Particle {
	constructor(x, y, radius, start, end, acc, color) {
		this.pos = {
			x: x,
			y: y,
		};

		this.angle = {
			start: start,
			end: end,
			acc: acc,
		};

		this.radius = radius;
		this.color = color;
	}

	draw() {
		Canvas.ctx.beginPath();

		Canvas.ctx.arc(
			this.pos.x,
			this.pos.y,
			this.radius,
			this.angle.start,
			this.angle.end
		);

		Canvas.ctx.lineWidth = Configs.lineWidth;
		Canvas.ctx.strokeStyle = this.color;
		Canvas.ctx.stroke();
		Canvas.ctx.closePath();

	}

	update() {
		this.angle.start += this.angle.acc;
		this.angle.end += this.angle.acc;
	}
}

class Canvas {
	static ctx;
	static width;
	static height;

	constructor() {
		let canvas = document.getElementById("canvas");
		Canvas.ctx = canvas.getContext("2d");

		if (window.innerWidth <= window.innerHeight) {
		  canvas.width = window.innerWidth;
		  canvas.height = window.innerWidth;
		} else {
		  canvas.width = window.innerHeight;
		  canvas.height = window.innerHeight;
		}

		// canvas.width = window.innerWidth;
		// canvas.height = window.innerHeight;

		Canvas.width = canvas.width;
		Canvas.height = canvas.height;

		this.animationRequest;
		this.i = 0;
		this.arcs = [];

		Canvas.ctx.translate(Canvas.width / 2, Canvas.height / 2);
	}

	animation() {
		Canvas.ctx.clearRect(
			-Canvas.width / 2,
			-Canvas.height / 2,
			Canvas.width,
			Canvas.height
		);

		// for (let i = 0; i < 10; i++) {
		this.arcs.map((shape) => {
			shape.draw();
			shape.update();
		});

		// }

		this.animationRequest = requestAnimationFrame(this.animation.bind(this));
	}

	init() {
		let j = 0;
		let radius = Canvas.width / 2 - Configs.lineWidth * 3;
		for (let i = 0; i < Configs.circles; i++) {
			let end = Math.PI * Math.random() * 2;
			let acc = Math.random() / 60 + 0.009;
			let proportion = 1.1;
			let offset = 0.5;
			let rand = Configs.colors[j];

			this.arcs.push(
				new Particle(
					0,
					0,
					radius,
					0,
					end,
					acc,
					`rgba(${rand.r},${rand.g},${rand.b}, 1)`
				)
			);

			if (end < Math.PI * proportion) {
				j == Configs.colors.length - 1 ? (j = 0) : j++;
				rand = Configs.colors[j];
				this.arcs.push(
					new Particle(
						0,
						0,
						radius,
						end + offset,
						Math.PI * (2 - proportion - offset * 2),
						acc,
						`rgba(${rand.r},${rand.g},${rand.b}, 1)`
					)
				);
			}
			j == Configs.colors.length - 1 ? (j = 0) : j++;

			radius = radius * 0.9 - Configs.lineWidth;

			Configs.lineWidth = Math.random() * 5 + 4
		}
	}
}

window.onload = function () {
	let canvas = new Canvas();
	canvas.init();
	canvas.animation();
};