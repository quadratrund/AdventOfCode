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

const pathCache = {};
pathCache[start.toString()] = { score: 0, steps: [] };
const reachedPositions = [start];
const positionSet = new Set();
positionSet.add(start.toString());
let bestScore = Infinity;
while (reachedPositions[0].score <= bestScore) {
  const position = reachedPositions.shift();
  if (position.isAt(end)) {
    console.log(position);
    bestScore = position.score;
    continue;
  }
  if (map[position.y][position.x] === '#') {
    continue;
  }

  const nextSteps = [
    position.move(),
    position.turnLeft(),
    position.turnRight()
  ];
  for (const step of nextSteps) {
    const stepString = step.toString();
    if (positionSet.has(stepString)) {
      if (pathCache[stepString].score > step.score) {
        pathCache[stepString] = {
          score: step.score,
          steps: new Set()
        };
      }
      if (pathCache[stepString].score === step.score) {
        pathCache[position.toString()].steps.forEach(s => pathCache[stepString].steps.add(s));
        pathCache[stepString].steps.add(position.x + '|' + position.y);
      }
    } else {
      pathCache[stepString] = {
        score: step.score,
        steps: new Set(pathCache[position.toString()].steps)
      };
      pathCache[stepString].steps.add(position.x + '|' + position.y);
      positionSet.add(step.toString());
      reachedPositions.push(step);
    }
  }
  reachedPositions.sort((a, b) => a.score - b.score);
}
const pathFields = new Set();
[
  new Reindeer(end.x, end.y, Vector.east, NaN),
  new Reindeer(end.x, end.y, Vector.north, NaN)
]
  .map(x => pathCache[x.toString()])
  .filter(Boolean)
  .forEach(a => a.steps.forEach(b => pathFields.add(b)));
pathFields.add(end.toString());
console.log(pathFields.size);