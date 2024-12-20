const Vector = require('../misc/vector');

const map = require('../misc/load-input')().split('\n').filter(Boolean);
const startY = map.findIndex(line => line.includes('S'));
const startX = map[startY].indexOf('S');

const directions = [Vector.north, Vector.south, Vector.east, Vector.west];
let step = new Vector(startX, startY);
const steps = [step];
while (map[step.y][step.x] !== 'E') {
  const prevStep = steps[steps.length - 2];
  step = directions.map(d => step.add(d)).find(s => map[s.y][s.x] !== '#' && !s.equals(prevStep));
  steps.push(step);
}

const raceTrack = map.map(line => Array(line.length));
for (const [index, step] of steps.entries()) {
  raceTrack[step.y][step.x] = index;
}

const directions2 = directions.map(v => v.multiply(2));
const cheatCountPart1 = steps.map((step, index) => {
  const destinations = directions2.map(d => step.add(d)).filter(d => {
    const cheatIndex = raceTrack[d.y]?.[d.x];
    return cheatIndex != null && cheatIndex - index >= 102
  });
  return destinations.length;
}).reduce((a, b) => a + b);
console.log(cheatCountPart1);

// -----

const directions20 = [];
for (let x = 0; x <= 20; x++) {
  for (let y = 20 - x; y >= 0; y--) {
    if (x + y >= 2) {
      directions20.push(new Vector(x, y));
      if (x > 0) {
        directions20.push(new Vector(-x, y));
      }
      if (y > 0) {
        directions20.push(new Vector(x, -y));
        if (x > 0) {
          directions20.push(new Vector(-x, -y));
        }
      }
    }
  }
}
const cheatCountPart2 = steps.map((step, index) => {
  return directions20
    .filter(direction => {
      const destination = step.add(direction)
      const cheatIndex = raceTrack[destination.y]?.[destination.x];
      return cheatIndex != null && cheatIndex - index >= 100 + Math.abs(direction.x) + Math.abs(direction.y)
    })
    .length;
}).reduce((a, b) => a + b);
console.log(cheatCountPart2);