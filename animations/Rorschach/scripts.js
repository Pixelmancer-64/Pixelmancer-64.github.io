import {
  random_color
} from "../functionalModules.js";

function generateRandomShape(ctx, width, height) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
}

function generateRandomRorschach(ctx, width, height) {
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.random()})`;
    generateRandomShape(ctx, width, height);
    ctx.fill();
  }
}

// function generateRandomShape(canvasWidth, canvasHeight) {
//   // Choose a random shape type (circle, square, or triangle)
//   const shapeTypes = ["circle", "square", "triangle"];
//   const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
//   const color = random_color();

//   // Generate random dimensions and position for the shape
//   const shapeWidth = Math.floor((Math.random() * (canvasWidth / 3)));
//   const shapeHeight = Math.floor((Math.random() * (canvasHeight / 3)));
//   const shapeX = Math.floor(Math.random() * (canvasWidth - shapeWidth));
//   const shapeY = Math.floor(Math.random() * (canvasHeight - shapeHeight));

//   // Generate random rotation angle
//   const rotation = Math.random() * 360; // random angle between 0 and 360 degrees

//   // Create the shape

//   console.log(shapeX, canvasWidth)
//   const shape = {
//     left: shapeX - shapeWidth,
//     top: shapeY - shapeHeight,
//     angle: rotation,
//     color,
//   };

//   if (shapeType === 0) {
//     shape.type = "circle"

//   } else if (shapeType === 1) {
//     // Square
//       shape.width= Math.random() * 100 + 100
//       shape.height= Math.random() * 100 + 100
//       shape.type= "rect"
//   } else {
//     // Triangle
//       shape.width= Math.random() * 100 + 100
//       shape.height= Math.random() * 100 + 100
//       shape.type= "triangle"
//   }

//   return shape;
// }

// function draw_shape(ctx, shape) {
//   console.log(shape)
//   ctx.fillStyle = shape.color;
//   ctx.save()
//   ctx.rotate(shape.angle)

//   // Draw the shape
//   if (shape.type === "circle") {
//     ctx.beginPath();
//     ctx.arc(
//       shape.left + shape.width / 2,
//       shape.top + shape.height / 2,
//       shape.width / 2,
//       0,
//       2 * Math.PI
//     );
//     ctx.fill();
//   } else if (shape.type === "square") {
//     ctx.fillRect(shape.left, shape.top, shape.width, shape.height);
//   } else if (shape.type === "triangle") {

//     ctx.beginPath();
//     ctx.moveTo(shape.left + shape.width / 2, shape.top);
//     ctx.lineTo(shape.left, shape.top + shape.height);
//     ctx.lineTo(shape.left + shape.width, shape.top + shape.height);
//     ctx.closePath();
//     ctx.fill();
//   }

//   ctx.restore()
// }

const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

generateRandomRorschach(ctx, canvas.width, canvas.height);
