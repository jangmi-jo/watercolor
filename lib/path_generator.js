import BreathFirst from './breath_first.js';

class PathGenerator {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext("2d");
    this.cells = this.makeGrid();
    this.speed = 0.01;

    this.paths = [];
    this.clickHandler = this.clickHandler.bind(this);
    this.canvas.addEventListener('click', this.clickHandler);

    this.color = [0, 0, 0];

    this.colorInput = document.getElementById('color');
    this.colorInput.addEventListener('change', (e) => {
      this.color = e.target.style.backgroundColor.match(/\d+/g).map((n) => parseInt(n));
    });

    this.clearButton = document.getElementById('clear');
    this.clearButton.addEventListener('click', this.clear.bind(this));

    this.pauseButton = document.getElementById('pause');
    this.pauseButton.addEventListener('click', this.pause.bind(this));

    this.resumeButton = document.getElementById('resume');
    this.resumeButton.addEventListener('click', this.resume.bind(this));
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
    this.cells = this.makeGrid();
    this.paths.forEach((p) => window.clearInterval(p.interval));
    this.paths = [];
  }

  makeGrid() {
    let grid = [];
    for (let r=0; r < this.canvas.height; r++) {
      let row = [];
      for (let c=0; c < this.canvas.width; c++) {
        row.push(undefined);
      }
      grid.push(row);
    }
    return grid;
  }

  clickHandler(e) {
    if (this.cells[e.offsetY][e.offsetX] === undefined) {
      let breathFirst = new BreathFirst({
        cells: this.cells,
        color: this.color,
        width: e.target.clientWidth,
        height: e.target.clientHeight,
        startX: e.offsetX,
        startY: e.offsetY,
        speed: this.speed,
        ctx: this.ctx});
        this.paths.push(breathFirst);
    }
  }

}

export default PathGenerator;
