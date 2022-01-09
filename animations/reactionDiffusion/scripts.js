class Canvas {
	constructor() {
		let canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');

		canvas.width = window.innerWidth/2;
		canvas.height = window.innerHeight/2;

		this.width = canvas.width;
		this.height = canvas.height;

		console.log(this.width)
		console.log(this.height)


		this.grid = []
		this.nextGrid = []
		this.da = 1
		this.db = .5
		this.f = .055
		this.k = .062

		for (let i = 0; i < this.height; i++) {
			this.grid[i] = [];
			this.nextGrid[i] = [];

			for (let j = 0; j < this.width; j++) {

				this.grid[i][j] = {
					a: 1,
					b: 0
				};
				this.nextGrid[i][j] = {
					a: 1,
					b: 0
				};
			}
		}

		const hr = Math.floor(Math.random() * this.height)
		const wr = Math.floor(Math.random() * this.width)

		this.grid[hr][wr].b = 4

		// for (let i = Math.floor(this.height / 2); i < Math.floor(this.height / 2) + 10; i++) {
		// 	for (let j = Math.floor(this.width / 2); j < Math.floor(this.width / 2) + 10; j++) {
		// 		this.grid[i][j].b = 1
		// 	}
		// }
	}

	draw() {

	}

	animate() {

		for (let i = 1; i < this.height - 1; i++) {
			for (let j = 1; j < this.width - 1; j++) {
				const a = this.grid[i][j].a;
				const b = this.grid[i][j].b;
				let newA = a + (this.da * this.laplaceA(i, j)) - (a * b * b) + (this.f * (1 - a));
				let newB = b + (this.db * this.laplaceB(i, j)) + (a * b * b) - ((this.k + this.f) * b);

				if (newA < 0) newA = 0
				else if (newA > 1) newA = 1
				if (newB < 0) newB = 0
				else if (newB > 1) newB = 1

				this.nextGrid[i][j].a = newA
				this.nextGrid[i][j].b = newB

				let color = (this.nextGrid[i][j].a - this.nextGrid[i][j].b) * 255

				this.ctx.fillStyle = `rgba(${color}, ${color}, ${color}, 1)`;
				this.ctx.fillRect(j, i, 1, 1)
			}
		}

		const aux = this.grid
		this.grid = this.nextGrid
		this.nextGrid = aux

		requestAnimationFrame(this.animate.bind(this));

	}

	laplaceA(x, y) {
		let sum = 0;
		sum += this.grid[x][y].a * -1
		sum += this.grid[x - 1][y].a * .2
		sum += this.grid[x + 1][y].a * .2
		sum += this.grid[x][y + 1].a * .2
		sum += this.grid[x][y - 1].a * .2
		sum += this.grid[x + 1][y - 1].a * .05
		sum += this.grid[x - 1][y - 1].a * .05
		sum += this.grid[x - 1][y + 1].a * .05
		sum += this.grid[x + 1][y + 1].a * .05

		return sum
	}

	laplaceB(x, y) {
		let sum = 0;
		sum += this.grid[x][y].b * -1
		sum += this.grid[x - 1][y].b * .2
		sum += this.grid[x + 1][y].b * .2
		sum += this.grid[x][y + 1].b * .2
		sum += this.grid[x][y - 1].b * .2
		sum += this.grid[x + 1][y - 1].b * .05
		sum += this.grid[x - 1][y - 1].b * .05
		sum += this.grid[x - 1][y + 1].b * .05
		sum += this.grid[x + 1][y + 1].b * .05

		return sum

	}
}

(function () {
	let canvas = new Canvas()
	canvas.animate();
})()