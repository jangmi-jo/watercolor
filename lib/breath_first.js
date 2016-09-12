
class BreathFirst {
  constructor(data) {
    this.width = data.width;
    this.height = data.height;
    this.dist = 0;
    this.cells = this.makeGrid();
    this.startPos = [parseInt(data.startX), parseInt(data.startY)];
    this.segments = [];
    this.ctx = data.ctx;

    this.cells[this.startPos[1]][this.startPos[0]] = this.dist;
    this.fillCell(this.startPos.join(" "));
    this.segmentNeighbors(this.startPos.join(" "));
    this.onePixelProcess = this.onePixelProcess.bind(this);

    this.interval = window.setInterval(this.onePixelProcess, 0.1);
  }

  pause() {
    window.clearInterval(this.interval);
  }

  resume() {
    window.setInterval(this.onePixelProcess, 0.5);
  }

  makeGrid() {
    let grid = [];
    for (let r=0; r < this.height; r++) {
      let row = [];
      for (let c=0; c < this.width; c++) {
        row.push(undefined);
      }
      grid.push(row);
    }
    return grid;
  }

  onePixelProcess() {
    let randomSeg = this.popRandomSegment();
    this.fillCell(randomSeg);
    this.segmentNeighbors(randomSeg);
    if (this.segments.length === 0) {
      window.clearInterval(this.interval);
    }
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
    let temp = segments[i];
    segments[i] = segments[length - 1];
    segments[length - 1] = temp;
    return segments.pop();
  }

  fillCell(seg) {
    this.dist += 0.01;
    seg = seg.split(" ").map((s) => parseInt(s));
    let x = seg[0], y = seg[1];
    this.cells[y][x] = this.dist;
    let color = `rgb(${parseInt(this.dist)}, ${parseInt(this.dist)}, ${parseInt(this.dist)})`;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, 1, 1);
    if (color === `rgb(255, 255, 255)`) {
      window.clearInterval(this.interval);
    }
  }


}


export default BreathFirst;
