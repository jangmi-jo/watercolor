import Store from './store.js';
import CONSTANTS from './constant.js';

class BreadthFirst {
  constructor(data) {
    this.ctx = data.canvas.getContext("2d");
    this.width = data.canvas.width;
    this.height = data.canvas.height;
    this.cells = data.cells;
    this.size = data.size;
    this.color = data.color;
    this.startIdx = data.startIdx;
    this.night = data.night;

    this.dist = 0;
    this.segments = new Store();
    this.segmentNeighbors(this.startIdx);

    this.colorGap = this.color.map(c => {
      return this.night ? -c / this.size : (255 - c) / this.size;
    });

    if (!this.cells[this.startIdx]) {
      this.fillCell(this.startIdx);
    }

    this.interval = window.setInterval(this.onePixelProcess.bind(this), 10);
  }

  onePixelProcess() {
    if (this.segments.length === 0 || this.dist === this.size) {
      window.clearInterval(this.interval);
    }
    const randomSeg = this.segments.popRandom();
    this.fillCell(randomSeg);
    this.segmentNeighbors(randomSeg);
    this.color = this.color.map((c, i) => c + this.colorGap[i]);
  }

  segmentNeighbors(idx) {
    if (!this.isInline(idx)) { return; }
    let neighbors = [idx - this.width, idx + this.width, idx - 1, idx + 1];
    neighbors.forEach((n) => {
      if (n >= 0 && n < (this.width * this.height) && this.isOpen(n)) {
        this.segments.insert(n);
      }
    });
  }

  isInline(idx) {
    const x = idx % this.width;
    return x !== 0 && x !== this.width - 1;
  }

  isOpen(idx) {
    return !this.cells[idx] && !this.segments.has(idx);
  }

  fillCell(idx) {
    this.dist++;
    this.cells[idx] = true;
    this.ctx.fillStyle = CONSTANTS.rgb(this.color);
    const x = idx % this.width;
    const y = parseInt(idx / this.width);
    this.ctx.fillRect(x, y, 1, 1);
  }
}


export default BreadthFirst;
