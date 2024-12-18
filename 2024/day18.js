const Vector = require('../misc/vector');

class Step extends Vector {
  constructor(x, y, score) {
    super(x, y);
    this.score = score;
  }

  add(other) {
    return new Step(this.x + other.x, this.y + other.y, this.score + 1);
  }

  isAt(vector) {
    return this.x === vector.x && this.y === vector.y;
  }
}

const bytes = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split(',').map(Number));
const start = new Step(0, 0, 0);
const end = new Vector(70, 70);

function findPath(byteCount) {
  const memory = Array(71).fill(null).map(() => Array(71).fill('.'));
  for ([x, y] of bytes.slice(0, byteCount)) {
    memory[y][x] = '#';
  }
  //console.log(memory.map(row => row.join('')).join('\n'));

  const reachedPositions = [start];
  const positionSet = new Set();
  positionSet.add(start.toString());
  while (reachedPositions.length > 0) {
    const position = reachedPositions.shift();
    if (position.isAt(end)) {
      return position.score;
    }
    const field = memory[position.y]?.[position.x]
    if (field === '#' || field == null) {
      continue;
    }

    const nextSteps = [
      position.add(Vector.north),
      position.add(Vector.south),
      position.add(Vector.east),
      position.add(Vector.west)
    ];
    for (const step of nextSteps) {
      const stepString = step.toString();
      if (!positionSet.has(stepString)) {
        positionSet.add(step.toString());
        reachedPositions.push(step);
      }
    }
    reachedPositions.sort((a, b) => a.score - b.score);
  }
  return null;
}

console.log(findPath(1024));

// -----

let workingByteCount = 1024;
let notWorkingByteCount = bytes.length;
while (notWorkingByteCount - workingByteCount > 1) {
  const byteCount = Math.round((workingByteCount + notWorkingByteCount) / 2);
  const pathExists = findPath(byteCount) != null;
  if (pathExists) {
    workingByteCount = byteCount;
  } else {
    notWorkingByteCount = byteCount;
  }
}
console.log(bytes[notWorkingByteCount - 1].join(','));