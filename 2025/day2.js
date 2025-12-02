const input = require('../misc/load-input')().trim();
const ranges = input.split(',').map(range => range.split('-').map(Number)).map(([start, end]) => ({start, end}));

/**
 * @param {number} part 
 * @param {number} numberOfparts 
 */
function buildFullNumber(part, numberOfparts) {
  return Number(Array(numberOfparts).fill(part.toString()).join(''));
}

/**
 * @param {number} rangeStart
 * @param {number} numberOfparts 
 */
function findFirstPartNumber(rangeStart, numberOfparts) {
  const startAsString = rangeStart.toString();
  const partLength = Math.ceil(startAsString.length / numberOfparts);
  if (startAsString.length % numberOfparts > 0) {
    const partString = '1' + Array(partLength - 1).fill('0').join('');
    return Number(partString);
  } else {
    const firstPart = Number(startAsString.substring(0, partLength));
    const full = buildFullNumber(firstPart, numberOfparts);
    if (full < rangeStart) {
      return firstPart + 1;
    } else {
      return firstPart;
    }
  }
}

/**
 * @param {{start: number, end: number}} range
 * @param {number} numberOfparts 
 */
function* createInvalidIdsWithXParts(range, numberOfparts) {
  let part = findFirstPartNumber(range.start, numberOfparts);
  while (true) {
    const full = buildFullNumber(part, numberOfparts);
    if (full > range.end) {
      return;
    }
    yield full;
    part++;
  }
}

const invalidIds1 = ranges.flatMap(range => Array.from(createInvalidIdsWithXParts(range, 2)));
const sum1 = invalidIds1.reduce((a, b) => a + b);

console.log(sum1);

function createInvalidIdsForPart2(range) {
  const maxNumberOfParts = range.end.toString().length;
  const valuesForNumberOfParts = Array(maxNumberOfParts - 1).fill(null).map((_, index) => index + 2);
  const invalidIds = valuesForNumberOfParts.flatMap(numberOfparts => Array.from(createInvalidIdsWithXParts(range, numberOfparts)));
  const uniqueInvalidIds = new Set(invalidIds);
  return Array.from(uniqueInvalidIds);
}

const invalidIds2 = ranges.flatMap(range => createInvalidIdsForPart2(range));
const sum2 = invalidIds2.reduce((a, b) => a + b);
console.log(sum2);