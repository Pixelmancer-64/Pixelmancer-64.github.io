class Configs{
	static density = 40;
	static space = window.innerWidth / Configs.density;
	static points = [];
	static speed = 0.0099;

	static random = {
		r : {
			start: Math.random() * 255,
			end: Math.random() * 255,
		},
		g : {
			start: Math.random() * 255,
			end: Math.random() * 255,
		},
		b : {
			start: Math.random() * 255,
			end: Math.random() * 255,
		}
		
	}
}

function setup(){
	createCanvas(window.innerWidth, window.innerHeight);
	noiseDetail(1)
	background(30);
	for(let x = 0; x < height; x += Configs.space){
		for(let y = 0; y < width; y += Configs.space){
			Configs.points.push(createVector(y, x));
		}
	}

}

function draw(){


	Configs.points.forEach(e => {
		let angle = map(noise(e.x  * Configs.speed, e.y  * Configs.speed), 0 , 1, 0, 720);

		noStroke();
		let r = map(e.x, 0 , width , Configs.random.r.start, Configs.random.r.end);
		let g = map(e.y, 0 , height , Configs.random.g.start, Configs.random.g.end);
		let b = map(e.x, 0 , height ,  Configs.random.b.start, Configs.random.b.end);

		fill(r,g,b)

		e.add(createVector(cos(angle), sin(angle)));
		ellipse(e.x, e.y, 1);
	})
}