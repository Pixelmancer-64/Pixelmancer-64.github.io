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
	static colors = random_color(7);
	static lineWidth = 0.1;
	static direction = 1;
  }
  
  class Particle {
	constructor(x, y, radius, color) {
	  this.pos = {
		x: x,
		y: y,
	  };
  
	  this.angle = 0;
  
	  this.radius = radius;
	  this.color = color;
	}
  
	draw() {
	  Canvas.ctx.beginPath();
  
	  Canvas.ctx.arc(this.pos.x, this.pos.y, 1, 0, Math.PI * 2);
  
	  Canvas.ctx.closePath();
  
	  Canvas.ctx.fillStyle = this.color;
	  Canvas.ctx.fill();
	}
  
	update() {
	  this.pos.x = this.radius * Math.sin(this.angle);
	  this.pos.y = this.radius * Math.cos(this.angle);
  
	  this.angle += 0.1 * Configs.direction * Math.random()
	  this.radius += 0.01;
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
	  Canvas.ctx.scale(.5, .5);

	}
  
	animation() {
	  // Canvas.ctx.clearRect(
	  // 	-Canvas.width / 2,
	  // 	-Canvas.height / 2,
	  // 	Canvas.width,
	  // 	Canvas.height
	  // );
  
	  Canvas.ctx.beginPath();
  
	  for (let i = 0; i < 99; i++) {
		this.arcs.forEach((shape) => {
		  shape.update();
		  shape.draw();
		});
	  }
  
	  this.animationRequest = requestAnimationFrame(this.animation.bind(this));
	}
  
	init() {
	  for (let i = 0; i < 20; i++) {
		let color = Configs.colors[this.i];
  
		this.arcs.push(
		  new Particle(0, 0, 30 * i, `rgba(${color.r},${color.g},${color.b}, 1)`)
		);
		this.i == Configs.colors.length - 1 ? (this.i = 0) : this.i++;
	  }
	}
  
	events() {
	  document.body.onmousedown = function () {
		Configs.direction *= -1;
	  };
	}
  }
  
  window.onload = function () {
	let canvas = new Canvas();
	canvas.init();
	canvas.animation();
  //   canvas.events();
  };