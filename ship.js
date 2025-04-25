export class Ship {
  constructor(length) {
    if (length < 2 || length > 5) {
      throw new Error("Must be between 2-5 length.");
    } else {
      this.length = length;
    }
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.length === this.hits) this.sunk = true;
    return this.sunk;
  }
}
