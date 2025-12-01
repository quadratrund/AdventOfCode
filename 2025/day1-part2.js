const lines = require('../misc/load-input')().split('\n').filter(Boolean);
const regex = /^(L|R)(\d+)$/;
const rotations = lines.map(line => line.match(regex)).map(match => [match[1], Number(match[2])]).map(x => x[0] == 'L' ? -x[1] : x[1]);
let currentPosition = 50;
let zeroCount = 0;
for (const rotation of rotations) {
  const startAtZero = currentPosition === 0;
  currentPosition += rotation;
  const a = currentPosition / 100;
  const b = Math.trunc(a);
  let c;
  if (a <= 0) {
    c = (startAtZero ? 0 : 1) - b;
  } else {
    c = b;
  }
  zeroCount += c;
  currentPosition %= 100;
  currentPosition += 100;
  currentPosition %= 100;
}
console.log(zeroCount);