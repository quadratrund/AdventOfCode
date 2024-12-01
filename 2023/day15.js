const { readFileSync } = require('fs');

const buffer = readFileSync('input-day15.txt');
const text = buffer.toString('ascii').replace(/\n/g, '');
const steps = text.split(',');

function hashString(s) {
  return s.split('').map(char => char.codePointAt(0)).reduce((v, c) => ((v + c) * 17) % 256, 0);
}

// Part 1
const hashes = steps.map(step => hashString(step));
const sum = hashes.reduce((a, b) => a + b);
console.log(sum);

// Part 2
const boxes = Array(256).fill(null).map(() => []);
for (const step of steps) {
  const match = /^([^=-]*)(=|-)([0-9]*)$/.exec(step);
  const [, label, operation] = match;
  const focalLength = Number(match[3]);
  const boxIndex = hashString(label);
  const box = boxes[boxIndex];
  const positionInBox = box.findIndex(lens => lens.label === label);
  switch (operation) {
    case '-':
      if (positionInBox !== -1) {
        box.splice(positionInBox, 1);
      }
      break;
    case '=':
      const lens = { label, focalLength };
      if (positionInBox === -1) {
        box.push(lens);
      } else {
        box.splice(positionInBox, 1, lens);
      }
      break;
  }
}
const focusingPower = boxes
  .flatMap((box, boxIndex) => box.map((lens, positionInBox) => (boxIndex + 1) * (positionInBox + 1) * lens.focalLength))
  .reduce((a, b) => a + b);

console.log(focusingPower);