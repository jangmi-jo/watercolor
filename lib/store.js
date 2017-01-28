
class Store {
  constructor() {
    this.valToIdx = new Map();
    this.idxToVal = new Map();
  }

  get length() {
    return this.valToIdx.size;
  }

  has(val) {
    return this.valToIdx.get(val) !== undefined;
  }

  insert(val) {
    if (this.valToIdx.get(val) === undefined) {
      this.valToIdx.set(val, this.valToIdx.size);
      this.idxToVal.set(this.idxToVal.size, val);
    }
  }

  popRandom() {
    let randomIdx = Math.floor(Math.random() * this.valToIdx.size);
    let val = this.idxToVal.get(randomIdx);
    let lastIdx = this.idxToVal.size - 1;
    let lastEl = this.idxToVal.get(lastIdx);
    this.valToIdx.delete(val);
    this.idxToVal.delete(lastIdx);
    if (randomIdx !== lastIdx) {
      this.valToIdx.set(lastEl, randomIdx);
      this.idxToVal.set(randomIdx, lastEl);
    }
    return val;
  }
}


export default Store;
