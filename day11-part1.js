const { readFileSync } = require('fs');

const buffer = readFileSync('input-day11.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);

const space = text.flatMap(line => /^\.*$/.test(line) ? [line, line] : [line]).map(line => line.split(''));
for (let i = space[0].length - 1; i >= 0; i--) {
  if (space.every(row => row[i] === '.')) {
    for (const row of space) {
      row.splice(i, 0, '.');
    }
  }
}

const galaxies = space.flatMap((row, y) => row.map((value, x) => value === '#' ? {x, y} : null).filter(Boolean));
const distances = galaxies.flatMap((a, i) => galaxies.slice(i + 1).map(b => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)));
const sum = distances.reduce((a, b) => a + b);
console.log(sum);