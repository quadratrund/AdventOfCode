// d = distance; T = race duration; t = button hold time
// d < (T - t) * t

const { readFileSync } = require('fs');

function calcNoOfWayOfBeatingRecord(durations, distances) {
  const minPressTimes = durations.map((duration, index) => {
    const distance = distances[index];
    let min = 0;
    let max = Math.ceil(duration/2);
    while (min + 1 < max) {
      const middle = Math.floor((max + min) / 2);
      const middleDistance = (duration - middle) * middle;
      if (distance === middleDistance) {
        return middle + 1;
      } else if (distance > middleDistance) {
        min = middle;
      } else {
        max = middle;
      }
    }
    return max;
  });
  //console.log(minPressTimes);
  const waysOfBeatingRecord = minPressTimes.map((time, index) => durations[index] - time * 2 + 1);
  console.log(waysOfBeatingRecord);
  return waysOfBeatingRecord.reduce((a, b) => a * b);
}

const buffer = readFileSync('input-day6.txt');
const text = buffer.toString('utf8').split('\n');

// Part 1
const durations1 = text[0].split(/ +/).slice(1).map(Number);
const distances1 = text[1].split(/ +/).slice(1).map(Number);
console.log(durations1, distances1);
console.log(calcNoOfWayOfBeatingRecord(durations1, distances1));

console.log();

// Part 2
const durations2 = text[0].replace(/ /g, '').split(':').slice(1).map(Number);
const distances2 = text[1].replace(/ /g, '').split(':').slice(1).map(Number);
console.log(durations2, distances2);
console.log(calcNoOfWayOfBeatingRecord(durations2, distances2));