import BreadthFirst from './breadth_first.js';
import DepthFirst from './depth_first.js';

class PathGenerator {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.speed = 0.01;
    this.color = [0, 0, 0];
    this.paths = [];
    this.cells = {};
    this.mode = "water";
    this.line = [];

    let colorInput = document.getElementById('color');
    colorInput.addEventListener('change', (e) => {
      this.color = e.target.style.backgroundColor.match(/\d+/g).map((n) => parseInt(n));
    });

    let sizeInput = document.getElementById('size');
    this.size = parseInt(sizeInput.value);
    sizeInput.addEventListener('change', (e) => {
      this.size = parseInt(e.target.value);
    });

    let clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', this.clear.bind(this));

    let pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', this.pause.bind(this));

    let resumeButton = document.getElementById('resume');
    resumeButton.addEventListener('click', this.resume.bind(this));

    let waterColorButton = document.getElementById('water');
    waterColorButton.addEventListener('click', () => {this.mode = 'water';});

    let brushButton = document.getElementById('brush');
    brushButton.addEventListener('click', () => {this.mode = 'brush';});

    // this.clickHandler = this.clickHandler.bind(this);
    this.brushDragHandler = this.brushDragHandler.bind(this);

    this.waterColorDragHandler = this.waterColorDragHandler.bind(this);
    this.waterColorClickHandler = this.waterColorClickHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);

    this.canvas.addEventListener('click', this.waterColorClickHandler);
    this.canvas.addEventListener('mousemove', this.waterColorDragHandler);
    this.canvas.addEventListener('mouseup', this.mouseUpHandler);

    // this.canvas.addEventListener('mousemove', this.brushDragHandler);
    // this.canvas.addEventListener('mouseup', this.mouseUpHandler.bind(this));
  }

  mouseUpHandler(e) {
    this.ctx.lineJoin = "round";
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = `rgb(${this.color.map(n=> parseInt(n)).join(", ")})`;
    this.ctx.beginPath();
    this.ctx.moveTo(this.line[0][0], this.line[0][1]);
    this.line.slice(1).forEach((l) => {
      this.ctx.lineTo(l[0], l[1]);
    });
    this.ctx.stroke();
    this.line = [];
  }

  brushDragHandler(e) {
    if (e.button === 0 && e.buttons === 1) {
      this.line.push([e.offsetX, e.offsetY]);
      this.ctx.fillStyle = `rgb(${this.color.map(n=> parseInt(n)).join(", ")})`;
      this.ctx.fillRect(e.offsetX, e.offsetY, 2, 2);
    }
  }

  indexHelper(x, y) {
    return parseInt(x) + parseInt(y) * this.width;
  }

  waterColorClickHandler(e) {
    let sIdx = this.indexHelper(e.offsetX, e.offsetY);
    // console.log(`${e.offsetX}, ${e.offsetY}`);
    let breadthFirst = new BreadthFirst({
      color: this.color,
      width: this.width,
      height: this.height,
      startIdx: sIdx,
      speed: this.speed,
      size: this.size,
      cells: this.cells,
      ctx: this.ctx});
      this.paths.push(breadthFirst);
  }

  waterColorDragHandler(e) {
    if (e.button === 0 && e.buttons === 1) {
      let sIdx = this.indexHelper(e.offsetX, e.offsetY);
      // console.log(`${e.offsetX}, ${e.offsetY}`);
      let breadthFirst = new BreadthFirst({
        color: this.color,
        width: this.width,
        height: this.height,
        startIdx: sIdx,
        speed: this.speed,
        size: this.size,
        cells: this.cells,
        ctx: this.ctx});
        this.paths.push(breadthFirst);
      }
  }

  pause(e) {
    e.preventDefault();
    this.paths.forEach((p) => window.clearInterval(p.interval));
  }

  resume(e) {
    e.preventDefault();
    this.paths.forEach((p) => p.resumeInterval());
  }

  clear(e) {
    e.preventDefault();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.cells = new Array(this.canvas.width * this.canvas.height);
    this.paths.forEach((p) => window.clearInterval(p.interval));
    this.cells = {};
    this.paths = [];
    this.line = [];
  }

}

export default PathGenerator;
