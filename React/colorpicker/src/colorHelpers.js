import chroma from "chroma-js";

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starter) {
  const { id, paletteName, colors } = starter;
  let newPalette = {
    id,
    paletteName,
    colors: {},
  };

  for (let level of levels) {
    newPalette.colors[level] = [];
  }

  for (let color of colors) {
    const scale = generateScale(color.color, 10).reverse();
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i]).css().replace("rgb", "rgba").replace(")", ",1)"),
        hsl: chroma(scale[i]).css("hsl"),
      });
    }
  }
  return newPalette;
}

function getRange(hex) {
  return [chroma(hex).darken(1.4).hex(), hex, "#fff"];
}

function generateScale(hex, num) {
  return chroma.scale(getRange(hex)).mode("lab").colors(num);
}

export { generatePalette };
