import WaterColor from './watercolor.js';
import setUpExample from './preloaded.js';
import setUpBackground from './background.js';

document.addEventListener('DOMContentLoaded', () => {
  const waterColor = new WaterColor();
  setUpExample(waterColor);
  setUpBackground(waterColor);
});
