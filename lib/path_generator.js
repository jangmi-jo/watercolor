import BreathFirst from './breath_first.js';

class PathGenerator {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext("2d");
    this.clickHandler = this.clickHandler.bind(this);
    this.canvas.addEventListener('click', this.clickHandler);
  }

  clickHandler(e) {
    let breathFirst = new BreathFirst({
      width: e.target.clientWidth,
      height: e.target.clientHeight,
      startX: e.offsetX,
      startY: e.offsetY,
      ctx: this.ctx});
  }

}

export default PathGenerator;
