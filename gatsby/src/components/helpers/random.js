export default class Random {
  constructor(seed) {
    this.seed = seed || 1;
  }
  get = () => {
    this.seed = this.seed + 1;
    const s = Math.sin(this.seed) * 10000;
    return s - Math.floor(s);
  };
}
