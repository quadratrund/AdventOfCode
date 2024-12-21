class Vector {
  static north = new Vector( 0, -1);
  static east  = new Vector( 1,  0);
  static south = new Vector( 0,  1);
  static west  = new Vector(-1,  0);

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  equals(other) {
    return other instanceof Vector && this.x === other.x && this.y === other.y;
  }

  multiply(other) {
    if (typeof other === 'number') {
      return new Vector(this.x * other, this.y * other);
    } else {
      return this.x * other.x + this.y * other.y;
    }
  }

  subtract(other) {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  toString() {
    return this.x + '|' +  this.y;
  }
}

module.exports = Vector;