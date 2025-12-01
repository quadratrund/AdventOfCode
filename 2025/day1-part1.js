const lines = require('../misc/load-input')().split('\n').filter(Boolean);
const regex = /^(L|R)(\d+)$/;
const rotations = lines.map(line => line.match(regex)).map(match => [match[1], Number(match[2])]).map(x => x[0] == 'L' ? -x[1] : x[1]);
let currentPosition = 50;
const stops = [];
for (const rotation of rotations) {
  currentPosition += rotation;
  currentPosition %= 100;
  currentPosition += 100;
  currentPosition %= 100;
  stops.push(currentPosition); 
}
const zeroCount = stops.filter(x => x === 0).length;
console.log(zeroCount);