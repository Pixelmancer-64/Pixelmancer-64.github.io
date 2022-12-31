// Set up the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the dimensions of the canvas
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;

// Set the number of columns and rows in the noise grid
const cols = 100;
const rows = 100;

// Set the size of each cell in the noise grid
const cellWidth = canvas.width / cols;
const cellHeight = canvas.height / rows;

// Create a 2D array to store the noise values
const noise = [];
for (let i = 0; i < rows; i++) {
  noise[i] = [];
}

// Set the initial noise values to random numbers
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    noise[i][j] = Math.random();
  }
}

// Set the rate at which the noise values change
const noiseStep = 0.01;

// Set the maximum and minimum noise values
const noiseMin = 0;
const noiseMax = 1;

// Set the colors to use for the noise visualization
const colors = [  '#FFFFFF',  '#CCCCCC',  '#999999',  '#666666',  '#333333',  '#000000',];

// Animate the noise visualization
function animation(){
requestAnimationFrame(animation)

// Update the noise values
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      noise[i][j] += noiseStep;
      if (noise[i][j] > noiseMax) {
        noise[i][j] = noiseMin;
      }
    }
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the noise visualization
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Calculate the color index based on the noise value
      const colorIndex = Math.floor(colors.length * noise[i][j]);
      ctx.fillStyle = colors[colorIndex];
      ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
    }
  }
}
animation()
