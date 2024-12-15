const input = require('../load-input')().split('\n\n');
const map = input[0].split('\n').map(line => line.split(''));
const moves = input[1].replaceAll('\n', '').split('');
const initialY = map.findIndex(row => row.includes('@'));
const initialX = map[initialY].indexOf('@');
map[initialY][initialX] = '.';

class Vector {
  static north = new Vector( 0, -1);
  static east  = new Vector( 1,  0);
  static south = new Vector( 0,  1);
  static west  = new Vector(-1,  0);

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }
}

function getField(position) {
  return map[position.y][position.x];
}

function setField(position, value) {
  map[position.y][position.x] = value;
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
  const destination = robot.plus(direction);
  switch(getField(destination)) {
    case '#':
      break;
    case '.':
      robot = destination;
      break;
    case 'O':
      let behindTheBox = destination;
      while (getField(behindTheBox) === 'O') {
        behindTheBox = behindTheBox.plus(direction);
      }
      if (getField(behindTheBox) === '.') {
        setField(behindTheBox, 'O');
        setField(destination, '.');
        robot = destination;
      }
      break;
  }
}

let sum = 0;
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === 'O') {
      sum += 100 * y + x;
    }
  }
}
console.log(sum);