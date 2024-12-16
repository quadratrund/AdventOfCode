const Vector = require('../misc/vector');
const input = require('../load-input')().split('\n\n');
input[0] = input[0].replaceAll('#', '##').replaceAll('O', '[]').replaceAll('.', '..').replaceAll('@', '@.');
const map = input[0].split('\n').map(line => line.split(''));
const moves = input[1].replaceAll('\n', '').split('');
const initialY = map.findIndex(row => row.includes('@'));
const initialX = map[initialY].indexOf('@');
map[initialY][initialX] = '.';

class BoxFieldCheck {
  boxFields = [];
  boxFieldSet = new Set();

  constructor(map, direction) {
    this.map = map;
    this.direction = direction;
  }

  checkField(position) {
    const posString = position.toString();
    if (this.boxFieldSet.has(posString)) {
      return true;
    }
    const fieldValue = this.getField(position);
    switch(fieldValue) {
      case '#':
        return false;
      case '.':
        return true;
      case '[':
      case ']':
        const otherPart = fieldValue === '[' ? position.add(Vector.east) : position.add(Vector.west);
        this.boxFields.push(position, otherPart);
        this.boxFieldSet.add(posString);
        this.boxFieldSet.add(otherPart.toString());
        return this.checkField(position.add(this.direction)) && this.checkField(otherPart.add(this.direction));
    }
  }

  getField(position) {
    return this.map[position.y][position.x];
  }

  moveBoxes() {
    this.boxFields.sort((a, b) => b.multiply(this.direction) - a.multiply(this.direction));
    for (const position of this.boxFields) {
      const fieldValue = this.getField(position);
      const destination = position.add(this.direction)
      this.setField(destination, fieldValue);
      this.setField(position, '.');
    }
  }

  setField(position, value) {
    this.map[position.y][position.x] = value;
  }
}

const directions = {
  '^': Vector.north,
  '>': Vector.east,
  'v': Vector.south,
  '<': Vector.west
};

let robot = new Vector(initialX, initialY);
for (const move of moves) {
  const direction = directions[move];
  const destination = robot.add(direction);
  const check = new BoxFieldCheck(map, direction);
  if (check.checkField(destination)) {
    check.moveBoxes();
    robot = destination;
  }
}

let sum = 0;
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === '[') {
      sum += 100 * y + x;
    }
  }
}
console.log(sum);