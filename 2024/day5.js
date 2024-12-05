const { readFileSync } = require('fs');

const buffer = readFileSync('input-day5.txt');
const parts = buffer.toString('utf8').split('\n\n').map(part => part.split('\n').filter(Boolean));
const rules = parts[0].map(line => line.split('|').map(Number));
const updates = parts[1].map(line => line.split(',').map(Number));
const updateInfos = updates.map(update => ({
  ordered: rules.every(([A, B]) => {
    const iA = update.indexOf(A);
    if (iA === -1) {
      return true;
    }
    const iB = update.indexOf(B);
    return iB === -1 || iA < iB;
  }),
  update
}));
const orderedUpdates = updateInfos.filter(({ ordered }) => ordered).map(({ update }) => update);
const middlePages = orderedUpdates.map(update => update[(update.length - 1) / 2]);
const sum = middlePages.reduce((a, b) => a + b);
console.log(sum);

// -----

const unorderedUpdates = updateInfos.filter(({ ordered }) => !ordered).map(({ update }) => update);
const middleUnorderedPages = unorderedUpdates.map(update => {
  const remainingPages = new Set(update);
  let filteredRules = rules;
  while (remainingPages.size > 1) {
    filteredRules = filteredRules.filter(([A, B]) => remainingPages.has(A) && remainingPages.has(B));
    const leftPages = new Set(filteredRules.map(rule => rule[0]));
    const rightPages = new Set(filteredRules.map(rule => rule[1]));
    const firstPage = Array.from(leftPages).find(x => !rightPages.has(x));
    const lastPage = Array.from(rightPages).find(x => !leftPages.has(x));
    remainingPages.delete(firstPage);
    remainingPages.delete(lastPage);
  }
  return remainingPages.values().next().value
});
const unorderedSum = middleUnorderedPages.reduce((a, b) => a + b);
console.log(unorderedSum);