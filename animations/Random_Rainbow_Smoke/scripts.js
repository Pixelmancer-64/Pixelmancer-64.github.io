"use strict";
import { start, random } from "../functionalModules.js";

// Improvement from this solution https://github.com/DivyanshMittal-exe/Generative-Art/blob/main/RainbowSmoke/smoke.js

function init() {
  const begin = performance.now();

  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    window.innerWidth,
    window.innerHeight,
    {
      antialias: false,
    }
  );

  const color_space =  255;
  // top right down left
  const moves = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ];

  const size = 2;
  const perCycle = 10000;

  // keeps track of all past moves, just like a walker (ex. used to create mazes)
  let stack = [];

  // vector used to keep track of which colors were selected (so we don't get repeated ones)
  let colors_3d = [];
  for (let r = 0; r < color_space; r++) {
    colors_3d[r] = [];
    for (let g = 0; g < color_space; g++) {
      colors_3d[r][g] = [];
      for (let b = 0; b < color_space; b++) {
        colors_3d[r][g][b] = false;
      }
    }
  }

  // vector used to keep track of which points are already filled
  let screen_points = [];
  for (let i = 0; i < canvas.width; i++) {
    screen_points[i] = [];
    for (let j = 0; j < canvas.height; j++) {
      screen_points[i][j] = false;
    }
  }

  const [r, g, b] = get_next_color(255, 255, 255);
  draw(0, 0, {
    x: Math.floor(canvas.width / 2),
    y: Math.floor(canvas.height / 2),
    r,
    g,
    b,
  });

  // SIF, I really hate having to do this, I personally prefer python decorators
  (function animate() {
    const animation = requestAnimationFrame(animate);
    for (let i = 0; i < perCycle; i++) {
      if (stack.length) draw_next();
      else {
        console.log(`${(performance.now() - begin) / 1000} seconds`)
        cancelAnimationFrame(animation);
        return;
      }
    }
  })();

  function get_next_color(r, g, b) {
    while (true) {
      // (Math.floor(random(3)) % 3) - 1;
      // the remainder of 3 can only be 0, 1 or 2. Therefore, subtracting -1 from the random value will result in -1, 0 or 1
      // I prefer using my own random solution, basically the same as p5.js

      // random(-1, 2) will generate a float between -1 and 1 (the second argument is non including)
      let red = Math.floor(random(-1, 2));
      let green = Math.floor(random(-1, 2));
      let blue = Math.floor(random(-1, 2));

      if (check_valid_color(r, g, b, red, green, blue)) {
        // check if color has already been selected
        if (!colors_3d[r + red][g + green][b + blue])
          return [r + red, g + green, b + blue];

        r += red;
        g += green;
        b += blue;
      }
    }
  }

  function check_valid_color(r, g, b, red, green, blue) {
    if (
      r + red >= color_space ||
      r + red <= 0 ||
      g + green >= color_space ||
      g + green <= 0 ||
      b + blue >= color_space ||
      b + blue <= 0
    )
      return false;

    return true;
  }

  function draw(x, y, current) {
    ctx.beginPath();
    const [new_x, new_y] = [current.x + x, current.y + y];
    screen_points[new_x][new_y] = true;
    colors_3d[current.r][current.g][current.b] = true;
    const [r, g, b] = get_next_color(current.r, current.g, current.b);
    ctx.fillStyle = `rgba(${r},${g},${b},255)`;
    ctx.fillRect(current.x, current.y, size, size);
    stack.push({
      x: new_x,
      y: new_y,
      r,
      g,
      b,
    });
  }

  function check_valid_grid(x, y) {
    if (
      x < 0 ||
      x > canvas.width - 1 ||
      y < 0 ||
      y > canvas.height - 1 ||
      screen_points[x][y]
    )
      return false;

    return true;
  }

  function check_valid_moves(x, y) {
    return moves.filter((option) => {
      if (check_valid_grid(x + option.x, y + option.y)) {
        return option;
      }
    });
  }

  function draw_next() {
    let current = stack[stack.length - 1];
    const valid_moves = check_valid_moves(current.x, current.y);
    if (valid_moves.length) {
      const move = valid_moves[Math.floor(random(valid_moves.length))];
      draw(move.x, move.y, current);
    } else stack.pop();
  }
}

window.onload = init;
