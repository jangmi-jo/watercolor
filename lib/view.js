import WaterColor from './watercolor.js';
import setUpExample from './preload.js';

document.addEventListener('DOMContentLoaded', () => {
  setUpCanvas();
  const waterColor = new WaterColor();
  // for IE and Edge fallback
  detectIE(waterColor);
  if (new MouseEvent('mousemove').buttons !== undefined) {
    // for safari fallback and avoid example error
    setUpExample(waterColor);
  }
});

const detectIE = (waterColor) => {
  const isIE = /*@cc_on!@*/false || Boolean(document.documentMode);
  const isEdge = !isIE && Boolean(window.StyleMedia);
  if (isIE || isEdge) {
    document.getElementById('save').style.display = "none";
    waterColor.unableToDownload = true;
  }
};

const setUpCanvas = () => {
  const canvas = document.getElementById('canvas');
  const saveCanvas = document.getElementById('save_canvas');
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const canvasW = winW > 1500 ? 1400 : Math.floor(winW * 0.9);
  const canvasH = winH > 900 ? 900 : Math.floor(winH * 0.86);

  canvas.style.marginLeft = `${Math.floor(winW * 0.05)}px`;
  canvas.width = canvasW;
  canvas.height = canvasH;
  saveCanvas.width = canvasW;
  saveCanvas.height = canvasH;
};
