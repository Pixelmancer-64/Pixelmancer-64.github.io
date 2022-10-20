"use strict";

// Inspired by the album unknown pleasures

// I used the following resources to help me code this audio visualizer:
// https://github.com/alexpasieka/Unknown-Visualizer
// https://github.com/venkat24/unknown-pleasures
// https://generativeartistry.com/tutorials/joy-division/

import { start, clear } from "../functionalModules.js";

function init() {
  const [canvas, ctx] = start(
    document.querySelector("canvas"),
    window.innerWidth,
    window.innerHeight,
    {
      antialias: false,
    }
  );

  const numSamples = 4096;
  const nFrequencies = 40;
  let lineAmount = numSamples / nFrequencies / 2;
  lineAmount -= parseInt(lineAmount / 3.5);

  const audioPlayer = document.getElementById("audio");
  const audioCtx = new AudioContext();
  const file = document.getElementById("file");

  let analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = numSamples;

  let animateStarted = Boolean;
  let animationFrame;

  let size = window.innerWidth;
  let dpr = window.devicePixelRatio;
  let data;

  canvas.width = size * dpr;
  canvas.height = size * dpr;

  ctx.scale(dpr, dpr);
  ctx.translate(0, canvas.height - (lineAmount * (lineAmount/2)))

  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  
  file.addEventListener("input", setInput);
  function setInput(e) {
    audioPlayer.src = URL.createObjectURL(this.files[0]);
  }

  audioPlayer.addEventListener("play", () => {
    // Cancelling the animationFrame in the start will prevent more than one animationFrame running at the same time if the music is unpaused
    cancelAnimationFrame(animationFrame);
    // If the animation has already started there is no need to bind the values and connect the analyserNode to the source
    if (!animateStarted) {
      animation();
      return;
    }

    setInput.bind(file)();
    let sourceNode = audioCtx.createMediaElementSource(audioPlayer);
    sourceNode.connect(analyserNode);
    analyserNode.connect(audioCtx.destination);
    data = new Uint8Array(analyserNode.frequencyBinCount);

    animation();
    animateStarted = !animateStarted;
  });

  function animation() {
    // data does not need to be called every frameElement, but it does need to be analyzed. No need to create the Uint8Array again
    analyserNode.getByteFrequencyData(data);
    animationFrame = requestAnimationFrame(animation);
    clear(ctx, canvas);


    // The problem with the drawing solution to this animation is the need of creating the entire array (consuming memory) before starting drawing. This create the need for a second loop in the end of this function, consuming more processing power
    let lines = [];
    for (let i = 0; i <= lineAmount; i++) {
      let line = [];
      for (let j = 0; j <= lineAmount; j++) {
        let distCenter = Math.abs(j * nFrequencies - size / 2);
        // You can use map here too, but I found Math.max a cool solution
        let variance = Math.max(size / 2 - 100 - distCenter, 0);
        let offset = ((data[i * nFrequencies + j] * variance) / 2) * -0.007;
        line.push({
          x: j * nFrequencies,
          y: i * (lineAmount * 0.5) + offset,
        });
      }
      lines.push(line);
    }

  // All credit of the drawing goes to this tutorial: https://generativeartistry.com/tutorials/joy-division/
  // The globalCompositionOperation is very powerful, o hope I can use it in some other projects 
    for (var i = 0; i < lines.length; i++) {
      ctx.beginPath();
      ctx.moveTo(lines[i][0].x, lines[i][0].y);

      for (var j = 0; j < lines[i].length - 2; j++) {
        var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
        var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
        ctx.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
      }

      ctx.quadraticCurveTo(
        lines[i][j].x,
        lines[i][j].y,
        lines[i][j + 1].x,
        lines[i][j + 1].y
      );
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fill();
      ctx.restore();
      ctx.stroke();
    }
  }
}

window.onload = init;
