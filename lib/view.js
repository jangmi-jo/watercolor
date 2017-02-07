import WaterColor from './watercolor.js';
import setUpExample from './preloaded.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const saveCanvas = document.getElementById('save_canvas');
  const width = window.innerWidth < 1500 ? Math.floor(window.innerWidth * 0.9) : 1000;
  const height = window.innerHeight < 900 ? Math.floor(window.innerHeight * 0.86) : 800;
  canvas.width = width;
  canvas.height = height;
  saveCanvas.width = width;
  saveCanvas.height = height;
  const waterColor = new WaterColor();
  setUpExample(waterColor);
});
