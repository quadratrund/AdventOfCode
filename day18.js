const { readFileSync } = require('fs');

const buffer = readFileSync('input-day18.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);
const digPlan = text.map(line => line.split(' ')).map(([direction, distance, color]) => ({direction, distance: Number(distance), color: color.replace(/\(|\)/g, '')}));
const stepOffsets = digPlan.map(({ direction, distance }) => {
  switch (direction) {
    case 'D':
      return { x: 0, y: distance };
    case 'L':
      return { x: -distance, y: 0 };
    case 'R':
      return { x: distance, y: 0 };
    case 'U':
      return { x: 0, y: -distance };
    default:
      throw new Error('invalid direction: ' + direction);
  }
});
let x = 0;
let y = 0;
const points = stepOffsets.map(step => {
  x += step.x;
  y += step.y;
  return { x, y };
});
points.unshift({ x: 0, y: 0 });
const minX = Math.min(...points.map(({x}) => x));
const minY = Math.min(...points.map(({y}) => y));
const maxX = Math.max(...points.map(({x}) => x));
const maxY = Math.max(...points.map(({y}) => y));
console.log(minX, minY);

const grid = Array(maxY - minY + 1).fill().map(() => Array(maxX - minX + 1).fill('.'));
x = -minX;
y = -minY;
grid[y][x] = '#';
for (const step of stepOffsets) {
  const dx = x + step.x;
  const dy = y + step.y;
  while (x !== dx || y !== dy) {
    x += Math.sign(dx - x);
    y += Math.sign(dy - y);
    grid[y][x] = '#';
  }
}
for (y = 0; y < grid.length; y++) {
  let inside = false;
  for (x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === '#') {
      inside = !inside;
    } else if (inside) {
      grid[y][x] = '#';
    }
  }
}
console.log(grid.map(row => row.join('')).join('\n'));