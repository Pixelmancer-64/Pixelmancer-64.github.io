function random_rgb(offset = 0) {
  let mult = 255 - offset;
  let r = Math.floor(Math.random() * mult + offset);
  let g = Math.floor(Math.random() * mult + offset);
  let b = Math.floor(Math.random() * mult + offset);
  return {
    r: r,
    g: g,
    b: b,
  };
}

function random_color(num) {
  let aux = [];
  for (let i = 0; i < num; i++) {
    aux.push(random_rgb());
  }
  return aux;
}

function gradientColors(color, num) {
  let aux = [];
  for (let i = 0; i < num; i++) {
    aux.push({
      r: color.r + i,
      g: color.g + i,
      b: color.b + i,
    });
  }
  return aux;
}

function random(r, hasNegativeRange = false) {
  if (hasNegativeRange) {
    return Math.random() * r * (Math.round(Math.random()) ? 1 : -1);
  } else return Math.random() * r;
}

function usableColor(color, alpha = 1) {
  return `rgba(${color.r},${color.g},${color.b}, ${alpha})`;
}

function map(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
