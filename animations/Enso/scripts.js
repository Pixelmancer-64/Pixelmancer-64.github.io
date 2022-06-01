// import Canvas from "../canvas_assistant/Canvas"
class myCanvas extends Canvas {
  constructor(...args){
    super(...args)
    Canvas.ctx.strokeStyle = 'rgba(31 , 31, 31, 1)';
    Canvas.ctx.lineWidth = 3
    this.start = Random.randomFloat(2)

  }
  drawCallback() {
    const offsetX = Random.randomFloat(50, true)
    const offsetY = Random.randomFloat(50, true)
    
    const radiusOffsetX = Random.randomFloat(.8)
    const radiusOffsetY = Random.randomFloat(.8)

    Canvas.ctx.beginPath()
    Canvas.ctx.arc(
      Canvas.middle.x + offsetX,
      Canvas.middle.y + offsetY,
      Canvas.width / 3,
      Math.PI/this.start + radiusOffsetX,
      Math.PI * Random.randomFloat(.2) + radiusOffsetY,
      false
    );
    Canvas.ctx.stroke();
  }
}

window.onload = () => {
  const canvas = new myCanvas(document.querySelector("canvas"), 1, false, Random.randomInt(500));
  canvas.draw();
};
