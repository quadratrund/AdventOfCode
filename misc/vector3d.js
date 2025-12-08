class Vector3d {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(other) {
    return new Vector3d(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  equals(other) {
    return other instanceof Vector3d && this.x === other.x && this.y === other.y && this.z === other.z;
  }

  subtract(other) {
    return new Vector3d(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  getSquareOfLength() {
    return this.x ** 2 + this.y ** 2 + this.z ** 2;
  }

  toString() {
    return this.x + '|' +  this.y + '|' + this.z;
  }
}

module.exports = Vector3d;