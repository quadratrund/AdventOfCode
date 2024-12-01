const { readFileSync } = require('fs');

const buffer = readFileSync('input-day1.txt');
const parsedText = buffer.toString('utf8').split('\n').filter(Boolean).map(line => line.split(/\s+/).map(Number));
const list1 = parsedText.map(line => line[0]).sort((a, b) => a - b);
const list2 = parsedText.map(line => line[1]).sort((a, b) => a - b);
const distances = list1.map((value, index) => Math.abs(value - list2[index]));
const sum = distances.reduce((a, b) => a + b);
console.log(sum);
// -----
const occurrences2 = {};
for (const value of list2) {
  occurrences2[value] ??= 0;
  occurrences2[value]++;
}
const similarityScore = list1.map(value => value * (occurrences2[value] ?? 0)).reduce((a, b) => a + b);
console.log(similarityScore);