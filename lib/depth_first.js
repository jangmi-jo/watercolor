
class DepthFirst {
  constructor(data) {
    this.width = data.width;
    this.height = data.height;
    this.dist = 0;
    this.startIdx = data.startIdx;
    this.segments = [];
    this.ctx = data.ctx;
    this.size = data.size;
    this.color = data.color;
    this.colorGap = this.color.map(c => this.colorGapGenerator(c));
    this.speed = data.speed;
    this.visited = {};

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
    return !this.visited[idx] && !this.segments.includes(idx);
  }

  popRandomSegment() {
    let segments = this.segments;
    let length = segments.length;
    let i = Math.floor(Math.random() * length);
    return segments.splice(i, 1)[0];
  }
  //
  // rgbaSum(c1, c2){
  //   let a = c1.a + c2.a*(1-c1.a);
  //   return {
  //     r: (c1.r * c1.a  + c2.r * c2.a * (1 - c1.a)) / a,
  //     g: (c1.g * c1.a  + c2.g * c2.a * (1 - c1.a)) / a,
  //     b: (c1.b * c1.a  + c2.b * c2.a * (1 - c1.a)) / a,
  //     a: a
  //   };
  // }
  //
  // colorObject(c) {
  //   let color = {};
  //   ['r', 'g', 'b', 'a'].forEach((chr, idx) => {
  //     color[chr] = Number((c[idx] / 255).toFixed(2));
  //   });
  //   return color;
  // }
  //
  // colorArray(ob) {
  //   let color = [ob.r, ob.g, ob.b, ob.a];
  //   return color.map((n) => parseInt(n * 255));
  // }

  fillCell(idx) {
    this.dist += 1;
    this.visited[idx] = true;
    let x = idx % this.width,
        y = parseInt(idx / this.width);
    // let spotColor = this.ctx.getImageData(x, y, 1, 1).data;
    // let mergedColor = this.colorObject(this.color.concat(127));
    //
    // if (!spotColor.every(i => i === 0)) {
    //   mergedColor = this.rgbaSum(this.colorObject(spotColor), mergedColor);
    // }
    // this.ctx.fillStyle = `rgba(${this.colorArray(mergedColor).join(", ")})`;
    this.ctx.fillStyle = `rgb(${this.color.map(n=> parseInt(n)).join(", ")})`;
    this.ctx.fillRect(x, y, 1, 1);

    if (this.dist === this.size) {
      window.clearInterval(this.interval);
    }
  }
}


export default BreadthFirst;
