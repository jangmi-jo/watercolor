import BreathFirst from './breath_first.js';

class PathGenerator {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext("2d");
    this.cells = this.makeGrid();
    this.sec = 0.1;

    this.paths = [];
    this.clickHandler = this.clickHandler.bind(this);
    this.canvas.addEventListener('click', this.clickHandler);

    this.clearButton = document.getElementById('clear');
    this.clearButton.addEventListener('click', this.clear.bind(this));

    this.pauseButton = document.getElementById('pause');
    this.pauseButton.addEventListener('click', this.pause.bind(this));

    this.resumeButton = document.getElementById('resume');
    this.resumeButton.addEventListener('click', this.resume.bind(this));
  }

  pause() {
    this.paths.forEach((p) => window.clearInterval(p.interval));
  }

  resume() {
    this.paths.forEach((p) => p.resumeInterval());
  }

  clear() {
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
    let breathFirst = new BreathFirst({
      cells: this.cells,
      width: e.target.clientWidth,
      height: e.target.clientHeight,
      startX: e.offsetX,
      startY: e.offsetY,
      sec: this.sec,
      ctx: this.ctx});
    this.paths.push(breathFirst);
  }

}

export default PathGenerator;
