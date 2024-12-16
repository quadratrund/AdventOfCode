const Vector = require('../misc/vector');

class Reindeer extends Vector {
  constructor(x, y, direction, score) {
    super(x, y);
    this.direction = direction;
    this.score = score;
  }

  toString() {
    return super.toString() + '|' + this.direction.toString();
  }

  move() {
    return new Reindeer(this.x + this.direction.x, this.y + this.direction.y, this.direction, this.score + 1);
  }

  turnLeft() {
    return new Reindeer(this.x, this.y, new Vector(this.direction.y, -this.direction.x), this.score + 1000);
  }

  turnRight() {
    return new Reindeer(this.x, this.y, new Vector(-this.direction.y, this.direction.x), this.score + 1000);
  }

  isAt(vector) {
    return this.x === vector.x && this.y === vector.y;
  }
}

const map = require('../load-input')().split('\n').filter(Boolean).map(line => line.split(''));
const start = new Reindeer(1, map.length - 2, Vector.east, 0);
const end = new Vector(map[0].length - 2, 1);

//const scoreMap = Array(map.length).fill(null).map(() => Array(map[0].length));
const reachedPositions = [start];
const positionSet = new Set();
positionSet.add(start.toString());
while (true) {
  reachedPositions.sort((a, b) => a.score - b.score);
  const position = reachedPositions.shift();
  if (position.isAt(end)) {
    console.log(position);
    break;
  }
  if (map[position.y][position.x] === '#') {
    continue;
  }

  const nextSteps = [
    position.move(),
    position.turnLeft(),
    position.turnRight()
  ].filter(p => !positionSet.has(p.toString()));
  reachedPositions.push(...nextSteps);
  nextSteps.forEach(step => positionSet.add(step.toString()));
}