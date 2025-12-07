const input = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split(''));
const Vector = require('../misc/vector');
const startX = input[0].indexOf('S');
const timelineMap = input.map(() => []);

/**
 * @param {Vector} beam 
 */
function continueBeam(beam) {
  if (!timelineMap[beam.y]) {
    return 1;
  }
  if (timelineMap[beam.y][beam.x]) {
    return timelineMap[beam.y][beam.x];
  }
  const nextPosition = beam.add(Vector.south);
  let splitCount;
  if (input[nextPosition.y]?.[nextPosition.x] === '^') {
    splitCount = continueBeam(nextPosition.add(Vector.west)) + continueBeam(nextPosition.add(Vector.east));
  } else {
    splitCount = continueBeam(nextPosition);
  }
  timelineMap[beam.y][beam.x] = splitCount;
  return splitCount;
}

const splitCount = continueBeam(new Vector(startX, 0));
console.log(splitCount);