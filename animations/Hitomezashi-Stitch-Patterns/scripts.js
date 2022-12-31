import { start, random } from "../functionalModules.js";

function main(){

  const [canvas, ctx] = start(document.querySelector('canvas'), window.innerWidth, window.innerHeight)
  
  const grid_size = 10;
  const grid = [...Array(~~(canvas.height / grid_size) + 1)].map(() =>
  [...Array(~~(canvas.width / grid_size) + 1)].map(() => ({
    u: false, d: false, l: false, r: false,
  }))
);

const addHitomezashi = grid => {
  for (let i = 0; i < grid.length; i++) {
    const offset = ~~random(2);

    for (let j = offset; j < grid[i].length; j += 2) {
      grid[i][j].d = true;

      if (grid[i+1]) {
        grid[i+1][j].u = true;
      }
    }
  }

  for (let j = 0; j < grid[0].length; j++) {
    const offset = ~~random(2);

    for (let i = offset; i < grid.length; i += 2) {
      grid[i][j].r = true;

      if (grid[i][j+1]) {
        grid[i][j+1].l = true;
      }
    }
  }
};

const colorHitomezashi = grid => {
  const visited = new Set();
  const getSize = (x, y) => {
    if (x < 0 || y < 0 || 
        y >= grid.length || x >= grid[y].length ||
        visited.has(`${x} ${y}`)) {
      return 0;
    }

    let size = 0;
    visited.add(`${x} ${y}`);

    if (!grid[y][x].u) {
      size = max(size, getSize(x, y - 1));
    }
    if (!grid[y][x].d) {
      size = max(size, getSize(x, y + 1));
    }
    if (!grid[y][x].l) {
      size = max(size, getSize(x - 1, y));
    }
    if (!grid[y][x].r) {
      size = max(size, getSize(x + 1, y));
    }

    return size + 1;
  };

  const floodFill = (x, y, color) => {
    if (x < 0 || y < 0 ||
        y >= grid.length || x >= grid[y].length ||
        grid[y][x].color !== undefined) {
      return 0;
    }

    grid[y][x].color = color;

    if (!grid[y][x].u) {
      floodFill(x, y - 1, color);
    }
    if (!grid[y][x].d) {
      floodFill(x, y + 1, color);
    }
    if (!grid[y][x].l) {
      floodFill(x - 1, y, color);
    }
    if (!grid[y][x].r) {
      floodFill(x + 1, y, color);
    }
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const color = 180 - getSize(j, i);
      floodFill(j, i, color);
    }
  }

  addHitomezashi(grid);
  colorHitomezashi(grid);
};


function draw() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const y = i * grid_size + 0.5;
      const x = j * grid_size + 0.5;
      
      ctx.fillStyle = grid[i][j].color;
      console.log( grid[i][j].color)
      ctx.fillRect(x, y, grid_size + 1, grid_size + 1);

      // if (grid[i][j].u) {
      //   line(x, y, x + gridSize, y);
      // }
      // if (grid[i][j].d) {
      //   line(x, y + gridSize, x + gridSize, y + gridSize);
      // }
      // if (grid[i][j].l) {
      //   line(x, y, x, y + gridSize);
      // }
      // if (grid[i][j].r) {
      //   line(x + gridSize, y, x + gridSize, y + gridSize);
      // }
    }
  }
}

draw()
}

document.onload = main()