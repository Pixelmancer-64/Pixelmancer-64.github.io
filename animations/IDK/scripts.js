class myCanvas extends Canvas{
  init(){
   this.animation(1, ()=>{
    new Square(100, 100, "green", {
      x: 0,
      y: 0
    }).fill();
   })
  }
}

window.onload = function () {
  let canvas = new myCanvas();
  // canvas.startEvents();
  canvas.init();
};