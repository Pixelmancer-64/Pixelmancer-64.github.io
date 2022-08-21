class Particle {
	constructor() {
		let canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');

		canvas.width = window.innerWidth/10;
		canvas.height = window.innerHeight/10;

		this.width = canvas.width;
		this.height = canvas.height;

		this.grid = []
		this.da = 1
		this.db = .5
		this.f = .055
		this.k = .062

		this.color = Math.random() * 255
		this.color1 = Math.random() * 255
		this.color2 = Math.random() * 255


		for (let i = 0; i < this.height; i++) {
			this.grid[i] = [];
			this.grid[i] = [];

			for (let j = 0; j < this.width; j++) {

				this.grid[i][j] = {
					a: 1,
					b: 0
				};
				this.grid[i][j] = {
					a: 1,
					b: 0
				};
			}
		}

		// const hr = Math.floor(this.height/2)
		// const wr = Math.floor(this.width/2)

		this.grid[Math.floor(this.height / 2)][Math.floor(this.width / 2)].b = 40

		// for (let i = Math.floor(this.height / 2); i < Math.floor(this.height / 2)+2; i++) {
		// 	for (let j = Math.floor(this.width / 2); j < Math.floor(this.width / 2)+2; j++) {
		// 		this.grid[i][j].b = 1
		// 	}
		// }
	}

	animate() {

		for (let i = 1; i < this.height - 1; i++) {
			for (let j = 1; j < this.width - 1; j++) {
				const a = this.grid[i][j].a;
				const b = this.grid[i][j].b;
				let newA = a + (this.da * this.laplace(i, j, 'a')) - (a * b * b) + (this.f * (1 - a));
				let newB = b + (this.db * this.laplace(i, j, 'b')) + (a * b * b) - ((this.k + this.f) * b);

				if (newA < 0) newA = 0
				else if (newA > 1) newA = 1
				if (newB < 0) newB = 0
				else if (newB > 1) newB = 1
				this.grid[i][j].a = newA
				this.grid[i][j].b = newB

				let color = (this.grid[i][j].a - this.grid[i][j].b)

				this.ctx.fillStyle = `rgba(${color * this.color}, ${color * this.color1}, ${color * this.color2}, 1)`;
				this.ctx.fillRect(j, i, 1, 1)
			}
		}

		// const aux = this.grid
		// this.grid = this.grid
		// this.grid = aux

		requestAnimationFrame(this.animate.bind(this));

	}

	laplace(x, y, k) {
		let sum = 0;
		sum += this.grid[x][y][k] * -1
		sum += this.grid[x - 1][y][k] * .2
		sum += this.grid[x + 1][y][k] * .2
		sum += this.grid[x][y + 1][k] * .2
		sum += this.grid[x][y - 1][k] * .2
		sum += this.grid[x + 1][y - 1][k] * .05
		sum += this.grid[x - 1][y - 1][k] * .05
		sum += this.grid[x - 1][y + 1][k] * .05
		sum += this.grid[x + 1][y + 1][k] * .05

		return sum
	}
}

(function () {
	let aux = new Particle()
	aux.animate();
})()