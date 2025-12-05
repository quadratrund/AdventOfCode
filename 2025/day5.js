const input = require('../misc/load-input')().split('\n\n');
const freshRanges = input[0].split('\n').map(line => line.split('-').map(Number)).map(([start, end]) => ({start, end}));
const ingredients = input[1].split('\n').map(Number);
const freshIngredients = ingredients.filter(ingredient =>
  freshRanges.some(({start, end}) => ingredient >= start && ingredient <= end)
);
console.log(freshIngredients.length);

freshRanges.sort((a, b) => a.start - b.start);
for (let i = freshRanges.length - 1; i > 0; i--) {
  const prev = freshRanges[i -1];
  const curr = freshRanges[i];
  if (prev.end < curr.start) {
    continue;
  }
  prev.end = Math.max(prev.end, curr.end);
  freshRanges.splice(i, 1);
}
const rangeSizes = freshRanges.map(({start, end}) => end - start + 1);
const sum = rangeSizes.reduce((a, b) => a + b);
console.log(sum);