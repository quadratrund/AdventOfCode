const { readFileSync } = require('fs');

const buffer = readFileSync('input-day13.txt');
const text = buffer.toString('utf8');
const patterns = text.split('\n\n').map(part => part.split('\n'));

// Part 1
const hReflectionLines = patterns.map(pattern => {
  for (let i = 1; i < pattern.length; i++) {
    const part1 = pattern.slice(0, i);
    const part2 = pattern.slice(i);
    part1.reverse();
    const reflectedLineCount = Math.min(part1.length, part2.length);
    if (part1.slice(0, reflectedLineCount).join('\n') === part2.slice(0, reflectedLineCount).join('\n')) {
      return i;
    }
  }
});

const vReflectionLines = patterns.map(pattern => {
  const chars = pattern.map(line => line.split(''));
  const columns = chars[0].map((_, index) => chars.map(row => row[index]).join(''));
  for (let i = 1; i < columns.length; i++) {
    const part1 = columns.slice(0, i);
    const part2 = columns.slice(i);
    part1.reverse();
    const reflectedLineCount = Math.min(part1.length, part2.length);
    if (part1.slice(0, reflectedLineCount).join('\n') === part2.slice(0, reflectedLineCount).join('\n')) {
      return i;
    }
  }
});

const result = 100 * hReflectionLines.filter(x => x != null).reduce((a, b) => a + b) + vReflectionLines.filter(x => x != null).reduce((a, b) => a + b);
console.log(result);

// Part2
function calcDifference1D(a, b, maxCount) {
  let counter = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      counter++;
      if (counter > maxCount) {
        return Infinity;
      }
    }
  }
  return counter;
}
function calcDifference2D(a, b, maxCount) {
  let counter = 0;
  for (let i = 0; i < a.length; i++) {
    counter += calcDifference1D(a[i], b[i]);
    if (counter > maxCount) {
      return Infinity;
    }
  }
  return counter;
}
const charPatterns = patterns.map(pattern => pattern.map(line => line.split('')));

const hReflectionLines2 = charPatterns
//.filter((_, i) => hReflectionLines[i] == null)
.map(pattern => {
  for (let i = 1; i < pattern.length; i++) {
    const part1 = pattern.slice(0, i);
    const part2 = pattern.slice(i);
    part1.reverse();
    const reflectedLineCount = Math.min(part1.length, part2.length);
    if (calcDifference2D(part1.slice(0, reflectedLineCount), part2.slice(0, reflectedLineCount), 1) === 1) {
      return i;
    }
  }
});

const vReflectionLines2 = charPatterns
//.filter((_, i) => hReflectionLines[i] == null)
.map(pattern => {
  const columns = pattern[0].map((_, index) => pattern.map(row => row[index]).join(''));
  for (let i = 1; i < columns.length; i++) {
    const part1 = columns.slice(0, i);
    const part2 = columns.slice(i);
    part1.reverse();
    const reflectedLineCount = Math.min(part1.length, part2.length);
    if (calcDifference2D(part1.slice(0, reflectedLineCount), part2.slice(0, reflectedLineCount), 1) === 1) {
      return i;
    }
  }
});

const result2 = 100 * hReflectionLines2.filter(x => x != null).reduce((a, b) => a + b) + vReflectionLines2.filter(x => x != null).reduce((a, b) => a + b);
console.log(result2);