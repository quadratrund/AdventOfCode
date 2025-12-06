const input1 = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.trim().split(/\s+/));
const operations = input1.pop();
const numbers = input1.map(line => line.map(Number));
const results1 = operations.map((operation, index) => numbers.map(line => line[index]).reduce((a, b) => operation === '+' ? a + b: (a * b)));
const sum1 = results1.reduce((a, b) => a + b);
console.log(sum1);

// -----

const input2 = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split(''));
const turned = input2[0].map((_, index) => input2.map(line => line[index]).join('').trim()).join('\n');
const blocks = turned
  .split('\n\n')
  .map(block => ({
    operator: block.replaceAll(/[^+*]+/g, ''),
    numbers: block.replace(/[+*]/, '').split('\n').map(line => Number(line.trim()))
  }));
const results2 = blocks.map(({ operator, numbers}) => numbers.reduce(operator === '+' ? (a, b) => a + b : (a, b) => a * b));
const sum2 = results2.reduce((a, b) => a + b);
console.log(sum2);