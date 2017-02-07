import WaterColor from './watercolor.js';
import setUpExample from './preloaded.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const saveCanvas = document.getElementById('save_canvas');
  canvas.width = Math.floor(window.innerWidth * 0.8);
  canvas.height = Math.floor(window.innerHeight * 0.8);
  saveCanvas.width = Math.floor(window.innerWidth * 0.8);
  saveCanvas.height = Math.floor(window.innerHeight * 0.8);

  const waterColor = new WaterColor();
  setUpExample(waterColor);
});
