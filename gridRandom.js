const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const count = 50;

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push([ u, v ]);
      }
    }
    return points;
  };

  random.setSeed(512);
  const points = createGrid().filter(() => random.value() > 0.4);
  const margin = 100;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 10, width, height);

    points.forEach(([ u, v ]) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, 25, 0, Math.PI * 2);
      context.fillStyle = 'black';
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);