const { readFileSync } = require('fs');

const buffer = readFileSync('input-day10.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);
const pipes = text.map(line => line.split(''));

const pipeShapes = {
  '|': 'ns',
  '-': 'ew',
  'L': 'ne',
  'J': 'nw',
  '7': 'sw',
  'F': 'se',
  '.': null,
  'S': '??'
};
const oppositeDirecctions = {
  n: 's',
  s: 'n',
  e: 'w',
  w: 'e'
}

const shapesInArea = pipes.map(row => row.map(x => pipeShapes[x]));

let y = text.findIndex(line => line.includes('S'));
let x = pipes[y].indexOf('S');
let startPipe = '';

if (shapesInArea[y - 1]?.[x]?.includes('s')) {
  startPipe += 'n';
}
if (shapesInArea[y + 1]?.[x]?.includes('n')) {
  startPipe += 's';
}
if (shapesInArea[y][x - 1]?.includes('e')) {
  startPipe += 'w';
}
if (shapesInArea[y][x + 1]?.includes('w')) {
  startPipe += 'e';
}
shapesInArea[y][x] = startPipe;

let enteringFrom = startPipe[0];
const fieldTypes = pipes.map(row => row.map(() => null));
let steps = 0;

do {
  fieldTypes[y][x] = 'P';
  const leavingTo = shapesInArea[y][x].replace(enteringFrom, '');
  switch(leavingTo) {
    case 'n':
      y--;
      break;
    case 's':
      y++;
      break;
    case 'w':
      x--;
      break;
    case 'e':
      x++;
      break;
  }
  enteringFrom = oppositeDirecctions[leavingTo];
  steps++;
} while (pipes[y][x] !== 'S')

for (y = 0; y < shapesInArea.length; y++) {
  const fieldTypeRow = fieldTypes[y];
  const shapeRow = shapesInArea[y];
  let topLeftCornerType = 'O';
  for (x = 0; x < shapesInArea[y].length; x++) {
    if (fieldTypeRow[x]) {
      if (shapeRow[x].includes('n')) {
        topLeftCornerType = topLeftCornerType === 'O' ? 'I' : 'O';
      }
    } else {
      fieldTypeRow[x] = topLeftCornerType;
    }
  }
}

const insideCount = fieldTypes.flat().filter(value => value === 'I').length;

console.log(steps / 2);   // Part 1
console.log(insideCount); // Part 2