
class BreadthFirst {
  constructor(data) {
    this.ctx = data.ctx;
    this.width = data.width;
    this.height = data.height;
    this.cells = data.cells;
    this.size = data.size;
    this.color = data.color;
    this.startIdx = data.startIdx;
    this.night = data.night;

    this.dist = 0;
    this.segments = [];
    this.colorGap = this.color.map(c => this.colorGapGenerator(c));
    this.onePixelProcess = this.onePixelProcess.bind(this);

    if (!this.cells[this.startIdx]) {
      this.fillCell(this.startIdx);
    }
    this.segmentNeighbors(this.startIdx);

    this.interval = window.setInterval(this.onePixelProcess, 10);
    this.clearInterval = this.clearInterval.bind(this);
  }

  clearInterval() {
    window.clearInterval(this.interval);
  }

  colorGapGenerator(c) {
    return this.night ? c / this.size : (255 - c) / this.size;
  }

  onePixelProcess() {
    if (this.segments.length === 0) {
      this.clearInterval();
    }
    let randomSeg = this.popRandomSegment();
    this.fillCell(randomSeg);
    this.segmentNeighbors(randomSeg);
    this.color = this.color.map((c, i) => {
      return this.night ? c - this.colorGap[i] : c + this.colorGap[i];
    });
  }

  segmentNeighbors(idx) {
    let neighbors = [idx - this.width, idx + this.width, idx - 1, idx + 1];
    neighbors = neighbors.filter((i) => {
      return (i >= 0 &&
              i < (this.width * this.height) &&
              this.isInline(idx) &&
              this.isOpen(i));
    });
    neighbors.forEach((n) => this.segments.push(n));
  }

  isInline(idx) {
    return idx % this.width !== 0 && idx % this.width !== this.width - 1;
  }

  isOpen(idx) {
    return !this.cells[idx] && !this.segments.includes(idx);
  }

  popRandomSegment() {
    let idx = Math.floor(Math.random() * this.segments.length);
    return this.segments.splice(idx, 1)[0];
  }

  fillCell(idx) {
    this.dist += 1;
    this.cells[idx] = true;
    this.ctx.fillStyle = `rgb(${this.color.map(n=> parseInt(n)).join(", ")})`;
    let x = idx % this.width,
        y = parseInt(idx / this.width);
    this.ctx.fillRect(x, y, 1, 1);
    if (this.dist === this.size) {
      this.clearInterval();
    }
  }
}


export default BreadthFirst;
