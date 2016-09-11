
class BreathFirst {
  constructor(data) {
    this.width = data.width;
    this.height = data.height;
    this.dist = 0;
    this.cells = this.makeGrid();
    this.startPos = [parseInt(data.startX), parseInt(data.startY)];
    this.segments = [];
    this.ctx = data.ctx;
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

  start() {
    this.cells[this.startPos[1]][this.startPos[0]] = this.dist;
    this.segmentNeighbors(this.startPos.join(" "));

    while (this.segments.length || this.cells.indexOf(undefined) !== -1 ) {
      let randomSeg = this.popRandomSegment();
      this.fillCell(randomSeg);
      this.segmentNeighbors(randomSeg);
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
    this.dist += 0.5;
    seg = seg.split(" ").map((s) => parseInt(s));
    let x = seg[0], y = seg[1];
    this.cells[y][x] = this.dist;
    this.ctx.fillStyle = 'rgba(' + this.dist
                        + ',' + 0
                        + ',' + 0
                        + ',' + 255 + ')';
    this.ctx.fillRect(x, y, 1, 1);
  }


}

// let b = new BreathFirst({width: 3, height: 5, startX: 1, startY: 2});
// b.start();
// console.log(b);

export default BreathFirst;
