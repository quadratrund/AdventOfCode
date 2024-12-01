const { readFileSync } = require('fs');

const buffer = readFileSync('input-day8.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);

const steps = text.shift().split('');
//console.log(steps);
const nodes = Object.fromEntries(text.map(line => line.split(/[^A-Z]+/)).map(([name, L, R]) => [name, { L, R }]));
//console.log(nodes);

// Part 1
let stepCount = 0;
for (let position = 'AAA'; position !== 'ZZZ'; position = nodes[position][steps[stepCount++ % steps.length]]);
console.log(stepCount);

// Part 2
// For some reason the map is designed in a specific way. It's always the same numer of steps from start to end as from one end to the same end.
const starts = Object.keys(nodes).filter(x => x.endsWith('A'));
console.log(starts);
const stepCounts = starts.map(start => {
  let stepCount = 0;
  for (let position = start; stepCount === 0 || !position.endsWith('Z'); position = nodes[position][steps[stepCount++ % steps.length]]);
  return stepCount;
});

while (stepCounts.length > 1) {
  stepCounts.sort((a, b) => a - b);
  const [a, b] = stepCounts.splice(0, 2);
  let x = a;
  let y = b;
  while (x !== y) {
    if (x < y) {
      x += a;
    } else {
      y += b;
    }
  }
  stepCounts.push(x);
}
console.log(stepCounts[0]);