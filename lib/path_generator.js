import BreathFirst from './breath_first.js';

class PathGenerator {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cells = new Array(this.width * this.height);
    this.speed = 0.01;
    this.color = [0, 0, 0];
    this.size = 50000;
    this.paths = [];

    this.canvas.addEventListener('click', this.clickHandler.bind(this));

    let colorInput = document.getElementById('color');
    colorInput.addEventListener('change', (e) => {
      this.color = e.target.style.backgroundColor.match(/\d+/g).map((n) => parseInt(n));
    });

    let sizeInput = document.getElementById('size');
    sizeInput.addEventListener('change', (e) => {
      this.size = parseInt(e.target.value);
    });

    let clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', this.clear.bind(this));

    let pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', this.pause.bind(this));

    let resumeButton = document.getElementById('resume');
    resumeButton.addEventListener('click', this.resume.bind(this));
  }

  indexHelper(x, y) {
    return parseInt(x) + parseInt(y) * this.width;
  }

  clickHandler(e) {
    let sIdx = this.indexHelper(e.offsetX, e.offsetY);

    if (this.cells[sIdx] === undefined) {
      let breathFirst = new BreathFirst({
        cells: this.cells,
        color: this.color,
        width: this.width,
        height: this.height,
        startIdx: sIdx,
        speed: this.speed,
        size: this.size,
        ctx: this.ctx});
        this.paths.push(breathFirst);
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
    this.paths = [];
  }

}

export default PathGenerator;
