import { blueFlower, pinkFlower, leaves } from './recorded.js';

function* PointGenerator(recorded, top, left) {
  for (let i=0; i<recorded.length; i++) {
    let move = new MouseEvent('mousemove', {
      button: 0, buttons: 1,
      clientX: recorded[i][0] + left, clientY: recorded[i][1] + top
    });
    yield move;
  }
}

function* ExampleGenerator(waterColor, top, left) {
  const records = [blueFlower, pinkFlower, leaves];
  const colors = [[35, 36, 255], [255, 114, 223], [19, 174, 49]];
  for (let i=0; i<records.length; i++) {
    waterColor.color = colors[i];
    yield* PointGenerator(records[i], top, left);
  }
}

const setUpExample = (waterColor) => {
  const top = Math.floor(window.innerHeight * 0.09);
  const left = Math.floor(window.innerWidth * 0.05);
  const example = ExampleGenerator(waterColor, top, left);
  const interval = window.setInterval(() => {
    let point = example.next();
    if (point.done || !waterColor.exampleOn) {
      window.clearInterval(interval);
    } else {
      waterColor.canvas.dispatchEvent(point.value);
    }
  }, 10);
};

export default setUpExample;
