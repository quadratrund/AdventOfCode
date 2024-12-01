const { readFileSync } = require('fs');

const buffer = readFileSync('input-day12.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);

//const rows = text.map(line => line.split(' ')).map(([format1, format2]) => ({format1: format1.replace(/^\.+/, '').replace(/\.+$/, '').split(/\.+/), format2: format2.split(',').map(Number)}));
const rows = text.map(line => line.split(' ')).map(([format1, format2]) => ({format1, format2: format2.split(',').map(Number)}));
console.log(rows.slice(0, 10));

function format1To2(value) {
  return value.replace(/^\.+/, '').replace(/\.+$/, '').split(/\.+/).map(x => x.length);
}

function buildPatterns(objCount, spaceCount) {
  const positions = Array(spaceCount - objCount + 1).fill(null).map((_, i) => objCount - 1 + i);
  if (objCount > 1) {
    return positions.flatMap(pos => buildPatterns(objCount - 1, pos).map(start => [...start, '#', ...Array(spaceCount - pos - 1).fill('.')]));
  } else if (objCount === 0) {
    return [Array(spaceCount).fill('.')];
  } else {
    return positions.map(pos => [...Array(pos).fill('.'), '#', ...Array(spaceCount - pos - 1).fill('.')]);
  }
}

function calcArrangementCountTry1(format1, format2) {
  const indices = format1
    .split('')
    .map((x, i) => ({x, i}))
    .filter(({x}) => x === '?')
    .map(({i}) => i);
  const missingElemntCount
    = format2.reduce((a, b) => a + b)
    - format1
    .split('')
    .filter(x => x === '#')
    .length;
  const distribution = indices.map((_, i) => i < missingElemntCount ? '#': '.');
  let count = 0;
  while (true) {
    const resultFormat1 = format1.split('');
    indices.forEach((index, i) => resultFormat1[index] = distribution[i]);
    const resultFormat2 = format1To2(resultFormat1.join(''));
    if (resultFormat2.join(',') === format2.join(',')) {
      console.log(format1, resultFormat1.join(''));
      count++;
    }

    const firstMoveable = distribution
      .slice(0, distribution.length - 1)
      .findIndex((value, i) => value === '#' && distribution[i + 1] === '.');
    if (firstMoveable === -1) {
      break;
    }
    distribution.splice(firstMoveable, 2, '.', '#');
  }
  return count;
}

function calcArrangementCount(format1, format2) {
  const indices = format1
    .split('')
    .map((x, i) => ({x, i}))
    .filter(({x}) => x === '?')
    .map(({i}) => i);
  const missingElemntCount
    = format2.reduce((a, b) => a + b)
    - format1
    .split('')
    .filter(x => x === '#')
    .length;
  if (missingElemntCount > indices.length) {
  }
  try {
    const distributions = buildPatterns(missingElemntCount, indices.length);
    const count = distributions
      .filter(distribution => {
        const resultFormat1 = format1.split('');
        indices.forEach((index, i) => resultFormat1[index] = distribution[i]);
        const resultFormat2 = format1To2(resultFormat1.join(''));
        return resultFormat2.join(',') === format2.join(',');
      })
      .length;
    return count;
  } catch (e) {
    console.log(format1, format2);
    throw e;
  }
}

const counts = rows.map(({format1, format2}) => calcArrangementCount(format1, format2));
//console.log(counts);
const sum = counts.reduce((a, b) => a + b);
console.log(sum);
