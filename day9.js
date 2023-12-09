const { readFileSync } = require('fs');

const buffer = readFileSync('input-day9.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);
const numbers = text.map(line => line.split(' ').map(Number));

function getNextNumber(line) {
  if (line.every(x => x === 0)) {
    return 0;
  } else {
    const nextLine = line.slice(1).map((x, i) => x - line[i]);
    const diff = getNextNumber(nextLine);
    return line[line.length - 1] + diff;
  }
}

// Part 1
const nextNumbers1 = numbers.map(getNextNumber);
const sum1 = nextNumbers1.reduce((a, b) => a + b);
console.log(sum1);

// Part 2
numbers.forEach(line => line.reverse());
const nextNumbers2 = numbers.map(getNextNumber);
const sum2 = nextNumbers2.reduce((a, b) => a + b);
console.log(sum2);