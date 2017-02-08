import Store from './store.js';
import CONSTANTS from './constant.js';

class BreadthFirst {
  constructor(data) {
    this.ctx = data.canvas.getContext("2d");
    this.width = data.canvas.width;
    this.height = data.canvas.height;
    this.size = data.size;
    this.color = data.color;
    this.dist = 0;
    this.segments = new Store();
    this.segmentNeighbors(...data.pos);
    this.colorGap = this.color.map(c => (255 - c) / this.size);

    // don't color the start cell
    if (this.ctx.getImageData(...data.pos, 1, 1).data.every((i) => i === 0)) {
      this.fillCell(...data.pos);
    }

    this.interval = window.setInterval(this.onePixelProcess.bind(this), 10);
  }

  onePixelProcess() {
    if (this.segments.length === 0 || this.dist === this.size) {
      window.clearInterval(this.interval);
    }
    let randomSeg = this.segments.popRandom();
    if (!randomSeg) { return; }
    randomSeg = randomSeg.split(' ').map(Number);
    this.fillCell(...randomSeg);
    this.segmentNeighbors(...randomSeg);
    this.color = this.color.map((c, i) => c + this.colorGap[i]);
  }

  segmentNeighbors(x, y) {
    if (x === 0 || x === this.width - 1) { return; }
    let neighbors = [[x-1, y], [x+1, y], [x, y-1], [x, y+1]];
    neighbors.forEach((n) => {
      if (n[0] >= 0 && n[1] >= 0 &&
        n[0] < this.width && n[1] < this.height &&
        this.ctx.getImageData(n[0], n[1], 1, 1).data.every((i) => i === 0) && !this.segments.has(n.join(' '))) {
        this.segments.insert(n.join(' '));
      }
    });
  }

  fillCell(x, y) {
    this.dist++;
    this.ctx.fillStyle = CONSTANTS.rgb(this.color);
    this.ctx.fillRect(x, y, 1, 1);
  }
}


export default BreadthFirst;
