const memory = require('../load-input')();
const regex1 = /mul\((\d{1,3}),(\d{1,3})\)/g;
const matches1 = Array.from(memory.matchAll(regex1));
const multiplications1 = matches1.map(match => [Number(match[1]), Number(match[2])]);
const products1 = multiplications1.map(([a, b]) => a * b);
const sum1 = products1.reduce((a, b) => a + b);
console.log(sum1);

// -----

const regex2 = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;
const matches2 = Array.from(memory.matchAll(regex2));
const multiplications2 = [];
let enabled = true;
for (const match of matches2) {
  switch (match[0]) {
    case 'do()':
      enabled = true;
      break;
    case 'don\'t()':
      enabled = false;
      break;
    default:
      if (enabled) {
        multiplications2.push([Number(match[1]), Number(match[2])])
      }
      break;
  }
}
const products2 = multiplications2.map(([a, b]) => a * b);
const sum2 = products2.reduce((a, b) => a + b);
console.log(sum2);