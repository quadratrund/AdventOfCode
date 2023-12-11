const { readFileSync } = require('fs');

const buffer = readFileSync('input-day11.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);

const space = text.map(line => line.split(''));
const emptyCols = space[0].map((_, i) => i).filter(i => space.every(row => row[i] === '.'));
const emptyRows = text.map((line, i) => /^\.*$/.test(line) ? i : null).filter(i => typeof i === 'number');

const galaxies = space
  .flatMap((row, y) => row
    .map((value, x) => value === '#'
      ? {
        x: x + emptyCols.filter(i => i < x).length * 999999,
        y: y + emptyRows.filter(i => i < y).length * 999999
      }
      : null)
    .filter(Boolean)
  );
const distances = galaxies.flatMap((a, i) => galaxies.slice(i + 1).map(b => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)));
const sum = distances.reduce((a, b) => a + b);
console.log(sum);