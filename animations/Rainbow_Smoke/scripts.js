"use strict";
import { start, random, clear, point } from "../functionalModules.js";

// Improvement from this solution https://github.com/DivyanshMittal-exe/Generative-Art/blob/main/RainbowSmoke/smoke.js

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function init() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    window.innerWidth,
    window.innerHeight,
    {
      antialias: false,
    }
  );

  // color scheme dependent of the screen size
  const tats = Math.floor(3 * Math.cbrt(canvas.width * canvas.height));

  // top right down left
  const moves = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ];

  const size = 2;
  const perCycle = 10000;

  // vector used to keep track of which colors were selected (so we don't get repeated ones)
  let colors_3d = [];
  for (let r = 0; r < tats; r++) {
    colors_3d[r] = [];
    for (let g = 0; g < tats; g++) {
      colors_3d[r][g] = [];
      for (let b = 0; b < tats; b++) {
        colors_3d[r][g][b] = false;
      }
    }
  }

  // vector used to keep track of which points are already filled
  let screen_points = [];
  for (let i = 0; i < canvas.width; i++) {
    screen_points[i] = [];
    for (let j = 0; j < canvas.height; j++) {
      screen_points[i][j] = 0;
    }
  }

  let x = Math.floor(canvas.width / 2);
  let y = Math.floor(canvas.height / 2);
  let r = Math.floor(random(1000)) % tats;
  let g = Math.floor(random(1000)) % tats;
  let b = Math.floor(random(1000)) % tats;

  // keeps track of all past moves, just like a walker (ex. used to create mazes)
  let stack = [];
  draw(0, 0, { x, y, r, g, b });

  // SIF, I really hate having to do this, I personally prefer python decorators
  (function animate() {
    const animation = requestAnimationFrame(animate);
    for (let i = 0; i < perCycle; i++) {
      if (stack.length > 0) draw_next();
      else {
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

      if (        r + red < tats &&
        r + red > 0 &&
        g + green < tats &&
        g + green > 0 &&
        b + blue < tats &&
        b + blue > 0) {
        // check if color has already been selected
        if (!colors_3d[r + red][g + green][b + blue]) {
          return [r + red, g + green, b + blue];
        } else {
          r += red;
          g += green;
          b += blue;
        }
      }
    }
  }

  function check_valid_color(r, g, b, red, green, blue) {
    if (
      r + red > tats ||
      r + red < 0 ||
      g + green > tats ||
      g + green < 0 ||
      b + blue > tats ||
      b + blue < 0
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
