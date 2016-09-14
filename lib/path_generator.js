import BreadthFirst from './breadth_first.js';

class PathGenerator {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.color = [0, 0, 0];
    this.paths = [];
    this.cells = {};
    this.lineSegments = [];
    this.mode = "water";
    this.night = false;
    this.clear = this.clear.bind(this);

    let colorInput = document.getElementById('color');
    colorInput.addEventListener('change', (e) => {
      this.color = e.target.style.backgroundColor.match(/\d+/g).map((n) => parseInt(n));
    });

    this.sizeInput = document.getElementById('size');
    this.size = parseInt(this.sizeInput.value);
    this.sizeInput.addEventListener('change', (e) => {
      this.size = parseInt(e.target.value);
    });

    let images = document.querySelectorAll('.options > *');
    images.forEach((i) => {
      i.addEventListener('click', this.changeBackGround.bind(this));
    });

    let clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', this.clear);

    let modeChangeButton = document.getElementById('mode_img');
    modeChangeButton.addEventListener('click', this.modeChange.bind(this));

    this.canvas.addEventListener('click', this.clickHandler.bind(this));
    this.canvas.addEventListener('mousemove', this.dragHandler.bind(this));
    this.canvas.addEventListener('mouseup', this.mouseUpHandler.bind(this));
  }

  changeBackGround(e) {
    if (this.night && e.target.id !== "night" && window.confirm("Are you sure? To shift day mode, it will clear current canvas.")) {
      this.night = false;
      this.clear();
    }
    if (e.target.id === "default") {
      this.canvas.setAttribute('style', 'background-image: none; background-color: white');
    } else if (e.target.id === "night") {
      if (!this.night && window.confirm("Are you sure? To shift night mode, it will clear current canvas.")) {
        this.night = true;
        this.canvas.setAttribute('style', 'background-image: none; background-color: black');
        this.clear();
      }
    }else {
      this.canvas.setAttribute('style', `background-image: url(${e.target.src})`);
    }
  }

  modeChange(e) {
    if (this.mode === 'water') {
      this.mode = 'brush';
      e.target.src = "http://res.cloudinary.com/wkdal720/image/upload/v1473786825/brush_hmunvb.png";
      this.sizeInput.min = '2';
      this.sizeInput.max = '10';
      this.sizeInput.setAttribute('value', '5');
      this.size = 5;
    } else {
      this.mode = 'water';
      e.target.src = "http://res.cloudinary.com/wkdal720/image/upload/v1473786828/water_qnvczd.png";
      this.sizeInput.min = '100';
      this.sizeInput.max = '1000';
      this.sizeInput.setAttribute('value', '300');
      this.size = 300;
    }
  }

  mouseUpHandler(e) {
    if (this.mode === 'brush' && this.lineSegments.length > 1) {
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = this.size;
      this.ctx.strokeStyle = `rgb(${this.color.map(n=> parseInt(n)).join(", ")})`;
      this.ctx.beginPath();
      this.ctx.moveTo(this.lineSegments[0][0], this.lineSegments[0][1]);
      this.lineSegments.slice(1).forEach((l) => {
        this.ctx.lineTo(l[0], l[1]);
      });
      this.ctx.stroke();
      this.lineSegments = [];
    }
  }

  indexHelper(x, y) {
    return parseInt(x) + parseInt(y) * this.width;
  }

  clickHandler(e) {
    if (this.mode === 'water') {
      let sIdx = this.indexHelper(e.offsetX, e.offsetY);
      let breadthFirst = new BreadthFirst({
        color: this.color,
        width: this.width,
        height: this.height,
        startIdx: sIdx,
        size: this.size,
        cells: this.cells,
        night: this.night,
        ctx: this.ctx});
        this.paths.push(breadthFirst);
    } else {
      this.ctx.fillStyle = `rgb(${this.color.map(n=> parseInt(n)).join(", ")})`;
      this.ctx.fillRect(e.offsetX, e.offsetY, this.size, this.size);
      this.lineSegments = [];
    }
  }

  dragHandler(e) {
    if (e.button === 0 && e.buttons === 1) {
      if (this.mode === 'water') {
        let sIdx = this.indexHelper(e.offsetX, e.offsetY);
        let breadthFirst = new BreadthFirst({
          color: this.color,
          width: this.width,
          height: this.height,
          startIdx: sIdx,
          size: this.size,
          cells: this.cells,
          night: this.night,
          ctx: this.ctx});
          this.paths.push(breadthFirst);
        } else {
          this.lineSegments.push([e.offsetX, e.offsetY]);
          this.ctx.fillStyle = `rgb(${this.color.map(n=> parseInt(n)).join(", ")})`;
          this.ctx.fillRect(e.offsetX, e.offsetY, 1, 1);
        }
      }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paths.forEach((p) => p.clearInterval());
    this.cells = {};
    this.paths = [];
    this.lineSegments = [];
  }

}

export default PathGenerator;
