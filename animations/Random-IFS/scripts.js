// Set up the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Set the number of iterations and the maximum number of transformations
const iterations = 10000;
const maxTransformations = 500000;

// Set up the array to store the transformation matrices
const transformations = [];
// Generate random transformation matrices and store them in the transformations array
for (let i = 0; i < maxTransformations; i++) {
  // Generate random values for the transformation matrix
  const a = Math.random()  ;
  const b = Math.random()  ;
  const c = Math.random()  ;
  const d = Math.random() ;
  const e = Math.random() ;
  const f = Math.random() ;

  // Create a new transformation matrix using the random values
  const transformation = [a, b, c, d, e, f];

  // Add the transformation matrix to the transformations array
  transformations.push(transformation);
}

// Set the starting point for the IFS
let x = 0;
let y = 0;

// Iteratively apply the transformations and draw the resulting points on the canvas
for (let i = 0; i < iterations; i++) {
  // Choose a random transformation from the transformations array
  const transformation = transformations[Math.floor(Math.random() * maxTransformations)];

  // Apply the transformation to the current point
  ctx.beginPath();
  ctx.moveTo(x, y)
  const newX = transformation[0] * x + transformation[1] * y + transformation[4];
  const newY = transformation[2] * x + transformation[3] * y + transformation[5];
  x = newX;
  y = newY;

  // Draw the resulting point on the canvas
  ctx.lineTo(x, y)
  ctx.stroke()
  ctx.arc(x, y, 1, 0, 2 * Math.PI);
  ctx.fill();
}