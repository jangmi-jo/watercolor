
class BreathFirst {
  constructor(data) {
    this.width = data.width;
    this.height = data.height;
    this.cells = data.cells;
    this.dist = 0;
    this.startPos = [parseInt(data.startX), parseInt(data.startY)];
    this.segments = [];
    this.ctx = data.ctx;
    this.size = 50000;
    this.color = data.color;
    this.colorGap = this.color.map(c => this.colorGapGenerator(c));
    this.speed = data.speed;

    this.onePixelProcess = this.onePixelProcess.bind(this);
    this.interval = window.setInterval(this.onePixelProcess, this.speed);

    this.cells[this.startPos[1]][this.startPos[0]] = this.dist;
    this.fillCell(this.startPos.join(" "));
    this.segmentNeighbors(this.startPos.join(" "));
  }

  resumeInterval() {
    this.interval = window.setInterval(this.onePixelProcess, this.speed);
  }

  colorGapGenerator(c) {
    return (255 - c) / this.size;
  }

  onePixelProcess() {
    let randomSeg = this.popRandomSegment();
    this.fillCell(randomSeg);
    this.segmentNeighbors(randomSeg);
    this.color = this.color.map((c, i) => c + this.colorGap[i]);
  }

  segmentNeighbors(pos) {
    pos = pos.split(" ").map((p) => parseInt(p));
    let x = pos[0], y = pos[1];
    let neighbors = [[x-1, y], [x+1, y], [x, y-1], [x, y+1]];
    neighbors = neighbors.filter((n) => {
      return (n[0] >= 0 && n[1] >= 0 &&
              n[0] < this.width && n[1] < this.height && this.isOpen(n));
    });
    neighbors.forEach((n) => this.segments.push(n.join(" ")));
  }

  isOpen(pos) {
    let x = pos[0], y = pos[1];
    return this.cells[y][x] === undefined && !this.segments.includes(pos.join(" "));
  }

  popRandomSegment() {
    let segments = this.segments;
    let length = segments.length;
    let i = Math.floor(Math.random() * length);
    return segments.splice(i, 1)[0];
  }

  fillCell(seg) {
    this.dist += 1;
    seg = seg.split(" ").map((s) => parseInt(s));
    let x = seg[0], y = seg[1];
    this.cells[y][x] = this.dist;

    this.ctx.fillStyle = `rgb(${this.color.map(c => parseInt(c)).join(", ")})`;
    this.ctx.fillRect(x, y, 1, 1);

    if (this.dist === this.size) {
      window.clearInterval(this.interval);
    }
  }
}


export default BreathFirst;
