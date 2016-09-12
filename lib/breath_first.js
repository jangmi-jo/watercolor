
class BreathFirst {
  constructor(data) {
    this.width = data.width;
    this.height = data.height;
    this.cells = data.cells;
    this.dist = 0;
    this.startIdx = data.startIdx;
    this.segments = [];
    this.ctx = data.ctx;
    this.size = data.size;
    this.color = data.color;
    this.colorGap = this.color.map(c => this.colorGapGenerator(c));
    this.speed = data.speed;

    this.cells[this.startIdx] = this.dist;
    this.fillCell(this.startIdx);
    this.segmentNeighbors(this.startIdx);

    this.interval = window.setInterval(this.onePixelProcess.bind(this), this.speed);

  }

  resumeInterval() {
    if (this.segments.length) {
      this.interval = window.setInterval(this.onePixelProcess, this.speed);
    }
  }

  colorGapGenerator(c) {
    return (255 - c) / this.size;
  }

  onePixelProcess() {
    if (this.segments.length === 0) {
      window.clearInterval(this.interval);
    }
    let randomSeg = this.popRandomSegment();
    this.fillCell(randomSeg);
    this.segmentNeighbors(randomSeg);
    this.color = this.color.map((c, i) => c + this.colorGap[i]);
  }

  segmentNeighbors(idx) {
    let neighbors = [idx - this.width, idx + this.width, idx - 1, idx + 1];
    neighbors = neighbors.filter((i) => {
      return i >= 0 && this.isInline(i) && i < (this.width * this.height) && this.isOpen(i);
    });
    neighbors.forEach((n) => this.segments.push(n));
  }

  isInline(idx) {
    return idx % this.width !== 0;
  }

  isOpen(idx) {
    return this.cells[idx] === undefined && !this.segments.includes(idx);
  }

  popRandomSegment() {
    let segments = this.segments;
    let length = segments.length;
    let i = Math.floor(Math.random() * length);
    return segments.splice(i, 1)[0];
  }

  fillCell(idx) {
    this.dist += 1;
    this.cells[idx] = this.dist;

    this.ctx.fillStyle = `rgb(${this.color.map(c => parseInt(c)).join(", ")})`;
    this.ctx.fillRect(idx % this.width, parseInt(idx / this.width), 1, 1);

    if (this.dist === this.size) {
      window.clearInterval(this.interval);
    }
  }
}


export default BreathFirst;
