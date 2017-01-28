import BreadthFirst from './breadth_first.js';
import CONSTANTS from './constant.js';

class WaterColor {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.color = CONSTANTS.INITIAL_COLOR;
    this.size = Number(CONSTANTS.WATER_INPUT_SIZE[2]);
    this.paths = [];
    this.cells = [];
    this.mode = "water";
    this.night = false;
    this.exampleOn = true;

    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.strokeStyle = CONSTANTS.rgb(this.color);

    this.setUpBackground();
    this.colorChangeHandler();
    this.sizeChangeHandler();
    this.setUpButtonInterface();

    this.canvas.addEventListener('click', this.clickHandler.bind(this));
    this.canvas.addEventListener('mousemove', this.dragHandler.bind(this));
    this.canvas.addEventListener('mouseup', this.mouseUpHandler.bind(this));
    this.canvas.addEventListener('mousedown', this.mouseDownHandler.bind(this));
  }

  setUpBackground() {
    const background = document.getElementById('background');
    background.addEventListener('load', () => {
      this.ctx.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
    });

    const images = document.querySelectorAll('.options > *');
    images.forEach((image) => {
      image.addEventListener('click', (e) => {
        if (this.clear()) {
          background.setAttribute('src', e.target.src);
          this.night = e.target.classList[0] === 'night';
        }
      });
    });
  }

  setUpButtonInterface() {
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', this.clear.bind(this));

    const modeChangeButton = document.getElementById('mode_img');
    modeChangeButton.addEventListener('click', this.modeChange.bind(this));

    const download = document.getElementById('save');
    download.addEventListener('click', () => {
      download.setAttribute('href', this.canvas.toDataURL('png'));
    });
  }

  sizeChangeHandler() {
    this.sizeInput = document.getElementById('size');
    this.sizeInput.addEventListener('change', (e) => {
      this.size = parseInt(e.target.value);
      this.ctx.lineWidth = this.size;
    });
  }

  colorChangeHandler() {
    const colorInput = document.getElementById('color');
    colorInput.addEventListener('change', (e) => {
      this.color = e.target.style.backgroundColor.match(/\d+/g).map((n) => parseInt(n));
      this.ctx.strokeStyle = CONSTANTS.rgb(this.color);
    });
  }

  modeHelper(mode, src, sizeInfo, target) {
    this.mode = mode;
    target.src = src;
    this.sizeInput.min = sizeInfo[0];
    this.sizeInput.max = sizeInfo[1];
    this.sizeInput.setAttribute('value', sizeInfo[2]);
    this.size = Number(sizeInfo[2]);
  }

  modeChange(e) {
    if (this.mode === 'water') {
      this.modeHelper('brush', CONSTANTS.BRUSH_IMG,
        CONSTANTS.BRUSH_INPUT_SIZE, e.target);
    } else {
      this.modeHelper('water', CONSTANTS.WATER_IMG,
        CONSTANTS.WATER_INPUT_SIZE, e.target);
    }
  }

  mouseDownHandler(e) {
    if (this.mode === 'brush') {
      this.ctx.beginPath();
      this.ctx.moveTo(e.offsetX, e.offsetY);
    }
  }

  mouseUpHandler(e) {
    if (this.mode === 'brush') {
      this.ctx.closePath();
    }
  }

  indexHelper(x, y) {
    return parseInt(x) + parseInt(y) * this.canvas.width;
  }

  waterColorDrop(e) {
    const sIdx = this.indexHelper(e.offsetX, e.offsetY);
    const breadthFirst = new BreadthFirst({
      canvas: this.canvas,
      color: this.color,
      startIdx: sIdx,
      size: this.size,
      cells: this.cells,
      night: this.night
    });
    this.paths.push(breadthFirst);
  }

  clickHandler(e) {
    if (this.mode === 'water') {
      this.waterColorDrop(e);
    } else {
      this.ctx.beginPath();
      this.ctx.ellipse(e.offsetX, e.offsetY, this.size / 10, this.size / 10, 45 * Math.PI/180, 0, 2 * Math.PI);
      this.ctx.stroke();
    }
  }

  dragHandler(e) {
    if (e.button === 0 && e.buttons === 1) {
      if (this.mode === 'water') {
        this.waterColorDrop(e);
      } else {
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
      }
    }
  }

  clear() {
    if (window.confirm("Are you sure? All the things on the canvas will be gone!")) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.paths.forEach((p) => window.clearInterval(p.interval));
      this.cells = [];
      this.paths = [];
      this.night = false;
      this.exampleOn = false;
      return true;
    }
  }
}

export default WaterColor;
