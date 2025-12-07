const input = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split(''));
const Vector = require('../misc/vector');
const startX = input[0].indexOf('S');
const beams = [ new Vector(startX, 0) ];

/**
 * @param {Vector} beam 
 */
function addBeam(beam) {
  if (input[beam.y]?.[beam.x] === '.') {
    input[beam.y][beam.x] = '|';
    beams.push(beam);
  }
}

let splitCount = 0;
while (beams.length > 0) {
  const beam = beams.shift();
  const nextPosition = beam.add(Vector.south);
  if (input[nextPosition.y]?.[nextPosition.x] === '^') {
    splitCount++;
    addBeam(nextPosition.add(Vector.west));
    addBeam(nextPosition.add(Vector.east));
  } else {
    addBeam(nextPosition);
  }
}
console.log(splitCount);