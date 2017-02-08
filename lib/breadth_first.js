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
    this.colorGap = this.color.map(c => (255 - c) / this.size);

    this.segments = new Store();
    this.segmentNeighbors(data.pos);

    // don't color the start cell
    if (this.isOpenCell(data.pos)) {
      this.fillCell(data.pos);
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
    this.fillCell(randomSeg);
    this.segmentNeighbors(randomSeg);
    this.color = this.color.map((c, i) => c + this.colorGap[i]);
  }

  isOpenCell(pos) {
    const data = this.ctx.getImageData(pos[0], pos[1], 1, 1).data;
    return data.every((i) => i === 0);
  }

  segmentNeighbors(pos) {
    const [x, y] = pos;
    if (x === 0 || x === this.width - 1) { return; }
    const neighbors = [[x-1, y], [x+1, y], [x, y-1], [x, y+1]];
    neighbors.forEach((n) => {
      let str = n.join(' ');
      if (n[0] >= 0 && n[1] >= 0 &&
        n[0] < this.width && n[1] < this.height &&
        this.isOpenCell(n) && !this.segments.has(str)) {
        this.segments.insert(str);
      }
    });
  }

  fillCell(pos) {
    this.dist++;
    this.ctx.fillStyle = CONSTANTS.rgb(this.color);
    this.ctx.fillRect(pos[0], pos[1], 1, 1);
  }
}


export default BreadthFirst;
