import WaterColor from './watercolor.js';
import setUpExample from './preloaded.js';
import { setUpBackground, setUpDownload } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const waterColor = new WaterColor();
  setUpExample(waterColor);
  setUpBackground(waterColor);
  setUpDownload(waterColor);
});
