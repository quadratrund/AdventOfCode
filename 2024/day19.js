const input = require('../misc/load-input')().split('\n\n');
const patterns = input[0].split(', ');
const designs = input[1].split('\n').filter(Boolean);

function buildFromMatches(length, matches, startIndex, resultCache) {
  if (length === startIndex) {
    return 1;
  }
  if (resultCache[startIndex] != null) {
    return resultCache[startIndex];
  }
  let combinationCount = 0;
  for (const matchLength of matches[startIndex] ?? []) {
    combinationCount += buildFromMatches(length, matches, startIndex + matchLength, resultCache)
  }
  resultCache[startIndex] = combinationCount;
  return combinationCount;
}

function checkDesign(design) {
  const matches = {};
  let startIndex = 0;
  for (const pattern of patterns) {
    while (true) {
      startIndex = design.indexOf(pattern, startIndex);
      if (startIndex === -1) {
        break;
      }
      matches[startIndex] ??= [];
      matches[startIndex].push(pattern.length);
      startIndex++;
    }
  }
  return buildFromMatches(design.length, matches, 0, {});
}

const possibleCombinationsPerDesigns = designs.map(checkDesign);
const possibleDesigns = possibleCombinationsPerDesigns.filter(count => count > 0);
console.log(possibleDesigns.length);

// -----

const sum = possibleCombinationsPerDesigns.reduce((a, b) => a + b);
console.log(sum);