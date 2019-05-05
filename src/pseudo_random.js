export default class PseudoRandom {
  constructor(seed) {
    this.seed = seed || 1;
  }

  generate() {
    var v = Math.sin(this.seed++) * 10000;
    return v - Math.floor(v);
  }
}
